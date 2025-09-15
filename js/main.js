import anchorizeHeadings from "./components/anchorizeHeadings.js";
import enableFloatingFootnotes from "./components/floatingFootnotes.js";
import { docReady } from "./utils/utils.js";

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

docReady(() => {
    initChangeThemeColorWithNav();
});
