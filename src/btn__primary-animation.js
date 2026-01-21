export function btnPrimaryAnimation() {
  // Select all buttons
const buttons = document.querySelectorAll('.btn__primary');

// Store animation for each button
const animationsMap = new WeakMap();

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    // Cancel any existing animation
    const existingAnimation = animationsMap.get(button);
    if (existingAnimation) existingAnimation.cancel();

    // Start jelly animation
    const animation = button.animate([
      { transform: 'scale(1, 1)' },
      { transform: 'scale(0.9, 1.01)' },
      { transform: 'scale(1.05, 1)' },
      { transform: 'scale(0.95, 1.005)' },
      { transform: 'scale(1, 1)' }
    ], {
      duration: 600,
      easing: 'ease-in-out'
    });

    // Store animation for this button
    animationsMap.set(button, animation);
  });

  button.addEventListener('mouseleave', () => {
    const existingAnimation = animationsMap.get(button);
    if (existingAnimation) existingAnimation.cancel();

    // Get current scale
    const style = window.getComputedStyle(button);
    const matrix = new DOMMatrixReadOnly(style.transform);
    const currentScaleX = matrix.a;
    const currentScaleY = matrix.d;

    const distance = Math.abs(currentScaleX - 1);
    const minDuration = 200;
    const maxDuration = 800;
    const duration = Math.min(maxDuration, Math.max(minDuration, distance * 500));

    // Animate back to scale(1,1)
    const animation = button.animate([
      { transform: `scale(${currentScaleX}, ${currentScaleY})` },
      { transform: 'scale(1, 1)' }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards'
    });

    animationsMap.set(button, animation);
  });
});

}
