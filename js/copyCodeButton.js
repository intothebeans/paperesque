// This code was lifted and adapted from Michael Rosen's Minimal Mistakes theme
function copyTextDefault(text) {
    if (!navigator.clipboard) {
        console.warn("Clipboard API not supported");
        throw new Error("Clipboard API not supported");
    }
    navigator.clipboard.writeText(text).then(
        () => true,
        () => console.error("Failed to copy text" + text),
    );
}

function copyTextHacky(text) {
    const isRTL = document.documentElement.getAttribute("dir") === "rtl";
    var textArea = document.createElement("textarea");
    textArea.className = "cliboard-hacky";
    textArea.style[isRTL ? "right" : "left"] = "-100%";
    const yScroll = window.pageYOffset || document.documentElement.scrollTop;
    textArea.style.top = yScroll + "px";
    textArea.setAttribute("readonly", "");
    textArea.value = text;
    document.body.appendChild(textArea);
    try {
        textArea.select();
        textArea.setSelectionRange(0, text.length);
        document.execCommand("copy");
    } catch (err) {
        console.error("Failed to copy text" + text, err);
        throw err;
    }
    document.body.removeChild(textArea);
}

function swapIcon(parentNode) {
    var copyIcon = parentNode.querySelector(".copy-code-icon");
    var checkIcon = parentNode.querySelector(".copy-code-success");
    copyIcon.style.opacity = 0;
    copyIcon.style.scale = 0.2;
    checkIcon.style.opacity = 1;
    setTimeout(() => {
        copyIcon.style.opacity = 1;
        copyIcon.style.scale = 1;
        checkIcon.style.opacity = 0;
    }, 1500);
}

function initCopyCodeButtons() {
    var buttons = document.querySelectorAll(".copy-code-button");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            var textJSON = button.parentNode
                .getElementsByClassName("meta-code-text")[0]
                .getAttribute("content");
            var text;
            try {
                text = JSON.parse(textJSON);
            } catch (e) {
                console.warn("Parsing JSON failed, using raw text", e);
                text = textJSON;
            }
            try {
                copyTextDefault(text);
                swapIcon(button);
            } catch (err) {
                console.warn("Falling back to hacky copy method" + err);
                try {
                    copyTextHacky(text);
                    swapIcon(button);
                } catch (err) {
                    console.error("Both copy methods failed" + err);
                }
            }
        });
    });
}

export default initCopyCodeButtons;
