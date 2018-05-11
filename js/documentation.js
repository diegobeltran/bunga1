(function () {
    "use strict";

    function readFile() {
        WinJS.xhr({
            url: './codeSamples.txt',
            responseType: "json"
        }).done(
            function (result) {
                if (result.status === 200) {
                    var response = result.response;
                    if (typeof result.response === "string") {
                        response = JSON.parse(response);
                    } 
                    for (var key in response) {
                        library[key].code = response[key];
                    }
                }
            },
            function (result) {
                // Do nothing on file load error
            }
        );
    }

    var welcome = {
        id: 0,
        description: "Here you can play with the different configurations and methods of ListView.  Never used ListView before?  <a class=\"win-link\" target=\"_blank\" href=\"http://msdn.microsoft.com/en-us/library/windows/apps/hh465496.aspx\">Click here</a> for an example of how to get started.",
        title: "Welcome"
    };

    var library = {

        horizontalOrientation: {
            id: 1,
            description: "Sets the orientation of the ListView to horizontal.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/dn301804.aspx",
            title: "Horizontal Orientation"
        },

        verticalOrientation: {
            id: 2,
            description: "Sets the orientation of the ListView to vertical.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/dn301804.aspx",
            title: "Vertical Orientation"
        },

        gridLayout: {
            id: 3,
            description: "Sets the layout of the ListView to a GridLayout in which items are arranged in a horizontal grid.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/br211751.aspx",
            title: "Grid Layout",
        },

        listLayout: {
            id: 4,
            description: "Sets the layout of the ListView to a ListLayout in which items are arranged in a vertical list.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/br211792.aspx",
            title: "List Layout"
        },

        itemTemplateTextWithImage: {
            id: 5,
            description: "Gets or sets the WinJS.Binding.Template or templating function that creates the Document Object Model (DOM) elements for each item in the itemDataSource. Each Item can contain multiple elements, but it must have a single root element.  Here's an example of a simple template with an image and some text.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/jj585523.aspx",
            title: "Item Template"
        },

        itemTemplateImage: {
            id: 6,
            description: "Gets or sets the WinJS.Binding.Template or templating function that creates the Document Object Model (DOM) elements for each item in the itemDataSource. Each Item can contain multiple elements, but it must have a single root element.  Here's an example of a simple template with just an image.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/jj585523.aspx",
            title: "Item Template"
        },

        itemTemplateInline: {
            id: 7,
            description: "Gets or sets the WinJS.Binding.Template or templating function that creates the Document Object Model (DOM) elements for each item in the itemDataSource. Each Item can contain multiple elements, but it must have a single root element.  Here's an example of a template that's been declared inline in the HTML.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/jj585523.aspx",
            title: "Item Template"
        },

        itemTemplateInteractive: {
            id: 8,
            description: "Gets or sets the WinJS.Binding.Template or templating function that creates the Document Object Model (DOM) elements for each item in the itemDataSource. Each Item can contain multiple elements, but it must have a single root element.  Here's an example of a template that includes another component.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/jj585523.aspx",
            title: "Item Template"
        },
    
        itemsReorderable: {
            id: 9,
            description: "Gets or sets a value that specifies whether the ListView control's items can be reordered within itself by dragging and dropping.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/dn423315.aspx",
            title: "Items Reorderable: True"
        },

        itemsNotReorderable: {
            id: 10,
            description: "Gets or sets a value that specifies whether the ListView control's items can be reordered within itself by dragging and dropping.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/dn423315.aspx",
            title: "Items Reorderable: False"
        },

        tapBehaviorNone: {
            id: 11,
            description: "When an item is clicked or tapped the item is neither selected nor invoked.  A right-click will still select an item if the selection mode is not none.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh700733.aspx",
            title: "Tap Behavior: None"
        },

        tapBehaviorDirectSelect: {
            id: 12,
            description: "When an item is clicked or tapped the item is selected and invoked (the ListView's oniteminvoked event will fire).  If Selection Mode is set to None the item will not be selected.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh700733.aspx",
            title: "Tap Behavior: Direct Select"
        },

        tapBehaviorToggleSelect: {
            id: 13,
            description: "When an item is clicked or tapped it is selected if it was not already selected and is deselected if it was already selected.  In either case it will be invoked (the ListView's oniteminvoked event will fire).  If Selection Mode is set to None the item will not be selected/unselected.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh700733.aspx",
            title: "Tap Behavior Toggle Select"
        },

        tapBehaviorInvoke: {
            id: 14,
            description: "When an item is clicked or tapped it is invoked but not selected.  Invoked means that the ListView's oniteminvoked event will fire.    A right-click will still select an item if the selection mode is not none.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh700733.aspx",
            title: "Tap Behavior Invoke Only"
        },

        selectionModeNone: {
            id: 15,
            description: "When an item is clicked or tapped it will not be selected regardless of the tap behavior",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465449.aspx",
            title: "Selection Mode: None"
        },

        selectionModeSingle: {
            id: 16,
            description: "No more than one item in the ListView may be selected at a time.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465449.aspx",
            title: "Selection Mode: Single"
        },

        selectionModeMulti: {
            id: 17,
            description: "More than one item in the ListView can be selected at the same time.  the tap behavior must be set to Toggle Select to select multiple items",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465449.aspx",
            title: "Selection Mode: Multi"
        },

        groupItemsYes: {
            id: 18,
            description: "ListView sorts its items into groups when it's datasource is a grouped list projection.  As the projection changes, the ListView reacts to those changes and may also change.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Items"
        },

        groupItemsNo: {
            id: 19,
            description: "ListView sorts its items into groups when it's datasource is a grouped list projection.  As the projection changes, the ListView reacts to those changes and may also change.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Ungroup Items"
        },

        groupHeaderTemplateText: {
            id: 20,
            description: "Gets or sets the Template or function that creates the Document Object Model (DOM) elements for each group header in the groupDataSource. Each group header can contain multiple elements, but it must have a single root element.  Here's an example of a template containing only the first letter of the group name.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Header Template"
        },

        groupHeaderTemplateTextWithImage: {
            id: 21,
            description: "Gets or sets the Template or function that creates the Document Object Model (DOM) elements for each group header in the groupDataSource. Each group header can contain multiple elements, but it must have a single root element.  Here's an example of a template that contains text and a button.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Header Template"
        },

        groupHeaderTemplateButton: {
            id: 22,
            description: "Gets or sets the Template or function that creates the Document Object Model (DOM) elements for each group header in the groupDataSource. Each group header can contain multiple elements, but it must have a single root element.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Header Template"
        },

        groupHeaderTemplateInteractive: {
            id: 23,
            description: "Gets or sets the Template or function that creates the Document Object Model (DOM) elements for each group header in the groupDataSource. Each group header can contain multiple elements, but it must have a single root element.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Header Template"
        },

        groupHeaderPositionTop: {
            id: 24,
            description: "Sets the position of the group header to be above the items in its group",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Header Position: Top"
        },

        groupHeaderPositionLeft: {
            id: 25,
            description: "Sets the position of the group header to be to the left of the items in its group",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Header Position: Left"
        },

        groupHeaderTapBehaviorNone: {
            id: 26,
            description: "When a header is clicked or tapped the item is neither selected nor invoked.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Header Tap Behavior: None"
        },

        groupHeaderTapBehaviorInvoke: {
            id: 27,
            description: "When a header is clicked or tapped the item is invoked but not selected.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/hh465464.aspx",
            title: "Group Header Tap Behavior: Invoke"
        },

        dataChangesAdd: {
            id: 28,
            description: "To add an element to the ListView you only have to add an element to the WinJS.Binding.List that is assigned to the itemDataSourceproperty of the ListView.  This change will be immediatley reflected in the ListView.   If the ListView is grouped then the data is stored in a different order than it is shown, so adding an element to index 0 of the Binding List may not add an element to the beginning of the grouped list.  The groups will be dynamically updated as you make changes to the dataset.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/Hh700774.aspx",
            title: "Adding An Element"
        },

        dataChangesDelete: {
            id: 29,
            description: "To delete an element to the ListView you only have to remove the element from the WinJS.Binding.List that is assigned to the itemDataSource property of the ListView.  This change will be immediatley reflected in the ListView. If the ListView is grouped then the groups will be dynamically updated as you make changes to the dataset.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/Hh700774.aspx",
            title: "Deleting An Element"
        },

        dataChangesChange: {
            id: 30,
            description: "To change an element in the ListView you only have to change the element in the WinJS.Binding.List that is assigned to the itemDataSource property of the ListView.  This change will be immediatley reflected in the ListView.  If the ListView is grouped then the data is stored in a different order than it is shown, so changing the element at index 0 may not change the first element shown in the ListView.  The groups will be dynamically updated as you make changes to the dataset.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/Hh700774.aspx",
            title: "Modifying An Element"
        },

        scrollPositionZero: {
            id: 31,
            description: "Gets or sets the distance, in pixels, of the start of the viewable area within the viewport.  For example, setting the scroll position to 0 would scroll the ListView to the beginning of the list",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/br211847.aspx",
            title: "Scroll Position"
        },

        scrollPositionFiveHundred: {
            id: 32,
            description: "Gets or sets the distance, in pixels, of the start of the viewable area within the viewport.  For example, setting the scroll position to 0 would scroll the ListView to the beginning of the list",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/br211847.aspx",
            title: "Scroll Position"
        },

        ensureVisibleFirst: {
            id: 33,
            description: "Ensure Visible is a ListView method that takes the index of an element in the ListView.  If necessary the ListView will scroll to the item.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/br211820.aspx",
            title: "Ensure Visible"
        },

        ensureVisibleMiddle: {
            id: 34,
            description: "Ensure Visible is a ListView method that takes the index of an element in the ListView.  If necessary the ListView will scroll to the item.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/br211820.aspx",
            title: "Ensure Visible"
        },

        ensureVisibleLast: {
            id: 35,
            description: "Ensure Visible is a ListView method that takes the index of an element in the ListView.  If necessary the ListView will scroll to the item.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/br211820.aspx",
            title: "Ensure Visible"
        },

        itemsDraggableYes: {
            id: 36,
            description: "Gets or sets a value that specifies whether items can be dragged. When this is set to true, the ListView provides built in behaviors related to item dragging.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/dn423315.aspx",
            title: "Items Draggable: True"
        },

       itemsDraggableNo: {
            id: 37,
            description: "Gets or sets a value that specifies whether items can be dragged. When this is set to true, the ListView provides built in behaviors related to item dragging.",
            link: "http://msdn.microsoft.com/en-us/library/windows/apps/dn423315.aspx",
            title: "Items Draggable: False"
        },

        dataSourceAssign: {
            id: 40,
            description: "Assign data to a list by wrapping it in a WinJS.Binding.List and then assigning that to the itemDataSource property of the ListView.",
            link: "http://try.buildwinjs.com/#listview:edits",
            title: "Datasource"
        }

    };

    function updateInfo(info) {
        var infoSection = document.querySelector(".interactiveInfoSection");
       
        // Don't update docs if they don't change
        if (infoSection.documentationId === info.id) {
            return;
        }

        WinJS.UI.Animation.exitContent(infoSection, null).done(function(){
            updateInfoImmediate(info);
            WinJS.UI.Animation.enterContent(infoSection, null);
        });
    }

    function updateInfoImmediate(info) {
        pulseToggle();
        var infoSection = document.querySelector(".interactiveInfoSection");
        var title = infoSection.querySelector(".selectionTitle");
        var description = infoSection.querySelector(".selectionDescription");
        var link = infoSection.querySelector(".selectionDocumentation");
        infoSection.documentationId = info.id;
        updateElement(description, info.description);
        updateElement(title, info.title);

        updateCode(info.code);

        if (info.link) {
            updateElement(link, " <a class=\"win-link selectionDocumentation\" href=\"" + info.link + "\" target=\"_blank\">Learn More</a> ");
        } else {
            updateElement(link, null);
        }
    }

    function pulseToggle() {
        if (ExpandingFlipper.flipper && !ExpandingFlipper.flipper.inListViewMode()) {
            return;
        }
        var toggle = document.querySelector(".listViewDocumentationToggle");
        WinJS.UI.executeAnimation(
           toggle,
           {
               property: "background-color",
               delay: 0,
               duration: 100,
               timing: "linear",
               from: "#000000",
               to: "#533663"
           }
       ).then(function () {
           WinJS.UI.executeAnimation(
               toggle,
               {
                   property: "background-color",
                   delay: 0,
                   duration: 400,
                   timing: "linear",
                   from: "#533663",
                   to: "#000000"
               }
       )
       });
    }

    function updateElement(element, info) {
        if (info) {
            element.style.display = "block";
            element.innerHTML = info;
        } else {
            element.style.display = "none";
            element.textContent = "";
        }
    }

    function updateCode(code) {
        var codeContainer = document.querySelector(".selectionSampleCodePre");
        var codeElem = codeContainer.querySelector(".selectionSampleCode");
        if (code) {
            codeContainer.style.display = "block";
            codeElem.style.display = "block";
            codeElem.innerHTML = hljs.highlightAuto(code).value;
        } else {
            codeContainer.style.display = "none";
            codeElem.style.display = "none";
            codeElem.textContent = "";
        }
    }

    readFile();

    WinJS.Namespace.define("Documentation", {
        updateInfo: updateInfo,
        updateInfoImmediate: updateInfoImmediate,
        welcome: welcome,
        horizontalOrientation: library.horizontalOrientation,
        verticalOrientation: library.verticalOrientation,
        gridLayout: library.gridLayout,
        listLayout: library.listLayout,
        itemTemplateTextWithImage: library.itemTemplateTextWithImage,
        itemTemplateImage: library.itemTemplateImage,
        itemTemplateInline: library.itemTemplateInline,
        itemTemplateInteractive: library.itemTemplateInteractive,
        itemsReorderable: library.itemsReorderable,
        itemsNotReorderable: library.itemsNotReorderable,
        tapBehaviorNone: library.tapBehaviorNone,
        tapBehaviorDirectSelect: library.tapBehaviorDirectSelect,
        tapBehaviorToggleSelect: library.tapBehaviorToggleSelect,
        tapBehaviorInvoke: library.tapBehaviorInvoke,
        selectionModeNone: library.selectionModeNone,
        selectionModeSingle: library.selectionModeSingle,
        selectionModeMulti: library.selectionModeMulti,
        groupItemsYes: library.groupItemsYes,
        groupItemsNo: library.groupItemsNo,
        groupHeaderTemplateText: library.groupHeaderTemplateText,
        groupHeaderTemplateTextWithImage: library.groupHeaderTemplateTextWithImage,
        groupHeaderTemplateButton: library.groupHeaderTemplateButton,
        groupHeaderTemplateInteractive: library.groupHeaderTemplateInteractive,
        groupHeaderPositionTop: library.groupHeaderPositionTop,
        groupHeaderPositionLeft: library.groupHeaderPositionLeft,
        groupHeaderTapBehaviorNone: library.groupHeaderTapBehaviorNone,
        groupHeaderTapBehaviorInvoke: library.groupHeaderTapBehaviorInvoke,
        dataChangesAdd: library.dataChangesAdd,
        dataChangesDelete: library.dataChangesDelete,
        dataChangesChange: library.dataChangesChange,
        scrollPositionZero: library.scrollPositionZero,
        scrollPositionFiveHundred: library.scrollPositionFiveHundred,
        ensureVisibleFirst: library.ensureVisibleFirst,
        ensureVisibleMiddle: library.ensureVisibleMiddle,
        ensureVisibleLast: library.ensureVisibleLast,
        itemsDraggableYes: library.itemsDraggableYes,
        itemsDraggableNo: library.itemsDraggableNo,
        dataSourceAssign: library.dataSourceAssign

    });

})();