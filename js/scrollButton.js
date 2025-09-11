var scrollDirection = "up";
var lastScrollTop = 0;
var button;
var buttonMobile;
function scrollToTop() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    } else {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
}

function initScrollButtons() {
    button = document.getElementById("scroll-button");
    buttonMobile = document.getElementById("scroll-button-mobile");
    if (!button || !buttonMobile) {
        console.warn(
            "No scroll button found, cannot initialize scroll button functionality.",
        );
        return;
    }

    button.addEventListener("click", scrollToTop);
    buttonMobile.addEventListener("click", scrollToTop);
    button.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            scrollToTop();
        }
    });
    buttonMobile.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            scrollToTop();
        }
    });
    document.addEventListener("scroll", showScrollButton);
}

function showScrollButton() {
    const currentScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

    scrollDirection = currentScroll > lastScrollTop ? "down" : "up";
    lastScrollTop = currentScroll;
    const atBottom =
        window.innerHeight + currentScroll >= document.body.offsetHeight - 100;
    const shouldShow =
        currentScroll > 20 && (scrollDirection === "up" || atBottom);

    if (window.innerHeight > 885 && shouldShow) {
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
    } else {
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
        button.style.display = "none";
    }
}

export { initScrollButtons };
