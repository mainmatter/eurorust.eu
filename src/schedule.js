const LIVE_REFRESH_INTERVAL = 30_000;

export function normalizeSearchText(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
}

export function getEntryStatus(now, start, end) {
  if ([now, start].some((date) => Number.isNaN(date.getTime()))) return 'invalid';
  if (end && Number.isNaN(end.getTime())) return 'invalid';
  if (now < start) return 'upcoming';
  if (end && now >= end) return 'past';
  return 'live';
}

export function dateInTimeZone(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function getLiveDayDate(now, timeZone, scheduleDates) {
  const today = dateInTimeZone(now, timeZone);
  return scheduleDates.includes(today) ? today : null;
}

export function readScheduleUrlState(params) {
  return {
    query: params.get('q') ?? '',
    date: params.get('date') ?? '',
    types: new Set(params.getAll('type')),
    view: params.get('view') ?? '',
  };
}

export function buildScheduleUrl(currentUrl, { query = '', date = '', types = new Set(), view = '' } = {}) {
  const url = new URL(currentUrl);
  url.search = '';

  if (normalizeSearchText(query)) url.searchParams.set('q', query.trim());
  if (date) url.searchParams.set('date', date);
  types.forEach((type) => url.searchParams.append('type', type));
  if (view) url.searchParams.set('view', view);

  return url;
}

export function matchesScheduleFilters(entry, state) {
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
    this.liveBanner = root.querySelector('[data-live-banner]');
    this.liveMessage = root.querySelector('[data-live-message]');
    this.liveToggles = [...root.querySelectorAll('[data-live-toggle]')];
    this.heroTitle = root.querySelector('[data-schedule-hero-title]');
    this.defaultHeroTitle = this.heroTitle?.textContent.trim() ?? '';
    this.liveMode = false;
    this.liveDay = null;
    this.hasScrolledToLiveEvent = false;
  }

  init() {
    if (!this.form) return;

    this.observeNavbarHeight();
    this.observeStickyHeaders();

    const urlState = readScheduleUrlState(new URLSearchParams(window.location.search));
    this.restoreFilters(urlState);
    this.refreshLiveAvailability(urlState.view);

    this.searchInput?.addEventListener('input', () => this.handleFilterChange());
    this.dateSelect?.addEventListener('change', () => this.handleFilterChange());
    this.typeInputs.forEach((input) => input.addEventListener('change', () => this.handleFilterChange()));
    this.form.addEventListener('reset', (event) => {
      event.preventDefault();
      this.clearFilterControls();
      this.liveMode = false;
      this.applyFilters();
    });
    this.liveToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        this.liveMode = toggle.dataset.liveToggleMode === 'enter';
        if (this.liveMode) this.clearFilterControls();
        this.liveMode ? this.applyLiveView() : this.applyFilters();
      });
    });
    window.addEventListener('popstate', () => {
      const currentState = readScheduleUrlState(new URLSearchParams(window.location.search));
      this.restoreFilters(currentState);
      this.refreshLiveAvailability(currentState.view);
      this.liveMode ? this.applyLiveView() : this.applyFilters({ updateUrl: false });
    });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.refreshClock();
    });

    if (this.liveMode) {
      this.applyLiveView();
    } else {
      this.applyFilters({ updateUrl: false });
    }

    window.setInterval(() => this.refreshClock(), LIVE_REFRESH_INTERVAL);
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
    this.liveMode = false;
    this.applyFilters();
  }

  clearFilterControls() {
    if (this.searchInput) this.searchInput.value = '';
    if (this.dateSelect) this.dateSelect.value = '';
    this.typeInputs.forEach((input) => {
      input.checked = false;
    });
  }

  clearLivePresentation() {
    this.entries.forEach((entry) => {
      entry.classList.remove('is-live');
      delete entry.dataset.liveStatus;
      const status = entry.querySelector('[data-live-status]');
      if (status) {
        status.hidden = true;
        status.textContent = '';
      }
    });
    if (this.liveBanner) this.liveBanner.hidden = true;
  }

  applyFilters({ updateUrl = true } = {}) {
    this.root.classList.remove('is-live-view');
    if (this.heroTitle) this.heroTitle.textContent = this.defaultHeroTitle;
    this.hasScrolledToLiveEvent = false;
    this.clearLivePresentation();
    const state = this.getFilterState();
    let visibleCount = 0;

    this.entries.forEach((entry) => {
      const day = entry.closest('[data-schedule-day]');
      const searchableCard = entry.querySelector('.activity-card');
      const visible = matchesScheduleFilters(
        {
          searchText: searchableCard?.textContent ?? '',
          date: day?.dataset.date ?? '',
          type: entry.dataset.filterType ?? '',
        },
        state
      );

      entry.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    this.updateContainers();
    this.updateSummary(visibleCount);
    this.updateClearButton(state);
    this.updateLiveToggle();
    if (updateUrl) this.updateUrl();
  }

  refreshLiveAvailability(requestedView) {
    const liveDate = getLiveDayDate(
      this.now(),
      this.timeZone,
      this.days.map((day) => day.dataset.date)
    );
    this.liveDay = this.days.find((day) => day.dataset.date === liveDate) ?? null;

    if (!this.liveDay) {
      this.liveMode = false;
    } else if (requestedView === 'full') {
      this.liveMode = false;
    } else if (requestedView === 'live') {
      this.liveMode = true;
    } else {
      const state = this.getFilterState();
      this.liveMode = !state.query && !state.date && !state.types.size;
    }

    this.updateLiveToggle();
  }

  refreshClock() {
    const previousDay = this.liveDay;
    this.refreshLiveAvailability(this.liveMode ? 'live' : 'full');

    if (this.liveMode) {
      this.applyLiveView();
    } else if (previousDay !== this.liveDay) {
      this.applyFilters({ updateUrl: false });
    }
  }

  applyLiveView() {
    if (!this.liveDay) {
      this.liveMode = false;
      this.applyFilters();
      return;
    }

    this.root.classList.add('is-live-view');
    if (this.heroTitle) this.heroTitle.textContent = 'LIVE SCHEDULE';
    this.clearLivePresentation();
    const now = this.now();
    let liveCount = 0;
    let upcomingCount = 0;
    let nextStart = null;

    this.entries.forEach((entry) => {
      const onLiveDay = entry.closest('[data-schedule-day]') === this.liveDay;
      const start = new Date(entry.dataset.start);
      const end = entry.dataset.end ? new Date(entry.dataset.end) : null;
      const statusValue = onLiveDay ? getEntryStatus(now, start, end) : 'past';
      const visible = onLiveDay && (statusValue === 'live' || statusValue === 'upcoming');
      const status = entry.querySelector('[data-live-status]');

      entry.hidden = !visible;
      entry.dataset.liveStatus = statusValue;
      entry.classList.toggle('is-live', statusValue === 'live');

      if (visible) {
        if (statusValue === 'live') {
          liveCount += 1;
          if (status) {
            status.textContent = 'Happening now';
            status.hidden = false;
          }
        } else {
          upcomingCount += 1;
          if (!nextStart || start < nextStart) nextStart = start;
          if (status) {
            status.textContent = 'Later today';
            status.hidden = false;
          }
        }
      }
    });

    this.updateContainers();
    this.updateLiveMessage(liveCount, upcomingCount, nextStart);
    this.updateLiveToggle();
    this.updateUrl();
    this.scrollToFirstLiveEvent();
  }

  scrollToFirstLiveEvent() {
    if (this.hasScrolledToLiveEvent) return;
    const firstLiveEvent = this.liveDay?.querySelector('[data-schedule-entry].is-live');
    if (!firstLiveEvent) return;

    this.hasScrolledToLiveEvent = true;
    window.requestAnimationFrame(() => {
      const stickyHeader = this.liveDay?.querySelector('[data-sticky-header]');
      const stickyTop = stickyHeader ? Number.parseFloat(window.getComputedStyle(stickyHeader).top) || 0 : 0;
      const stickyHeight = stickyHeader?.offsetHeight ?? 0;
      const targetTop = window.scrollY + firstLiveEvent.getBoundingClientRect().top - stickyTop - stickyHeight - 16;
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
    this.summary.textContent = `${count} ${label}`;
    if (this.noResults) this.noResults.hidden = count !== 0;
  }

  updateClearButton(state = this.getFilterState()) {
    if (!this.resetButton) return;
    this.resetButton.disabled = !state.query && !state.date && state.types.size === 0;
  }

  updateLiveMessage(liveCount, upcomingCount, nextStart) {
    if (!this.liveBanner || !this.liveMessage) return;
    this.liveBanner.hidden = false;

    if (liveCount > 0) {
      const liveLabel = liveCount === 1 ? 'event is' : 'events are';
      const laterLabel = upcomingCount === 1 ? 'event' : 'events';
      this.liveMessage.textContent = `${liveCount} ${liveLabel} happening now. ${upcomingCount} ${laterLabel} later today.`;
    } else if (nextStart) {
      const time = new Intl.DateTimeFormat('en-GB', {
        timeZone: this.timeZone,
        hour: '2-digit',
        minute: '2-digit',
      }).format(nextStart);
      this.liveMessage.textContent = `Nothing is happening right now. The next event starts at ${time}.`;
    } else {
      this.liveMessage.textContent = "Today's schedule has ended.";
    }
  }

  updateLiveToggle() {
    this.liveToggles.forEach((toggle) => {
      const isEnterToggle = toggle.dataset.liveToggleMode === 'enter';
      toggle.hidden = !this.liveDay || isEnterToggle === this.liveMode;
      toggle.closest('.schedule-live__actions').hidden = toggle.hidden;
    });
  }

  updateUrl() {
    const state = this.getFilterState();
    const url = buildScheduleUrl(window.location.href, {
      query: this.searchInput?.value ?? '',
      date: state.date,
      types: state.types,
      view: this.liveDay ? (this.liveMode ? 'live' : 'full') : '',
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
