(function () {
    "use strict";
    function controlBoxRowTemplate(item) {

        if (item.placeholder) {
            var blank = document.createElement("tr");
            blank.classList.add("controlBoxPlaceholder");
            return blank;
        }

        var row = document.createElement("tr");
        row.className = "controlBoxRow";

        var label = document.createElement("td");
        label.classList.add("controlBoxLabel");

        // LongLabel is applied to labels with a large number of
        // characters to reduce the font size
        if (item.name.length > 18) {
            label.classList.add("longLabel");
        }
        label.textContent =  item.name;
        row.appendChild(label);

        var value = document.createElement("td");
        value.classList.add("controlBoxValue");

        var selector = document.createElement("select");
        selector.classList.add("controlBoxSelector");
        var options = item.subOptions;
        for (var i = 0, len = options.length; i < len; i++) {
            var option = document.createElement("option");
            option.text = options[i].name;
            option.labelTitle = item.name;
            option.itemData = item.subOptions[i];
            selector.add(option);
        }
        adjustTextSize(selector);

        value.appendChild(selector);
        row.appendChild(value);

        selector.addEventListener("change", function (event) {
            changeListener(event, this);
        }, false);

        selector.addEventListener("click", function (event) {
            clickListener(event, this, label);
        }, false);

        return row;
    }

    function changeListener(event, selector) {
        var option = selector.options[selector.selectedIndex];
        var item = option.itemData;
        item.eventMethod();
        GitHub.issueOpener.update(option.labelTitle, item.name)

        if ("notify" in item) {
            item.notify();
        }
    }

    function clickListener(event, selector, label) {
        var option = selector.options[selector.selectedIndex];
        adjustTextSize(selector,option);
        var item = option.itemData;
        Documentation.updateInfo(item.info);
        var prevSelected = document.querySelector(".controlBoxArea").querySelector(".selectedLabel");
        if (prevSelected) {
            prevSelected.classList.remove("selectedLabel");
        }
        label.classList.add("selectedLabel");
    }

    function adjustTextSize(selector, option) {
        option = option || selector.options[0];
        var text = option.textContent;
        
        // If the option text is long then apply class to reduce font size
        if (text.length > 12) {
            selector.classList.add("longSelector");
        } else {
            selector.classList.remove("longSelector");
        }
    }

    function controlBoxActionTemplate(action) {
        var actionRow = document.createElement("div");
        actionRow.classList.add("controlBoxActionRow");
        var select = createSelector(action);
        var button = createButton(action);
        connectActionElements(select, button);
        actionRow.appendChild(button);
        actionRow.appendChild(select);
        return actionRow;
    }

    function createSelector(action) {
        var select = document.createElement("select");
        select.classList.add("controlBoxActionSelector");
        select.classList.add("win-dropdown");
        var subOptions = action.subOptions;
        for (var i = 0, length = subOptions.length; i < length; i++) {
            var option = document.createElement("option");
            option.text = subOptions[i].name;
            option.itemData = subOptions[i];
            select.add(option);
        }
        return select;
    }

    function createButton(action) {
        var button = document.createElement("button");
        button.classList.add("controlBoxButton");
        button.classList.add("win-button");
        button.textContent = action.name;
        return button;
    }

    function connectActionElements(select, button) {
        var option = select.options[select.selectedIndex];
        button.onclick = function () {
            option.itemData.eventMethod();
        }
        select.addEventListener("change", function () {
            var option = this.options[this.selectedIndex];
            button.onclick = function () {
                option.itemData.eventMethod();
            }
        }, false);

        select.addEventListener("click", function () {
            var option = this.options[this.selectedIndex];
            Documentation.updateInfo(option.itemData.info);
        }, false);
    }

    WinJS.Namespace.define("ControlBox", {
        controlBoxRowTemplate: controlBoxRowTemplate,
        controlBoxActionTemplate: controlBoxActionTemplate
    });
})();