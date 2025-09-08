/**
 * Collapsible Alert Animations
 * Handles smooth opening/closing transitions for alert details elements
 */

// Animation configuration
const ANIMATION_DURATION = 300; // milliseconds
const EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)";

/**
 * Animate the opening of a details element
 */
function animateOpen(details, summary, content) {
    details.style.overflow = "hidden";
    details.open = true;

    const startHeight = summary.offsetHeight;
    const endHeight = startHeight + content.offsetHeight;

    details.style.height = startHeight + "px";
    content.style.opacity = "0";
    content.style.transform = "translateY(-10px)";

    details.offsetHeight;

    details.style.transition = `height ${ANIMATION_DURATION}ms ${EASING}`;
    content.style.transition = `opacity ${ANIMATION_DURATION}ms ${EASING}, transform ${ANIMATION_DURATION}ms ${EASING}`;

    details.style.height = endHeight + "px";
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";

    setTimeout(() => {
        details.style.height = "";
        details.style.overflow = "";
        details.style.transition = "";
        content.style.transition = "";
    }, ANIMATION_DURATION);
}

/**
 * Animate the closing of a details element
 */
function animateClose(details, summary, content) {
    const startHeight = details.offsetHeight;
    const endHeight = summary.offsetHeight;

    details.style.overflow = "hidden";
    details.style.height = startHeight + "px";

    details.offsetHeight;

    details.style.transition = `height ${ANIMATION_DURATION}ms ${EASING}`;
    content.style.transition = `opacity ${ANIMATION_DURATION}ms ${EASING}, transform ${ANIMATION_DURATION}ms ${EASING}`;

    details.style.height = endHeight + "px";
    content.style.opacity = "0";
    content.style.transform = "translateY(-10px)";

    setTimeout(() => {
        details.open = false;
        details.style.height = "";
        details.style.overflow = "";
        details.style.transition = "";
        content.style.transition = "";
        content.style.opacity = "";
        content.style.transform = "";
    }, ANIMATION_DURATION);
}

/**
 * Setup collapsible alert animations
 */
export function initCollapsibleAlerts() {
    const collapsibleAlerts = document.querySelectorAll(".alert-collapsible");

    collapsibleAlerts.forEach((details) => {
        const summary = details.querySelector("summary");
        const content = details.querySelector(".alert-content");

        if (!summary || !content) return;

        summary.addEventListener("click", function (e) {
            e.preventDefault();

            if (details.open) {
                animateClose(details, summary, content);
            } else {
                animateOpen(details, summary, content);
            }
        });

        if (!details.open) {
            content.style.opacity = "0";
            content.style.transform = "translateY(-10px)";
        }
    });
}

// Auto-initialize when module is loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCollapsibleAlerts);
} else {
    initCollapsibleAlerts();
}
