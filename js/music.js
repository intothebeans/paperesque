import ABCJS from "abcjs";

const defaultAbcOpts = {
    responsive: "resize",
    add_classes: true,
};

var loaded = false;

function musicWithPlayback(musicID, musicString, abcOpts = null) {
    // Merge provided options with defaults
    const mergedAbcOpts = { ...defaultAbcOpts, ...(abcOpts || {}) };

    function CursorControl() {
        var self = this;
        self.onStart = function () {
            var svg = document.querySelector("#" + musicID + " svg");
            var cursor = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line",
            );
            cursor.setAttribute("class", "abcjs-cursor");
            cursor.setAttributeNS(null, "x1", 0);
            cursor.setAttributeNS(null, "y1", 0);
            cursor.setAttributeNS(null, "x2", 0);
            cursor.setAttributeNS(null, "y2", 0);
            svg.appendChild(cursor);
        };
        self.beatSubdivisions = 4;
        self.onEvent = function (ev) {
            if (ev.measureStart && ev.left === null) return; // this was the second part of a tie across a measure line. Just ignore it.

            var lastSelection = document.querySelectorAll(
                "#" + musicID + " svg .highlight",
            );
            for (var k = 0; k < lastSelection.length; k++)
                lastSelection[k].classList.remove("highlight");

            for (var i = 0; i < ev.elements.length; i++) {
                var note = ev.elements[i];
                for (var j = 0; j < note.length; j++) {
                    note[j].classList.add("highlight");
                }
            }

            var cursor = document.querySelector(
                "#" + musicID + " svg .abcjs-cursor",
            );
            if (cursor) {
                cursor.setAttribute("x1", ev.left - 2);
                cursor.setAttribute("x2", ev.left - 2);
                cursor.setAttribute("y1", ev.top);
                cursor.setAttribute("y2", ev.top + ev.height);
            }
        };
        self.onFinished = function () {
            var els = document.querySelectorAll("svg .highlight");
            for (var i = 0; i < els.length; i++) {
                els[i].classList.remove("highlight");
            }
            var cursor = document.querySelector(
                "#" + musicID + " svg .abcjs-cursor",
            );
            if (cursor) {
                cursor.setAttribute("x1", 0);
                cursor.setAttribute("x2", 0);
                cursor.setAttribute("y1", 0);
                cursor.setAttribute("y2", 0);
            }
        };
    }
    var cursorControl = new CursorControl();
    var synthControl;
    var audioContext;
    var onClick = function clickListener(abcElem) {
        var lastClicked = abcElem.midiPitches;
        if (!lastClicked) return;

        if (typeof abcElem.currentTrackMilliseconds === "object")
            var seekPosition = abcElem.currentTrackMilliseconds[0] / 1000;
        else var seekPosition = abcElem.currentTrackMilliseconds / 1000;

        synthControl.seek(seekPosition, "seconds");

        // If not playing, just play the individual note
        ABCJS.synth
            .playEvent(
                lastClicked,
                abcElem.midiGraceNotePitches,
                synthControl.visualObj.millisecondsPerMeasure(),
            )
            .then(function (response) {
                console.log("note played", response);
            })
            .catch(function (error) {
                console.log("error playing note", error);
            });
    };

    var abcOptions = {
        ...mergedAbcOpts,
        clickListener: onClick,
    };

    if (ABCJS.synth.supportsAudio()) {
        synthControl = new ABCJS.synth.SynthController();
        synthControl.load("#audio", cursorControl, {
            displayLoop: true,
            displayRestart: true,
            displayPlay: true,
            displayProgress: false,
            displayWarp: false,
        });
    } else {
        document.querySelector("#audio").innerHTML =
            "<div class='audio-error'>Audio is not supported in this browser.</div>";
    }

    synthControl.disable(true);
    var visualObj = ABCJS.renderAbc(musicID, musicString, abcOptions)[0];
    window.addEventListener("scroll", function () {
        if (!audioContext) audioContext = new AudioContext();
        if (loaded) return;
        initAudio(
            musicID,
            musicString,
            abcOptions,
            audioContext,
            synthControl,
            visualObj,
        );
        loaded = true;
        synthControl.disable(false);
    });
}

function initAudio(
    musicID,
    musicString,
    abcOptions,
    context,
    synthControl,
    visualObj,
) {
    var midi = ABCJS.synth.getMidiFile(musicString, {
        downloadLabel: "Download MIDI",
    });
    var midiButton = document.querySelector(".midi");
    if (midiButton) {
        midiButton.innerHTML = midi;
    }
    var midiBuffer = new ABCJS.synth.CreateSynth();
    if (!context) {
        console.error("AudioContext not initialized");
    }
    console.log("Loading audio...");
    midiBuffer
        .init({
            audioContext: context,
            visualObj: visualObj,
            options: {
                soundFontUrl:
                    "https://paulrosen.github.io/midi-js-soundfonts/MusyngKite/",
            },
        })
        .then(function (response) {
            console.log(response);
            if (synthControl) {
                synthControl
                    .setTune(visualObj, false, {
                        soundFontUrl:
                            "https://paulrosen.github.io/midi-js-soundfonts/MusyngKite/",
                    })
                    .then(function (response) {
                        console.log("Audio successfully loaded.", response);
                    })
                    .catch(function (error) {
                        console.warn("Audio problem:", error);
                    });
            }
        })
        .catch(function (error) {
            console.warn("Audio problem:", error);
        });
}

// wrap ABCJS.renderAbc
function drawMusic(musicID, musicString, abcOpts = null) {
    // Merge provided options with defaults
    const mergedAbcOpts = { ...defaultAbcOpts, ...(abcOpts || {}) };
    return ABCJS.renderAbc(musicID, musicString, mergedAbcOpts)[0];
}

export { drawMusic, musicWithPlayback };
