(function () {
    "use strict";
    function itemInvoked(eventInfo) {
        var index = eventInfo.detail.itemIndex;
        var notification = "onItemInvoked().  Item " + index + " was invoked!";
        notifier.postNotification(notification);
    }

    function groupHeaderInvoked(eventInfo) {
       var index = eventInfo.detail.groupHeaderIndex;
       var notification =  "onGroupHeaderInvoked().  Header " + index + " was invoked!";
       notifier.postNotification(notification);
    }

    function notify(notification) {
        return function () { notifier.postNotification(notification) };
    }

    function scrollPosition(pixel) {
        notifier.postNotification("Scrolled to pixel " + pixel);
    }

    function ensureVisibleMiddle() {
        var listView = document.querySelector(".listView").winControl;
        var index = listView.itemDataSource.length/2;
        notifier.postNotification("Ensured the middle item (item " + index + ") is visible");
    }
    function ensureVisibleLast() {
        var listView = document.querySelector(".listView").winControl;
        var index = listView.itemDataSource.length;
        notifier.postNotification("Ensured the last item (item " + index + ") is visible");
    }

    function itemDragStart(event) {
        var notification = "onItemDragStart().  Indices: " + getIndices(event);
        notifier.postNotification(notification);
    }

    function getIndices(event) {
        var detail = event.detail;
        var notification = detail.dragInfo.getIndices().toString();

        return notification;
    }

    function keyboardNavigating(event) {
        var detail = event.detail;
        notifier.postNotification("onKeyboardNavigating().  Navigated from item " + detail.oldFocus + " to item " + detail.newFocus);
    }

    function loadingStateChanged(event) {
        var listView = document.querySelector(".listView").winControl;
        var firstVisibleIndex = listView.indexOfFirstVisible;
        var lastVisibleIndex = listView.indexOfLastVisible;
        if (notifier) {
            notifier.postStickyNotification("onLoadingStateChanged().  First visible item: " + firstVisibleIndex + ", last visible item: " + lastVisibleIndex);
        }
    }

    function selectionChanged(event) {
        var listView = document.querySelector(".listView").winControl;
        var indices = listView.selection.getIndices();
        var indicesLimit = 15;
        if (indices.length > 0) {
            if (indices.length < indicesLimit) {
                var notification = "Indices: " + indices.toString();
            } else {
                var notification = "Indices: " + indices.splice(0, indicesLimit).toString() + "...";
            }
        } else {
            var notification = "No items are selected";
        }

        notifier.postStickyNotification("onSelectionChanged().  " + notification);
    }

    function postWarning(notification) {
        return function () {
            if (listViewIsNotGrouped()) {
                notifier.postNotification(notification, Notifier.NotificationTypes.warning);
            }
        }
    }

    function listViewIsNotGrouped() {
        return ListView.listView.groupDataSource === null || ListView.listView.groupDataSource === undefined;
    }

    // Controls logic for showing notifications
    var Notifier = WinJS.Class.define(
        function () {
            var _banner = document.querySelector(".notificationBanner");
            var _timeOut = null;
            var _interval = 4000;
            var _busy = false;

            this.postNotification = function postNotification(content, type) {
                if (_busy) {
                    return;
                }

                this.postStickyNotification(content, type);
                _timeOut = setTimeout(hideNotification, _interval);
            }

            // Sticky notifications don't timeout
            this.postStickyNotification = function postStickyNotification(content, type) {

                if (_busy) {
                    return;
                }

                if (_timeOut) {
                    clearTimeout(_timeOut);
                }
                showNotification(content, type);

                if (type === Notifier.NotificationTypes.warning) {
                    _busy = true;
                }
            }
            
            var hideNotification = function hideNotification() {
                _banner.hidden = true;
                _busy = false;
            }

            var showNotification = function showNotification(notification, type) {
                var color = (type ? type.color : Notifier.NotificationTypes.info.color);
                _banner.style.backgroundColor = color;
                _banner.hidden = false;
                _banner.textContent = notification;
                console.log(notification);
            }
        },
        {},
        {
            NotificationTypes: {
                info: {
                    color: "#007ACC"
                },
                warning: {
                    color: "#CA5100"
                }
            }
        }
    );

    var notifier = null
    WinJS.Utilities.ready(function () {
        notifier = new Notifier();
    });

    WinJS.Namespace.define("Notifications", {
        itemInvoked: itemInvoked,
        groupHeaderInvoked: groupHeaderInvoked,
        elementAdded: notify("Element Added"),
        elementDeleted: notify("Element deleted"),
        elementChanged: notify("Element changed"),
        scrollPosition: scrollPosition,
        ensureVisibleFirst: notify("Ensured the first item is visible"),
        ensureVisibleMiddle: ensureVisibleMiddle,
        ensureVisibleLast: ensureVisibleLast,
        itemDragStart: itemDragStart,
        itemDragEnter: notify("onItemDragEnter()"),
        itemDragEnd: notify("onItemDragEnd()"),
        itemDragBetween: notify("onItemDragBetween()"),
        itemDragLeave: notify("onItemDragLeave()"),
        itemDragChanged: notify("onItemDragChanged()"),
        itemDragDrop: notify("onItemDragDrop()"),
        keyboardNavigating: keyboardNavigating,
        loadingStateChanged: loadingStateChanged,
        selectionChanging: notify("onSelectionChanging()"),
        selectionChanged: selectionChanged,
        dataSourceSmall: notify("Data source changed to 100 items"),
        dataSourceLarge: notify("Data source changed to 10000 items"),
        groupHeaderPositionWarning: postWarning("Group header position changed, enable grouping to see the group header."),
        groupHeaderTemplateWarning: postWarning("Group header template changed, enable grouping to see the group header template."),
        groupHeaderTapBehaviorWarning: postWarning("Group header tap behavior changed, enable grouping to see the group header.")
    });
})();