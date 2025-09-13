const ANIMATION_DURATION = 300; // milliseconds
const EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)";

let isAnimating = false;

function animateMenuOpen(details, menu) {
    if (isAnimating) return;
    isAnimating = true;

    details.style.overflow = "visible";
    details.open = true;

    menu.style.opacity = "0";
    menu.style.transform = "translateY(-10px) scale(0.95)";
    menu.style.transition = "";

    details.offsetHeight;

    menu.style.transition = `opacity ${ANIMATION_DURATION}ms ${EASING}, transform ${ANIMATION_DURATION}ms ${EASING}`;

    requestAnimationFrame(() => {
        menu.style.opacity = "1";
        menu.style.transform = "translateY(0) scale(1)";
    });

    const menuItems = menu.querySelectorAll("li");
    menuItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(10px)";
        item.style.transition = `opacity 200ms ${EASING}, transform 200ms ${EASING}`;

        const delay = 100 + index * 50;

        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
        }, delay);
    });

    setTimeout(
        () => {
            menu.style.transition = "";
            menuItems.forEach((item) => {
                item.style.transition = "";
            });
            isAnimating = false;
        },
        ANIMATION_DURATION + menuItems.length * 50,
    );

    // Close dropdown on scroll
    document.addEventListener(
        "scroll",
        () => {
            animateMenuClose(details, menu);
        },
        { once: true },
    );
}

function animateMenuClose(details, menu) {
    if (isAnimating) return;
    isAnimating = true;

    const menuItems = menu.querySelectorAll("li");

    menuItems.forEach((item, index) => {
        item.style.transition = `opacity 150ms ${EASING}, transform 150ms ${EASING}`;
        setTimeout(() => {
            item.style.opacity = "0";
            item.style.transform = "translateX(10px)";
        }, index * 50);
    });

    menu.style.transition = `opacity 200ms ${EASING}, transform 200ms ${EASING}`;
    menu.style.opacity = "0";
    menu.style.transform = "translateY(-10px) scale(0.95)";

    setTimeout(() => {
        details.open = false;
        menu.style.opacity = "";
        menu.style.transform = "";
        menu.style.transition = "";

        menuItems.forEach((item) => {
            item.style.opacity = "";
            item.style.transform = "";
            item.style.transition = "";
        });

        isAnimating = false;
    }, 200);
}

function initRightLinksAnimation() {
    const details = document.getElementById("right-links-details");
    if (!details) {
        console.error("No details element found!");
        return;
    }

    const summary = details.querySelector("summary");
    const menu = details.querySelector("ul");

    if (!summary || !menu) {
        console.error("Missing summary or menu!");
        return;
    }
    const menuItems = menu.querySelectorAll("li");

    if (!details.open) {
        menuItems.forEach((item) => {
            item.style.opacity = "0";
            item.style.transform = "translateX(10px)";
        });
    }

    summary.addEventListener("click", function (e) {
        e.preventDefault();
        if (details.open) {
            animateMenuClose(details, menu);
        } else {
            animateMenuOpen(details, menu);
        }
    });

    document.addEventListener("click", function (e) {
        if (details.open && !details.contains(e.target)) {
            animateMenuClose(details, menu);
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && details.open) {
            animateMenuClose(details, menu);
        }
    });
}

export default initRightLinksAnimation;
