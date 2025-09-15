function lazyLoadScript(src, integrity, id = null, onloadFunction) {
    return new Promise((resolve, reject) => {
        if (!onloadFunction) {
            onloadFunction = resolve;
        }
        if (id && document.getElementById(id)) {
            onloadFunction();
            return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        if (integrity) {
            script.integrity = integrity;
            script.crossOrigin = "anonymous";
        }
        if (id) {
            script.id = id;
        }

        script.onload = () => {
            onloadFunction();
        };
        script.onerror = () =>
            reject(new Error(`Failed to load script: ${src}`));

        document.head.appendChild(script);
    });
}

function lazyLoadCSS(href, integrity = null, id = null) {
    return new Promise((resolve, reject) => {
        if (id && document.getElementById(id)) {
            resolve();
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        if (integrity) {
            link.integrity = integrity;
            link.crossOrigin = "anonymous";
        }
        if (id) {
            link.id = id;
        }

        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));

        document.head.appendChild(link);
    });
}

// Intersection Observer for lazy loading on scroll
function lazyLoadOnVisible(element, loadFunction, rootMargin = "100px") {
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadFunction(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin },
        );
        observer.observe(element);
    } else {
        // Fallback for browsers without IntersectionObserver support
        window.addEvenetListener("DOMContentLoaded", () => {
            loadFunction(element);
        });
    }
}

export { lazyLoadScript, lazyLoadCSS, lazyLoadOnVisible };
