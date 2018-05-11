(function () {
    "use strict";

    function initializeListView() {
        var listView = document.querySelector(".listView").winControl;
        addListViewEventListeners(listView);

        WinJS.Namespace.define("ListView", {
            listView: listView
        });

        window.addEventListener("resize", function () {
            ListView.listView.recalculateItemPosition();
        }, false);
    }

    function addListViewEventListeners(listView) {
        listView.itemTemplate = WinJS.UI.simpleItemRenderer(Templates.textWithImageTemplate);
        listView.groupHeaderTemplate = WinJS.UI.simpleItemRenderer(Templates.textHeaderTemplate);
        listView.addEventListener("iteminvoked", Notifications.itemInvoked, false);
        listView.addEventListener("groupheaderinvoked", Notifications.groupHeaderInvoked, false);
        listView.addEventListener("itemdragstart", itemDragStartHandler, false);
        listView.addEventListener("itemdragenter", Notifications.itemDragEnter, false);
        listView.addEventListener("itemdragend", itemDragEndHandler, false);
        listView.addEventListener("itemdragbetween", Notifications.itemDragBetween, false);
        listView.addEventListener("itemdragleave", Notifications.itemDragLeave, false);
        listView.addEventListener("itemdragechanged", Notifications.itemDragChanged, false);
        listView.addEventListener("itemdragdrop", Notifications.itemDragDrop, false);
        listView.addEventListener("keyboardnavigating", Notifications.keyboardNavigating, false);
        listView.addEventListener("loadingstatechanged", Notifications.loadingStateChanged, false);
        listView.addEventListener("selectionchanging", Notifications.selectionChanging, false);
        listView.addEventListener("selectionchanged", Notifications.selectionChanged, false);
    }

    function initializeDocumentation() {
        Documentation.updateInfoImmediate(Documentation.welcome);
    }

    function itemDragStartHandler(event) {
        Notifications.itemDragStart(event);

        // Pass indices of dragged items into event so they're available for later drag events
        event.detail.dataTransfer.setData("text", event.detail.dragInfo.getIndices().toString());
        event.detail.dataTransfer.effectAllowed = "all";

        Dragging.garbageCan.activate();
    }

    function itemDragEndHandler(event) {
        Notifications.itemDragEnd(event);
        Dragging.garbageCan.deactivate();
    }

    function addClipboardEvents() {
        var clipboard = document.querySelector(".copyToClipboardButton");

        // In Chrome / Safari you can't copy content to the keyboard.  Detecting the browser in lieu of a
        // good way to perform feature detection
        var userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Chrome") !== -1 || userAgent.indexOf("Safari") !== -1 ) {
            clipboard.style.display = "none";
            return;
        }
        
        clipboard.style.opacity = 0;
        clipboard.addEventListener("click", function () {
            copyCodeToClipboard();
            this.style.backgroundColor = "#3A8F3A";
        }, false);
        var codeContainer = document.querySelector(".selectionSampleCodePre");
        codeContainer.addEventListener("mouseenter", function () {
            WinJS.UI.Animation.fadeIn(clipboard);
        }, false);
        codeContainer.addEventListener("mouseleave", function () {
            WinJS.UI.Animation.fadeOut(clipboard).done(function () {
                clipboard.style.backgroundColor = "#000000";
            });
        }, false);
    }

    function copyCodeToClipboard() {
        var codeElem = document.querySelector(".selectionSampleCode");
         if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(codeElem);
            window.getSelection().addRange(range);
            document.execCommand("Copy");
            window.getSelection().removeAllRanges();
        }
    }

    WinJS.Namespace.define("Init", {
        initializeListView: initializeListView,
        initializeDocumentation: initializeDocumentation,
        addClipboardEvents: addClipboardEvents
    });
})();