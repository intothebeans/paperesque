import { docReady } from "./utils";
import initCopyCodeButtons from "./components/copyCodeButton.js";
import { initScrollButtons } from "./components/scrollTopButton.js";

function initDarkmodeLightmodeToggle() {
    // Light/Dark mode slider toggle logic
    const toggle = document.getElementById("theme-toggle");
    const label = document.getElementById("theme-toggle-label");
    label.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle.click();
        }
    });

    const currentTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");
    document.documentElement.setAttribute("data-theme", currentTheme);

    toggle.checked = currentTheme === "dark";
    toggle.addEventListener("change", function () {
        const newTheme = toggle.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
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

function initScrollProgressBar() {
    document.addEventListener("scroll", () => {
        var progressHeader = document.getElementById("progress-header");
        if (!progressHeader) {
            return;
        }
        var scroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (scroll > 60) {
            progressHeader.style.opacity = "1";
        } else {
            progressHeader.style.opacity = "0";
        }

        let scrollHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
        );
        let clientHeight = Math.min(
            document.body.clientHeight,
            document.documentElement.clientHeight,
            window.innerHeight,
        );
        let height = scrollHeight - clientHeight;
        let scrolled = Math.min(100, (scroll / height) * 100);

        document.getElementById("scroll-progress").style.width = scrolled + "%";
    });
}

docReady(() => {
    initDarkmodeLightmodeToggle();
    initSetStickyNavOnMobile();
    initScrollProgressBar();
    initScrollButtons();
    initCopyCodeButtons();
});
