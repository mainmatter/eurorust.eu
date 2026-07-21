const CURRENT_TIME_REFRESH_INTERVAL = 30_000;

function normalizeSearchText(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
}

function getSearchableCardText(card) {
  if (!card) return '';

  return [
    ...card.querySelectorAll(
      '.activity-card__title, .activity-card__speaker, .activity-card__description, .sponsored-by'
    ),
  ]
    .map((element) => element.textContent)
    .join(' ');
}

function getEntryStatus(now, start, end) {
  if ([now, start].some((date) => Number.isNaN(date.getTime()))) return 'invalid';
  if (end && Number.isNaN(end.getTime())) return 'invalid';
  if (now < start) return 'upcoming';
  if (end && now >= end) return 'past';
  return 'live';
}

function dateInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function readScheduleUrlState(params) {
  return {
    query: params.get('q') ?? '',
    date: params.get('date') ?? '',
    types: new Set(params.getAll('type')),
  };
}

function buildScheduleUrl(currentUrl, { query = '', date = '', types = new Set() } = {}) {
  const url = new URL(currentUrl);
  url.search = '';

  if (normalizeSearchText(query)) url.searchParams.set('q', query.trim());
  if (date) url.searchParams.set('date', date);
  types.forEach((type) => url.searchParams.append('type', type));

  return url;
}

function matchesScheduleFilters(entry, state) {
  const query = normalizeSearchText(state.query ?? '');
  const searchText = normalizeSearchText(entry.searchText ?? '');
  const types = state.types ?? new Set();
  const matchesQuery = !query || searchText.includes(query);
  const matchesDate = !state.date || entry.date === state.date;
  const matchesType = !types.size || types.has(entry.type);
  const showService = !types.size || entry.type !== 'service';

  return matchesQuery && matchesDate && matchesType && showService;
}

class ScheduleController {
  constructor(root, now = () => new Date()) {
    this.root = root;
    this.now = now;
    this.timeZone = root.dataset.timezone || 'Europe/Madrid';
    this.form = root.querySelector('[data-schedule-filters]');
    this.searchInput = this.form?.elements.q;
    this.dateSelect = this.form?.elements.date;
    this.typeInputs = [...(this.form?.querySelectorAll('input[name="type"]') ?? [])];
    this.resetButton = this.form?.querySelector('button[type="reset"]');
    this.days = [...root.querySelectorAll('[data-schedule-day]')];
    this.entries = [...root.querySelectorAll('[data-schedule-entry]')];
    this.summary = root.querySelector('[data-result-summary]');
    this.noResults = root.querySelector('[data-no-results]');
    this.nowNavigationItem = root.querySelector('[data-schedule-now-item]');
    this.nowLink = root.querySelector('[data-schedule-now]');
    this.nowTarget = null;
  }

  init() {
    if (!this.form) return;

    this.observeNavbarHeight();
    this.observeStickyHeaders();

    const urlState = readScheduleUrlState(new URLSearchParams(window.location.search));
    this.restoreFilters(urlState);

    this.searchInput?.addEventListener('input', () => this.handleFilterChange());
    this.dateSelect?.addEventListener('change', () => this.handleFilterChange());
    this.typeInputs.forEach((input) => input.addEventListener('change', () => this.handleFilterChange()));
    this.form.addEventListener('reset', (event) => {
      event.preventDefault();
      this.clearFilterControls();
      this.applyFilters();
    });
    this.nowLink?.addEventListener('click', (event) => {
      event.preventDefault();
      this.scrollToNow();
    });
    window.addEventListener('popstate', () => {
      const currentState = readScheduleUrlState(new URLSearchParams(window.location.search));
      this.restoreFilters(currentState);
      this.applyFilters({ updateUrl: false });
    });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.refreshClock();
    });

    this.applyFilters();

    window.setInterval(() => this.refreshClock(), CURRENT_TIME_REFRESH_INTERVAL);
  }

  observeNavbarHeight() {
    const navbar = document.querySelector('.nav__wrapper');
    if (!navbar) return;
    this.syncNavbarOffset = () => {
      const navbarBottom = Math.max(0, navbar.getBoundingClientRect().bottom - 1);
      this.root.style.setProperty('--schedule-sticky-top', `${navbarBottom}px`);
    };

    const handleNavbarResize = () => {
      this.syncNavbarOffset();
      this.scheduleStickyHeaderUpdate?.();
    };

    handleNavbarResize();
    window.addEventListener('resize', handleNavbarResize);
    new ResizeObserver(handleNavbarResize).observe(navbar);
  }

  observeStickyHeaders() {
    const headers = [...this.root.querySelectorAll('[data-sticky-header]')];
    const enterBuffer = 6;
    const exitBuffer = 16;
    let frame = null;

    const update = () => {
      frame = null;
      this.syncNavbarOffset?.();
      headers.forEach((header) => {
        const sentinel = header.previousElementSibling;
        if (!sentinel?.matches('[data-sticky-sentinel]')) return;

        const stickyTop = Number.parseFloat(window.getComputedStyle(header).top) || 0;
        const sentinelTop = sentinel.getBoundingClientRect().top;
        const isStuck = header.classList.contains('is-stuck');
        const shouldStick = isStuck ? sentinelTop <= stickyTop + exitBuffer : sentinelTop <= stickyTop - enterBuffer;

        header.classList.toggle('is-stuck', shouldStick);
      });
    };

    this.scheduleStickyHeaderUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };

    this.scheduleStickyHeaderUpdate();
    window.addEventListener('scroll', this.scheduleStickyHeaderUpdate, { passive: true });
    window.addEventListener('resize', this.scheduleStickyHeaderUpdate);
    headers.forEach((header) => {
      new ResizeObserver(() => {
        const day = header.closest('[data-schedule-day]');
        day?.style.setProperty('--schedule-day-sticky-height', `${Math.ceil(header.offsetHeight)}px`);
      }).observe(header);
    });
  }

  restoreFilters(state) {
    if (this.searchInput) this.searchInput.value = state.query;
    if (this.dateSelect) this.dateSelect.value = state.date;

    this.typeInputs.forEach((input) => {
      input.checked = state.types.has(input.value);
    });
  }

  getFilterState() {
    return {
      query: normalizeSearchText(this.searchInput?.value ?? ''),
      date: this.dateSelect?.value ?? '',
      types: new Set(this.typeInputs.filter((input) => input.checked).map((input) => input.value)),
    };
  }

  handleFilterChange() {
    this.applyFilters();
  }

  clearFilterControls() {
    if (this.searchInput) this.searchInput.value = '';
    if (this.dateSelect) this.dateSelect.value = '';
    this.typeInputs.forEach((input) => {
      input.checked = false;
    });
  }

  applyFilters({ updateUrl = true } = {}) {
    const state = this.getFilterState();
    let visibleCount = 0;

    this.entries.forEach((entry) => {
      const day = entry.closest('[data-schedule-day]');
      const searchableCard = entry.querySelector('.activity-card');
      const visible = matchesScheduleFilters(
        {
          searchText: getSearchableCardText(searchableCard),
          date: day?.dataset.date ?? '',
          type: entry.dataset.filterType ?? '',
        },
        state
      );

      entry.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    this.updateContainers();
    this.updateCurrentPresentation();
    this.updateSummary(visibleCount);
    this.updateClearButton(state);
    if (updateUrl) this.updateUrl();
  }

  refreshClock() {
    this.updateCurrentPresentation();
  }

  updateCurrentPresentation() {
    const now = this.now();
    const currentDate = dateInTimeZone(now, this.timeZone);
    const currentDay = this.days.find((day) => day.dataset.date === currentDate) ?? null;
    this.nowTarget = null;
    let nextEntry = null;
    let nextStart = null;

    this.entries.forEach((entry) => {
      entry.classList.remove('is-live');
      const onCurrentDay = entry.closest('[data-schedule-day]') === currentDay;
      const start = new Date(entry.dataset.start);
      const end = entry.dataset.end ? new Date(entry.dataset.end) : null;
      const statusValue = onCurrentDay ? getEntryStatus(now, start, end) : 'past';
      const status = entry.querySelector('[data-live-status]');

      if (status) {
        status.hidden = true;
        status.textContent = '';
      }

      if (statusValue === 'live') {
        entry.classList.add('is-live');
        if (!this.nowTarget) this.nowTarget = entry;
        if (status) {
          status.textContent = 'Live';
          status.hidden = false;
        }
      } else if (statusValue === 'upcoming' && (!nextStart || start < nextStart)) {
        nextEntry = entry;
        nextStart = start;
      }
    });

    this.nowTarget ??= nextEntry;
    if (this.nowNavigationItem) this.nowNavigationItem.hidden = !this.nowTarget;
  }

  scrollToNow() {
    if (!this.nowTarget) return;

    if (this.nowTarget.hidden) {
      this.clearFilterControls();
      this.applyFilters();
    }

    const target = this.nowTarget;
    const day = target?.closest('[data-schedule-day]');
    if (!target || !day) return;

    window.requestAnimationFrame(() => {
      const stickyHeader = day.querySelector('[data-sticky-header]');
      const stickyTop = stickyHeader ? Number.parseFloat(window.getComputedStyle(stickyHeader).top) || 0 : 0;
      const stickyHeight = stickyHeader?.offsetHeight ?? 0;
      const targetTop = window.scrollY + target.getBoundingClientRect().top - stickyTop - stickyHeight - 16;
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

      window.scrollTo({ top: Math.max(0, targetTop), behavior });
    });
  }

  updateContainers() {
    this.root.querySelectorAll('[data-schedule-track-content]').forEach((track) => {
      track.hidden = !track.querySelector('[data-schedule-entry]:not([hidden])');
    });

    this.root.querySelectorAll('[data-schedule-slot]').forEach((slot) => {
      slot.hidden = !slot.querySelector('[data-schedule-entry]:not([hidden])');
    });

    this.updateTimeHeadings();

    this.days.forEach((day) => {
      const visibleEntries = [...day.querySelectorAll('[data-schedule-entry]:not([hidden])')];
      const headings = [...day.querySelectorAll('[data-schedule-track-heading]')];
      const fallbackHeading = day.querySelector('[data-schedule-track-heading-fallback]');
      const visibleTracks = new Set(visibleEntries.map((entry) => entry.dataset.track));
      let visibleHeadingCount = 0;

      if (fallbackHeading) fallbackHeading.hidden = true;

      headings.forEach((heading) => {
        heading.hidden = !visibleTracks.has(heading.dataset.track);
        if (!heading.hidden) visibleHeadingCount += 1;
      });

      if (visibleEntries.length > 0 && headings.length > 0 && visibleHeadingCount === 0 && fallbackHeading) {
        const visibleTrackLabels = new Set(visibleEntries.map((entry) => entry.dataset.trackLabel).filter(Boolean));
        fallbackHeading.textContent = visibleTrackLabels.size === 1 ? [...visibleTrackLabels][0] : 'Schedule';
        fallbackHeading.hidden = false;
        visibleHeadingCount = 1;
      }

      day.classList.toggle('has-single-visible-track', visibleHeadingCount === 1);
      day.hidden = visibleEntries.length === 0;
    });

    this.root.querySelectorAll('[data-schedule-separator]').forEach((separator) => {
      const day = this.days.find((candidate) => candidate.id === separator.dataset.separatorDay);
      separator.hidden = !day || day.hidden;
    });

    this.updateBackgroundTransitions(this.days.filter((day) => !day.hidden));
  }

  updateBackgroundTransitions(visibleDays) {
    const pageEndColor = 'var(--blue-500)';
    const commonBackground = this.root.querySelector('.schedule__common-background-1');
    const sectionStartColor = (day) =>
      window.getComputedStyle(day).getPropertyValue('--schedule-section-start-color').trim() || pageEndColor;

    const firstColor = visibleDays.length ? sectionStartColor(visibleDays[0]) : pageEndColor;
    commonBackground?.style.setProperty('--schedule-visible-end-color', firstColor);

    this.days.forEach((day) => day.style.removeProperty('--schedule-visible-end-color'));
    visibleDays.forEach((day, index) => {
      const nextDay = visibleDays[index + 1];
      day.style.setProperty('--schedule-visible-end-color', nextDay ? sectionStartColor(nextDay) : pageEndColor);
    });

    this.root.querySelectorAll('[data-schedule-separator]:not([hidden])').forEach((separator) => {
      const dayIndex = visibleDays.findIndex((day) => day.id === separator.dataset.separatorDay);
      if (dayIndex < 0) return;

      const day = visibleDays[dayIndex];
      const nextDay = visibleDays[dayIndex + 1];
      const color =
        separator.dataset.separatorPosition === 'before'
          ? sectionStartColor(day)
          : nextDay
            ? sectionStartColor(nextDay)
            : pageEndColor;

      separator.style.setProperty('--schedule-separator-color', color);
    });
  }

  updateTimeHeadings() {
    this.root.querySelectorAll('[data-schedule-time-sequence]').forEach((sequence) => {
      let previousStart = null;

      sequence.querySelectorAll(':scope > [data-schedule-slot]').forEach((slot) => {
        const heading = slot.querySelector('.schedule__slot-time');
        if (!heading) return;

        const isDuplicate = !slot.hidden && slot.dataset.start === previousStart;
        heading.hidden = slot.hidden || isDuplicate;
        if (!slot.hidden) previousStart = slot.dataset.start;
      });
    });
  }

  updateSummary(count) {
    if (!this.summary) return;
    const label = count === 1 ? 'event' : 'events';
    this.summary.textContent = `Showing ${count} ${label}`;
    if (this.noResults) this.noResults.hidden = count !== 0;
  }

  updateClearButton(state = this.getFilterState()) {
    if (!this.resetButton) return;
    this.resetButton.disabled = !state.query && !state.date && state.types.size === 0;
  }

  updateUrl() {
    const state = this.getFilterState();
    const url = buildScheduleUrl(window.location.href, {
      query: this.searchInput?.value ?? '',
      date: state.date,
      types: state.types,
    });

    window.history.replaceState({}, '', url);
  }
}

export function initSchedule() {
  const root = document.querySelector('[data-schedule]');
  if (!root) return null;
  const controller = new ScheduleController(root);
  controller.init();
  return controller;
}
