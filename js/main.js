import anchorizeHeadings from "./anchorizeHeadings.js";
import enableFloatingFootnotes from "./floatingFootnotes.js";
import { docReady } from "./utils.js";
import ColorModeTransition from "./colorModeTransition.js";
import { drawMusic, musicWithPlayback } from "./music.js";
import { initCollapsibleAlerts } from "./blockquoteAlertsAnimations.js";
import "iconify-icon";
// Make music functions globally available
window.drawMusic = drawMusic;
window.musicWithPlayback = musicWithPlayback;
enableFloatingFootnotes();
anchorizeHeadings();
initCollapsibleAlerts();

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.scrollToTop = scrollToTop;

// automatically close dropdown links if the user scrolls
docReady(() => {
    const menu = document.getElementById("right-links-details");
    // if 'menu' is null it will fail noisily
    menu.addEventListener("toggle", (_event) => {
        if (menu.open) {
            document.addEventListener(
                "scroll",
                (_event) => {
                    menu.open = false;
                },
                { once: true },
            );
        }
    });
    // show the scroll-to-top button when the user scrolls down 20px from the top
    // and auto-hide when scrolling down to reduce occlusion
    let button = document.getElementById("scroll-button");
    let lastScrollTop = 0;
    let scrollDirection = "up";

    document.addEventListener("scroll", showScrollButton);

    function showScrollButton() {
        const currentScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        // Determine scroll direction
        scrollDirection = currentScroll > lastScrollTop ? "down" : "up";
        lastScrollTop = currentScroll;
        const atBottom =
            window.innerHeight + currentScroll >=
            document.body.offsetHeight - 100;
        const shouldShow =
            currentScroll > 20 && (scrollDirection === "up" || atBottom);

        if (shouldShow) {
            button.style.opacity = "1";
            button.style.pointerEvents = "auto";
        } else {
            button.style.opacity = "0";
            button.style.pointerEvents = "none";
        }
    }
});

// change the theme color based on whether the navbar is visible or not
// (and therefore the fill around the dynamic island on iOS)
docReady(() => {
    const nav = document.querySelector(".navbar nav");
    const metaTagLight = document.querySelector(
        'meta[name="theme-color"][data-tag=light]',
    );
    const metaTagDark = document.querySelector(
        'meta[name="theme-color"][data-tag=dark]',
    );

    // the background color is different based on screen size for certain combinations of CSS classes
    const floatingSheetBreakpoint = window.matchMedia("(min-width: 720px)");

    let isNavbarVisible = true;
    const updateThemeColors = () => {
        if (isNavbarVisible) {
            metaTagLight.setAttribute("content", "#689d6a");
            metaTagDark.setAttribute("content", "#8ec07c");
        } else {
            const bodyIsFullscreenSheet =
                document.body.classList.contains("look-sheet-bkg") &&
                !floatingSheetBreakpoint.matches;
            if (bodyIsFullscreenSheet) {
                metaTagLight.setAttribute("content", "#f9f5d7");
            } else {
                metaTagLight.setAttribute("content", "#fbf1c7");
            }
            // this is the same color regardless of sheet / no sheet
            metaTagDark.setAttribute("content", "#282828");
        }
    };

    const observer = new IntersectionObserver(
        (entries, _observer) => {
            isNavbarVisible = entries[0].isIntersecting;
            updateThemeColors();
        },
        {
            root: null,
            rootMargin: "0px",
            threshold: [0],
        },
    );
    observer.observe(nav);
    floatingSheetBreakpoint.addEventListener("change", () => {
        updateThemeColors();
    });

    // Light/Dark mode slider toggle logic
    const themeTransitions = new ColorModeTransition({
        duration: 700,
        easing: "ease",
        respectReducedMotion: true,
    });
    const toggle = document.getElementById("theme-toggle");

    const currentTheme = themeTransitions.initTheme();
    toggle.checked = currentTheme === "dark";

    toggle.addEventListener("change", function () {
        const newTheme = toggle.checked ? "dark" : "light";
        themeTransitions.changeTheme(newTheme);
    });
});
