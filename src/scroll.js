export function observeScroll() {
  const primaryHeader = document.querySelector('.nav');
  if (!primaryHeader) return;

  const scrollWatcher = document.createElement('div');
  scrollWatcher.setAttribute('data-scroll-watcher', '');
  primaryHeader.before(scrollWatcher);

  const navObserver = new IntersectionObserver(
    (entries) => {
      primaryHeader.classList.toggle('sticking', !entries[0].isIntersecting);
    },
    { rootMargin: '50px 0px 0px 0px' }
  );

  navObserver.observe(scrollWatcher);
}

const BACK_TO_TOP_OFFSET = 500;

export function initBackToTopButton() {
  const backToTopButton = document.querySelector('[data-back-to-top]');
  if (!backToTopButton) return;

  const setVisibility = () => {
    backToTopButton.classList.toggle('is-visible', window.scrollY > BACK_TO_TOP_OFFSET);
  };

  const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotionMediaQuery.matches ? 'auto' : 'smooth',
    });
  });

  window.addEventListener('scroll', setVisibility, { passive: true });
  setVisibility();
}
