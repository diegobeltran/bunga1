(function () {
    "use strict";

    function setOrientation(orientation) {
        ListView.listView.layout.orientation = orientation;
    }

    function setLayout(layout) {
        layout.orientation = ListView.listView.layout.orientation;
        layout.groupHeaderPosition = ListView.listView.layout.groupHeaderPosition;
        ListView.listView.layout = layout;
    }

    function groupItems(groupItems) {
        if (groupItems) {
            getGroupedData().done(function (groupedData) {
                ListView.listView.itemDataSource = groupedData.dataSource;
                ListView.listView.groupDataSource = groupedData.groups.dataSource;
            });
        } else {
            getData().done(function (itemData) {
                ListView.listView.groupDataSource = null;
                ListView.listView.itemDataSource = itemData.dataSource;
            });
        }
    }

    function getGroupedData() {
        return ListView.listView.itemDataSource.getCount().then(function (count) {
            if (count === ListView.smallData.length) {
                return ListView.smallGroupedData;
            } else {
                return ListView.groupedData;
            }
        });
    }

    function getData() {
        return ListView.listView.itemDataSource.getCount().then(function (count) {
            if (count === ListView.smallData.length) {
                return ListView.smallData;
            } else {
                return ListView.data;
            }
        });
    }

    function selectHeaderPosition(position) {
        ListView.listView.layout.groupHeaderPosition = position;
    }

    WinJS.Namespace.define("Layout", {

        setOrientation: setOrientation,
        groupItems: groupItems,
        setLayout: setLayout,
        selectHeaderPosition: selectHeaderPosition
    });
})();