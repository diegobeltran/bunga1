(function () {
    "use strict";
    
   
      
    function generateItem(itemOptions) {
        var num = Math.random() * itemOptions.length;
        var item = itemOptions[Math.floor(num)];
        return cloneItem(item);
    }

    function createData() {
        var items = [];

        for (var i = 0; i < 10000 ; i++) {
            items.push(generateItem(myData_temp));
        }
        return items;
    }

    function groupData(bindingList) {
        var groupedData = bindingList.createGrouped(function (item) {
            // Items will be sorted into groups based on this value
            return item.title.toUpperCase().charAt(0);
        }, function (item) {
            // This function returns an object that will serve as the
            // data item for the header of each group (runs on only one element from each group)
            return {
                title: item.title.toUpperCase().charAt(0),
                picture: item.picture
            };
        }, function (left, right) {
            // This function will be used to determine the order of the groups.
            // Left and right are group keys
            return left.charCodeAt(0) - right.charCodeAt(0);
        });

        return groupedData;
    }

    function addElement() {
        var indices = getActionItemIndices();

        if (indices.length === 1) {
            addElementAt(indices);
        } else {
            addElementAt(indices[0]);
        }
    }

    function addElementAt(index) {

        var data = getListViewData();
        var newItem;
        if (ListView.listView.groupDataSource) {
            var item = data.getItem(index);
            newItem = cloneItem(item);
        } else {
            newItem = generateItem(myData_temp);
        }
        data.splice(index, 0, newItem);
    }

    function deleteElement() {
        var indices = getActionItemIndices(true);
        for (var i = indices.length - 1; i >= 0; i--) {
            deleteElementAt(indices[i]);
        }
    }

    function deleteElementAt(index) {
        var data = getListViewData();
        data.splice(index, 1);
    }

    function changeElement() {
        var indices = getActionItemIndices();

        for (var i = 0; i < indices.length; i++) {
            changeElementAt(indices[i]);
        }
    }

    function changeElementAt(index) {
        var data = getListViewData();
        var item = data.getAt(index);
        item.title = item.title.split("").reverse().join("");
        data.setAt(index, item);
    }

    // Gets selected item indices or 0 if none are selected
    function getActionItemIndices(oneItem) {
        var indices = [];
        if (ListView.listView.selection.count() > 0) {
            indices = ListView.listView.selection.getIndices();
        } else {
            indices.push(0);
        }
        return indices;
    }

    function cloneItem(item) {
        if (item.data) {
            return {
                title: item.data.title,
                text: item.data.text,
                picture: item.data.picture
            };

        } else {
            return {
                title: item.title,
                text: item.text,
                picture: item.picture
            };
        }
    }

    function getListViewData() {
        return ListView.listView.itemDataSource.list;
    }

    function assignSmallDataset() {
        if (ListView.listView.groupDataSource) {
            ListView.listView.itemDataSource = ListView.smallGroupedData.dataSource;
            ListView.listView.groupDataSource = ListView.smallGroupedData.groups.dataSource;
        } else {
            ListView.listView.groupDataSource = null;
            ListView.listView.itemDataSource = ListView.smallData.dataSource;
        }
    }

    function assignLargeDataset() {
        if (ListView.listView.groupDataSource) {
            ListView.listView.itemDataSource = ListView.groupedData.dataSource;
            ListView.listView.groupDataSource = ListView.groupedData.groups.dataSource;
        } else {
            ListView.listView.groupDataSource = null;
            ListView.listView.itemDataSource = ListView.data.dataSource;
        }
    }

    WinJS.Namespace.define("ListView.Data", {
        createData: createData,
        groupData: groupData,
        addElement: addElement,
        deleteElement: deleteElement,
        changeElement: changeElement,
        assignSmallDataset: assignSmallDataset,
        assignLargeDataset: assignLargeDataset
    });
})();