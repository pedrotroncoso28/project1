// script.js
// Ready for future animations. Nothing runs yet.

const dot = document.getElementById('dot');

/**
 * expandDot() - simple helper function.
 */
function expandDot(duration = 1000) {
  if (!dot) return;
  dot.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
  dot.style.transform = 'scale(200)';
  dot.style.opacity = '0';
}

// Expose the function for testing: window.simulation.expandDot()
window.simulation = { expandDot };
