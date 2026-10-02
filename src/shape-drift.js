export function initShapeDrift() {
  const shapes = document.querySelectorAll('.hero__circle-yellow, .hero__circle-red, .hero__square, .hero__triangle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animations = [];

  const update = () => {
    animations.forEach((animation) => animation.cancel());
    animations = [];
    if (reducedMotion.matches) return;

    shapes.forEach((shape) => {
      const duration = 24000 + Math.random() * 16000;
      const points = Array.from({ length: 4 }, () => ({
        transform: `translate(${(Math.random() - 0.5) * 2.4}vw, ${(Math.random() - 0.5) * 2.4}vw)`,
        easing: 'ease-in-out',
      }));
      animations.push(
        shape.animate([...points, points[0]], {
          duration,
          iterations: Infinity,
          delay: -Math.random() * duration,
        })
      );
    });
  };

  reducedMotion.addEventListener('change', update);
  update();
}
