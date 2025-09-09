var scrollDirection = "up";
var lastScrollTop = 0;
var button;
var buttonMobile;
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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

    if (window.innerWidth <= 720) {
        buttonMobile.style.display = "flex";
    } else {
        buttonMobile.style.display = "none";
        if (shouldShow) {
            button.style.opacity = "1";
            button.style.pointerEvents = "auto";
        } else {
            button.style.opacity = "0";
            button.style.pointerEvents = "none";
        }
    }
}

export { initScrollButtons };
