(function () {
    "use strict";
WinJS.Namespace.define("Sample", {
    modes: {
        play: {
            icon: "play",
            label: "Play",
            tooltip: "Play this song"
        },
        pause: {
            icon: "pause",
            label: "Pause",
            tooltip: "Pause this song"
        }
    },
    currentMode: null,
    togglePlayPause: WinJS.UI.eventHandler(function (ev) {
        var status = document.querySelector(".status");

        Sample.currentMode = (Sample.currentMode === Sample.modes.play) ? Sample.modes.pause : Sample.modes.play;
        var command = ev.currentTarget;
        if (command.winControl) {
            status.textContent = command.winControl.section + " command " + command.winControl.label + " was pressed";
            command.winControl.label = Sample.currentMode.label;
            command.winControl.icon = Sample.currentMode.icon;
            command.winControl.tooltip = Sample.currentMode.tooltip;
        }
    }),
    outputCommand: WinJS.UI.eventHandler(function (ev) {
        var status = document.querySelector(".status");
        var command = ev.currentTarget;
        if (command.winControl) {
            var label = command.winControl.label || command.winControl.icon || "button";
            var section = command.winControl.section || "";
            var msg = section + " command " + label + " was pressed";
            status.textContent = msg;
        }
    })
});

Sample.currentMode = Sample.modes.play;

WinJS.UI.processAll();

})();