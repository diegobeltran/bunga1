(function () {
    "use strict";

    function ensureFirstItemVisible() {
        ListView.listView.ensureVisible(0);
    }

    function ensureMiddleItemVisible() {
        ListView.listView.itemDataSource.getCount().done(
           function (count) {
               ListView.listView.ensureVisible(Math.floor(count / 2));
           },
           function () {}
        );
    }

    function ensureLastItemVisible() {
        ListView.listView.itemDataSource.getCount().done(
            function (count) {
                ListView.listView.ensureVisible(count - 1);
            },
            function () {}
        );
    }

    function scrollPosition(pixel) {
        ListView.listView.scrollPosition = pixel;
    }

    WinJS.Namespace.define("ListView.Methods", {
        ensureFirstItemVisible: ensureFirstItemVisible,
        ensureMiddleItemVisible: ensureMiddleItemVisible,
        ensureLastItemVisible: ensureLastItemVisible,
        scrollPosition: scrollPosition
    });

})();