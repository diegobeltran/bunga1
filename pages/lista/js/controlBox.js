(function () {
    "use strict";
    function createControlBox() {

        var controlBoxArea = document.querySelector(".controlBoxArea");
        var data = ControlBox.configs;

        var numTables = 2;
        var bucketSizes = getBucketSizes(numTables, data.length);
       
        for (var i = 0; i < numTables; i++) {
            var subData = new WinJS.Binding.List(data.splice(0, bucketSizes[i]));
            if (bucketSizes[0] > bucketSizes[i]) {
                // Add placeholder item which will be invisible but take up space
                // when the tables seperate
                subData.push({placeholder: true});
            }
            controlBoxArea.appendChild(createTable(subData));
        }

        controlBoxArea.appendChild(createActionButtons());

    }

    function getBucketSizes(numTables, numRows ) {
        // Each element in bucketsizes represents the number of rows in a table
        var bucketSizes = [];
        var tableSize = Math.floor(numRows / numTables);
        for (var i = 0; i < numTables; i++) {
            bucketSizes[i] = tableSize;
        }

        // Distribute remaining rows after distributing equally
        var remainder = numRows - tableSize * numTables;
        var i = 0;
        while (remainder--) {
            bucketSizes[i]++;
            i++;
        }

        return bucketSizes;
    }

    function createTable(data) {
        var controlBox = document.createElement("table");
        controlBox.classList.add("controlBox");
        var controlBoxBody = document.createElement("tbody");
        controlBoxBody.classList.add("controlBoxBody");
        controlBox.appendChild(controlBoxBody);
        
        new WinJS.UI.Repeater(controlBoxBody, {
            data: data,
            template: ControlBox.controlBoxRowTemplate
        });
        return controlBox;
    }

    function createActionButtons() {

        var controlActionArea = document.createElement("div");
        controlActionArea.classList.add("controlActionArea");
        var actionBody = document.createElement("div");
        actionBody.classList.add("controlActionBody");
        controlActionArea.appendChild(actionBody);
        var data = new WinJS.Binding.List(ControlBox.actions);

        new WinJS.UI.Repeater(actionBody, {
            data: data,
            template: ControlBox.controlBoxActionTemplate
        });

        return controlActionArea;
    }

    WinJS.Namespace.define("ControlBox", {
        createControlBox: createControlBox
    });


})();