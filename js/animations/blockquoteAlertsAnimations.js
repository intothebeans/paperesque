var ANIMATION_DURATION = 300; // milliseconds
const EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)";
const HEIGHT_TRANSITION = `height ${ANIMATION_DURATION}ms ${EASING}`;
const CONTENT_TRANSITION = `opacity ${ANIMATION_DURATION}ms ${EASING}, transform ${ANIMATION_DURATION}ms ${EASING}`;
const BORDER_RADIUS_TRANSITION = `border-radius ${ANIMATION_DURATION}ms ${EASING}`;

function applyStylesAndReflow(element, styles) {
    Object.assign(element.style, styles);
    return element.offsetHeight;
}

function resetStylesAfterAnimation(elements, duration) {
    setTimeout(() => {
        elements.forEach(({ element, styles }) => {
            Object.keys(styles).forEach((prop) => {
                element.style[prop] = styles[prop];
            });
        });
    }, duration);
}

function animateOpen(alert, summary, content) {
    const startHeight = summary.offsetHeight;

    applyStylesAndReflow(alert, {
        overflow: "hidden",
        height: `${startHeight}px`,
    });

    Object.assign(content.style, {
        display: "block",
        opacity: "0",
        transform: "translateY(-10px)",
    });

    content.offsetHeight;

    const endHeight = startHeight + content.scrollHeight;

    alert.setAttribute("data-open", "true");

    alert.style.transition = HEIGHT_TRANSITION;
    content.style.transition = CONTENT_TRANSITION;

    requestAnimationFrame(() => {
        Object.assign(alert.style, {
            height: `${endHeight}px`,
        });

        Object.assign(content.style, {
            opacity: "1",
            transform: "translateY(0)",
        });
    });

    resetStylesAfterAnimation(
        [
            {
                element: alert,
                styles: { height: "", overflow: "", transition: "" },
            },
            { element: content, styles: { transition: "" } },
        ],
        ANIMATION_DURATION,
    );
}

function animateClose(alert, summary, content) {
    const startHeight = alert.offsetHeight;
    const endHeight = summary.offsetHeight;

    applyStylesAndReflow(alert, {
        overflow: "hidden",
        height: `${startHeight}px`,
    });

    alert.removeAttribute("data-open");

    alert.style.transition = HEIGHT_TRANSITION;
    content.style.transition = CONTENT_TRANSITION;
    summary.style.transition = BORDER_RADIUS_TRANSITION;

    Object.assign(alert.style, {
        height: `${endHeight}px`,
    });

    Object.assign(content.style, {
        opacity: "0",
        transform: "translateY(-10px)",
    });

    resetStylesAfterAnimation(
        [
            {
                element: alert,
                styles: { height: "", overflow: "", transition: "" },
            },
            {
                element: content,
                styles: {
                    display: "none",
                    transition: "",
                    opacity: "",
                    transform: "",
                },
            },
        ],
        ANIMATION_DURATION,
    );
}

function initCollapsibleAlerts() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        ANIMATION_DURATION = 0;
    }
    const collapsibleAlerts = document.querySelectorAll(".alert-collapsible");

    collapsibleAlerts.forEach((alert) => {
        const summary = alert.querySelector(".alert-summary");
        const content = alert.querySelector(".alert-content");

        if (!summary || !content) return;

        const isInitiallyOpen = alert.hasAttribute("data-open");

        Object.assign(content.style, {
            opacity: isInitiallyOpen ? "1" : "0",
            display: isInitiallyOpen ? "block" : "none",
            transform: isInitiallyOpen ? "translateY(0)" : "translateY(-10px)",
        });
        function toggleAlert() {
            const isOpen = alert.hasAttribute("data-open");

            if (isOpen) {
                animateClose(alert, summary, content);
            } else {
                animateOpen(alert, summary, content);
            }
        }
        summary.addEventListener("click", toggleAlert);
        summary.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleAlert();
            }
        });
    });
}

export default initCollapsibleAlerts;
