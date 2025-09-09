import anchorizeHeadings from "./anchorizeHeadings.js";
import enableFloatingFootnotes from "./floatingFootnotes.js";
import { docReady } from "./utils.js";
import ColorModeTransition from "./colorModeTransition.js";
import { drawMusic, musicWithPlayback } from "./music.js";
import { initCollapsibleAlerts } from "./blockquoteAlertsAnimations.js";
import { initScrollButtons } from "./scrollButton.js";
import { initRightLinksAnimation } from "./rightLinksAnimation.js";
import "iconify-icon";

// Make functions globally available
window.drawMusic = drawMusic;
window.musicWithPlayback = musicWithPlayback;

enableFloatingFootnotes();
anchorizeHeadings();

// change the theme color based on whether the navbar is visible or not
// (and therefore the fill around the dynamic island on iOS)
function initChangeThemeColorWithNav() {
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
}

function initDarkmodeLightmodeToggle() {
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
}

function initSetStickyNavOnMobile() {
    if (location.pathname === "/") {
        return; // already set
    }
    document.addEventListener("scroll", () => {
        if (window.innerWidth < 720) {
            document
                .getElementsByTagName("body")[0]
                .classList.add("sticky-nav");
        } else {
            document
                .getElementsByTagName("body")[0]
                .classList.remove("sticky-nav");
        }
    });
}

docReady(() => {
    initCollapsibleAlerts();
    initDarkmodeLightmodeToggle();
    initChangeThemeColorWithNav();
    initScrollButtons();
    initRightLinksAnimation();
    initSetStickyNavOnMobile();
});
