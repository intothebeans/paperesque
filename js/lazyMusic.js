import {
    lazyLoadOnVisible,
    lazyLoadScript,
    lazyLoadCSS,
} from "./utils/lazyLoad";
import { drawMusic, musicWithPlayback } from "./music";

function loadMusicResources(musicData) {
    return new Promise((resolve, reject) => {
        if (window.ABCJS && drawMusic) {
            resolve();
            return;
        }

        let loadedScripts = 0;
        const totalScripts = 2;

        function onScriptLoad() {
            loadedScripts++;
            if (loadedScripts === totalScripts) {
                resolve();
            }
        }

        lazyLoadCSS(
            musicData.resources.css,
            musicData.resources.cssIntegrity,
            "abcjs-css",
        ).catch((error) => {
            console.error("loadMusicResources: Failed to load CSS:", error);
            reject(error);
        });

        // Load scripts
        ["abcjs", "music"].forEach((scriptType) => {
            const src = musicData.resources[scriptType];
            const integrity = musicData.resources[scriptType + "Integrity"];
            lazyLoadScript(
                src,
                integrity,
                `abcjs-${scriptType}`,
                onScriptLoad,
            ).catch((error) => {
                console.error(
                    "loadMusicResources: Failed to load script",
                    scriptType,
                    error,
                );
                reject(error);
            });
        });
    });
}

function renderMusic(musicContainer, musicData) {
    try {
        const musicElement = document.getElementById(musicData.id);

        if (musicData.lazy) musicElement.removeAttribute("data-abc-lazy");

        if (musicData.enablePlayback) {
            musicWithPlayback(
                musicData.id,
                musicData.content,
                musicData.options,
            );
        } else if (drawMusic) {
            drawMusic(musicData.id, musicData.content, musicData.options);
        } else {
            throw new Error("Music rendering functions not available");
        }

        musicContainer.classList.add("music-loaded");
    } catch (error) {
        console.error("Error rendering music:", error);
        musicContainer.classList.add("music-error");

        // Fallback: show raw ABC notation
        const musicElement = document.getElementById(musicData.id);
        if (musicData.lazy) musicElement.removeAttribute("data-abc-lazy");
        musicElement.innerHTML =
            '<details class="abc-raw">' +
            "<summary>Show ABC Notation</summary>" +
            "<pre>" +
            musicData.content +
            "</pre>" +
            "</details>";
    }
}

function intersectionHandler(musicContainer, musicData) {
    function loadFunc() {
        loadMusicResources(musicData)
            .then(() => {
                setTimeout(() => renderMusic(musicContainer, musicData), 100);
                console.info("Music resources loaded and rendered.");
            })
            .catch((error) => {
                console.error("Failed to load music resources:", error);
                musicContainer.classList.add("music-error");
                const musicElement = document.getElementById(musicData.id);
                if (musicElement && musicData.lazy) {
                    musicElement.removeAttribute("data-abc-lazy");
                }
            });
    }

    lazyLoadOnVisible(musicContainer, loadFunc, "50px");
}

window.intersectionHandler = intersectionHandler;
window.loadMusicResources = loadMusicResources;
window.renderMusic = renderMusic;
