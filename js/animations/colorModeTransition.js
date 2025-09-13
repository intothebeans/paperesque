const transitionDuration = 700;
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;
const transitionClass = "color-mode-transitioning";
var isTransitioning = false;

function enableColorThemeTransitions() {
    if (isTransitioning || prefersReducedMotion) return;

    isTransitioning = true;
    document.documentElement.classList.add(transitionClass);
    setTimeout(() => {
        document.documentElement.classList.remove(transitionClass);
        isTransitioning = false;
    }, transitionDuration);
}

function initColorTransitionStyles() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    toggle.addEventListener("change", enableColorThemeTransitions);
}

export default initColorTransitionStyles;
