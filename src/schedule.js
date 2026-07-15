const LIVE_REFRESH_INTERVAL = 30_000;

export function normalizeSearchText(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
}

export function getEntryStatus(now, start, end) {
  if (now < start) return 'upcoming';
  if (now >= end) return 'past';
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
    this.refreshTimer = null;
    this.hasScrolledToLiveEvent = false;
  }

  init() {
    if (!this.form) return;

    this.observeNavbarHeight();
    this.observeStickyHeaders();

    const params = new URLSearchParams(window.location.search);
    this.restoreFilters(params);
    this.refreshLiveAvailability(params.get('view'));

    this.form.addEventListener('input', () => this.handleFilterChange());
    this.form.addEventListener('change', () => this.handleFilterChange());
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
      const currentParams = new URLSearchParams(window.location.search);
      this.restoreFilters(currentParams);
      this.refreshLiveAvailability(currentParams.get('view'));
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

    this.refreshTimer = window.setInterval(() => this.refreshClock(), LIVE_REFRESH_INTERVAL);
  }

  observeNavbarHeight() {
    const navbar = document.querySelector('.nav__wrapper');
    if (!navbar) return;
    this.navbar = navbar;

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

  restoreFilters(params) {
    if (this.searchInput) this.searchInput.value = params.get('q') ?? '';
    if (this.dateSelect) this.dateSelect.value = params.get('date') ?? '';

    const selectedTypes = new Set(params.getAll('type'));
    this.typeInputs.forEach((input) => {
      input.checked = selectedTypes.has(input.value);
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
      const searchableCard = entry.querySelector('[data-search]');
      const searchText = normalizeSearchText(
        `${searchableCard?.dataset.search ?? ''} ${searchableCard?.textContent ?? ''}`
      );
      const matchesQuery = !state.query || searchText.includes(state.query);
      const matchesDate = !state.date || day?.dataset.date === state.date;
      const matchesType = !state.types.size || state.types.has(entry.dataset.filterType);
      const showService = !state.types.size || entry.dataset.filterType !== 'service';
      const visible = matchesQuery && matchesDate && matchesType && showService;

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
    const today = dateInTimeZone(this.now(), this.timeZone);
    this.liveDay = this.days.find((day) => day.dataset.date === today) ?? null;

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
    let visibleCount = 0;
    let liveCount = 0;
    let upcomingCount = 0;
    let nextStart = null;

    this.entries.forEach((entry) => {
      const onLiveDay = entry.closest('[data-schedule-day]') === this.liveDay;
      const start = new Date(entry.dataset.start);
      const end = new Date(entry.dataset.end);
      const statusValue = onLiveDay ? getEntryStatus(now, start, end) : 'past';
      const visible = onLiveDay && statusValue !== 'past';
      const status = entry.querySelector('[data-live-status]');

      entry.hidden = !visible;
      entry.dataset.liveStatus = statusValue;
      entry.classList.toggle('is-live', statusValue === 'live');

      if (visible) {
        visibleCount += 1;
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
    this.updateSummary(visibleCount, 'live');
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

    this.days.forEach((day) => {
      const visibleEntries = [...day.querySelectorAll('[data-schedule-entry]:not([hidden])')];
      const headings = [...day.querySelectorAll('[data-schedule-track-heading]')];
      const visibleTracks = new Set(visibleEntries.map((entry) => entry.dataset.track));
      let visibleHeadingCount = 0;

      headings.forEach((heading) => {
        heading.hidden = !visibleTracks.has(heading.dataset.track);
        if (!heading.hidden) visibleHeadingCount += 1;
      });

      if (visibleEntries.length > 0 && headings.length > 0 && visibleHeadingCount === 0) {
        headings.forEach((heading) => {
          heading.hidden = false;
        });
        visibleHeadingCount = headings.length;
      }

      day.classList.toggle('has-single-visible-track', visibleHeadingCount === 1);
      day.hidden = visibleEntries.length === 0;
    });

    this.root.querySelectorAll('[data-schedule-separator]').forEach((separator) => {
      const day = this.days.find((candidate) => candidate.id === separator.dataset.separatorDay);
      separator.hidden = !day || day.hidden;
    });
  }

  updateSummary(count, mode = 'filters') {
    if (!this.summary) return;
    const label = count === 1 ? 'event' : 'events';
    this.summary.textContent = mode === 'live' ? `${count} ${label} now or later today.` : `${count} ${label}`;
    if (this.noResults) this.noResults.hidden = count !== 0 || mode === 'live';
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
    const url = new URL(window.location.href);
    const state = this.getFilterState();
    url.search = '';

    if (state.query) url.searchParams.set('q', this.searchInput.value.trim());
    if (state.date) url.searchParams.set('date', state.date);
    state.types.forEach((type) => url.searchParams.append('type', type));
    if (this.liveDay) url.searchParams.set('view', this.liveMode ? 'live' : 'full');

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
