class ColorModeTransition {
    constructor(options = {}) {
        this.transitionClass = "color-mode-transitioning";
        this.options = {
            duration: options.duration || 700,
            easing: options.easing || "ease",
            reducedMotion: options.respectReducedMotion !== false,
            customProperties: options.customProperties || [],
            ...options,
        };
        this.transitionDuration = this.options.duration;
        this.isTransitioning = false;

        this.prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
    }

    enableTransitions() {
        if (this.isTransitioning) return;

        if (this.options.reducedMotion && this.prefersReducedMotion) {
            return;
        }

        this.isTransitioning = true;
        document.documentElement.classList.add(this.transitionClass);
        setTimeout(() => {
            document.documentElement.classList.remove(this.transitionClass);
            this.isTransitioning = false;
        }, this.transitionDuration);
    }

    addCustomProperty(property) {
        this.options.customProperties.push(property);
    }

    createTransitionRule() {
        const baseProperties = [
            "color",
            "background-color",
            "border-color",
            "box-shadow",
            "fill",
            "stroke",
        ];

        const allProperties = [
            ...baseProperties,
            ...this.options.customProperties,
        ];
        const duration = `${this.options.duration}ms`;
        const easing = this.options.easing;

        return allProperties
            .map((prop) => `${prop} ${duration} ${easing}`)
            .join(", ");
    }

    changeTheme(newTheme, onStart, onComplete) {
        if (onStart) onStart();

        this.enableTransitions();

        // Apply the new theme
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        if (onComplete) {
            setTimeout(onComplete, this.options.duration);
        }
    }

    initTheme() {
        const currentTheme =
            localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light");

        document.documentElement.setAttribute("data-theme", currentTheme);
        return currentTheme;
    }
}

export default ColorModeTransition;
