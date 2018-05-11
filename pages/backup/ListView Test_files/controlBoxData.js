(function () {
    "use strict";
   
    var configs = [
        {
            name: "Layout", subOptions: [
                {
                    name: "List",
                    className: "layoutList",
                    eventMethod: function () { Layout.setLayout(new WinJS.UI.ListLayout()) },
                    info: Documentation.listLayout
                },
                {
                    name: "Grid",
                    className: "layoutGrid",
                    eventMethod: function () { Layout.setLayout(new WinJS.UI.GridLayout()) },
                    info: Documentation.gridLayout
                }
            ]
        },
        {
            name: "Orientation", subOptions: [
                {
                    name: "Vertical",
                    className: "orientationVertical",
                    eventMethod: function () { Layout.setOrientation(WinJS.UI.Orientation.vertical) },
                    info: Documentation.verticalOrientation
                },
                {
                    name: "Horizontal",
                    className: "orientationHorizontal",
                    eventMethod: function () { Layout.setOrientation(WinJS.UI.Orientation.horizontal) },
                    info: Documentation.horizontalOrientation
                }
            ]
        },
        {
            name: "Items Reorderable", subOptions: [
                {
                    name: "False",
                    className: "itemsReorderableOff",
                    eventMethod: function () { Config.itemsReorderable(false) },
                    info: Documentation.itemsNotReorderable
                },
                {
                    name: "True",
                    className: "itemsReorderableOn",
                    eventMethod: function () { Config.itemsReorderable(true) },
                    info: Documentation.itemsReorderable
                }
            ]
        },
        {
            name: "Items Draggable", subOptions: [
                {
                    name: "False",
                    className: "itemsDraggableYes",
                    eventMethod: function () { Config.itemsDraggable(false) },
                    info: Documentation.itemsDraggableNo
                },
                {
                    name: "True",
                    className: "itemsDraggableNo",
                    eventMethod: function () { Config.itemsDraggable(true) },
                    info: Documentation.itemsDraggableYes
                }

            ]
        },
        {
            name: "Tap Behavior", subOptions: [
                {
                    name: "Invoke Only",
                    className: "tapBehaviorInvokeOnly",
                    eventMethod: function () { Config.tapBehavior(WinJS.UI.TapBehavior.invokeOnly) },
                    info: Documentation.tapBehaviorInvoke
                },
                {
                    name: "Direct Select",
                    className: "tapBehaviorDirectSelect",
                    eventMethod: function () { Config.tapBehavior(WinJS.UI.TapBehavior.directSelect) },
                    info: Documentation.tapBehaviorDirectSelect
                },
                {
                    name: "Toggle Select",
                    className: "tapBehaviorToggleSelect",
                    eventMethod: function () { Config.tapBehavior(WinJS.UI.TapBehavior.toggleSelect) },
                    info: Documentation.tapBehaviorToggleSelect
                },
                {
                    name: "None",
                    className: "tapBehaviorNone",
                    eventMethod: function () { Config.tapBehavior(WinJS.UI.TapBehavior.none) },
                    info: Documentation.tapBehaviorNone
                }
            ]
        },
        {
            name: "Selection Mode", subOptions: [
                {
                    name: "Multi",
                    className: "selectionModeMulti",
                    eventMethod: function () { Config.selectionMode(WinJS.UI.SelectionMode.multi) },
                    info: Documentation.selectionModeMulti
                },
                {
                    name: "Single",
                    className: "selectionModeSingle",
                    eventMethod: function () { Config.selectionMode(WinJS.UI.SelectionMode.single) },
                    info: Documentation.selectionModeSingle
                },
                {
                    name: "None",
                    className: "selectionModeNone",
                    eventMethod: function () { Config.selectionMode(WinJS.UI.SelectionMode.none) },
                    info: Documentation.selectionModeNone
                }
            ]
        },
         {
             name: "Item Template", subOptions: [
                 {
                     name: "Text With Image",
                     className: "itemTemplateTextWithImage",
                     eventMethod: function () { Config.changeItemTemplate("textWithImage") },
                     info: Documentation.itemTemplateTextWithImage
                 },
                 {
                     name: "Image",
                     className: "itemTemplateImage",
                     eventMethod: function () { Config.changeItemTemplate("image") },
                     info: Documentation.itemTemplateImage
                 },
                 {
                     name: "Inline",
                     className: "itemTemplateInline",
                     eventMethod: function () { Config.changeItemTemplate("inline") },
                     info: Documentation.itemTemplateInline
                 },
                 {
                     name: "Interactive",
                     className: "itemTemplateInteractive",
                     eventMethod: function () { Config.changeItemTemplate("interactive") },
                     info: Documentation.itemTemplateInteractive
                 }
             ]
         },
        {
            name: "Group Items", subOptions: [
                {
                    name: "False",
                    className: "groupItemsNo",
                    eventMethod: function () { Layout.groupItems(false) },
                    info: Documentation.groupItemsNo
                },
                {
                    name: "True",
                    className: "groupItemsYes",
                    eventMethod: function () { Layout.groupItems(true) },
                    info: Documentation.groupItemsYes
                }
            ]
        },
        {
            name: "Group Header Template", subOptions: [
                {
                    name: "Text",
                    className: "groupHeaderTemplateText",
                    eventMethod: function () { Config.changeHeaderTemplate("text") },
                    info: Documentation.groupHeaderTemplateText,
                    notify: Notifications.groupHeaderTemplateWarning
                },
                {
                    name: "Text With Image",
                    className: "groupHeaderTemplateTextWithImage",
                    eventMethod: function () { Config.changeHeaderTemplate("textWithImage") },
                    info: Documentation.groupHeaderTemplateTextWithImage,
                    notify: Notifications.groupHeaderTemplateWarning
                },
                {
                    name: "Button",
                    className: "groupHeaderTemplateButton",
                    eventMethod: function () { Config.changeHeaderTemplate("button") },
                    info: Documentation.groupHeaderTemplateButton,
                    notify: Notifications.groupHeaderTemplateWarning
                },
                {
                    name: "Interactive",
                    className: "groupHeaderTemplateInteractive",
                    eventMethod: function () { Config.changeHeaderTemplate("interactive") },
                    info: Documentation.groupHeaderTemplateInteractive,
                    notify: Notifications.groupHeaderTemplateWarning
                }
            ]
        },
        {
            name: "Group Header Position", subOptions: [
                {
                    name: "Top",
                    className: "groupHeaderPositionTop",
                    eventMethod: function () { Layout.selectHeaderPosition(WinJS.UI.HeaderPosition.top) },
                    info: Documentation.groupHeaderPositionTop,
                    notify: Notifications.groupHeaderPositionWarning
                },
                {
                    name: "Left",
                    className: "groupHeaderPositionLeft",
                    eventMethod: function () { Layout.selectHeaderPosition(WinJS.UI.HeaderPosition.left) },
                    info: Documentation.groupHeaderPositionLeft,
                    notify: Notifications.groupHeaderPositionWarning
                }
            ]
        },
        {
            name: "Group Header Tap Behavior", subOptions: [
                {
                    name: "Invoke",
                    className: "groupHeaderTapBehaviorInvoke",
                    eventMethod: function () { Config.selectHeaderTapBehavior(WinJS.UI.GroupHeaderTapBehavior.invoke) },
                    info: Documentation.groupHeaderTapBehaviorInvoke,
                    notify: Notifications.groupHeaderTapBehaviorWarning
                },
                {
                    name: "None",
                    className: "groupHeaderTapBehaviorNone",
                    eventMethod: function () { Config.selectHeaderTapBehavior(WinJS.UI.GroupHeaderTapBehavior.none) },
                    info: Documentation.groupHeaderTapBehaviorNone,
                    notify: Notifications.groupHeaderTapBehaviorWarning
                }
            ]
        },
        {
            name: "Data Source", subOptions: [
                {
                    name: "100 Items",
                    className: "dataSourceSmallList",
                    eventMethod: ListView.Data.assignSmallDataset,
                    info: Documentation.dataSourceAssign,
                    notify: Notifications.dataSourceSmall
                },
                {
                    name: "10000 Items",
                    className: "dataSourceLargeList",
                    eventMethod: ListView.Data.assignLargeDataset,
                    info: Documentation.dataSourceAssign,
                    notify: Notifications.dataSourceLarge
                }
            ]
        },
    ];

    var actions = [
        {
            name: "Data Change", subOptions: [
                {
                    name: "Add",
                    className: "dataChangesAddElement",
                    eventMethod: ListView.Data.addElement,
                    info: Documentation.dataChangesAdd,
                    notify: Notifications.elementAdded
                },
                {
                    name: "Delete",
                    className: "dataChangesDeleteElement",
                    eventMethod: ListView.Data.deleteElement,
                    info: Documentation.dataChangesDelete,
                    notify: Notifications.elementDeleted
                },
                {
                    name: "Change",
                    className: "dataChangesChangeElement",
                    eventMethod: ListView.Data.changeElement,
                    info: Documentation.dataChangesChange,
                    notify: Notifications.elementChanged
                }
            ]
        },
        {
            name: "Ensure Visible", subOptions: [
                {
                    name: "First Item",
                    className: "ensureVisibleFirst",
                    eventMethod: ListView.Methods.ensureFirstItemVisible,
                    info: Documentation.ensureVisibleFirst,
                    notify: Notifications.ensureVisibleFirst
                },
                {
                    name: "Middle Item",
                    className: "ensureVisibleMiddle",
                    eventMethod: ListView.Methods.ensureMiddleItemVisible,
                    info: Documentation.ensureVisibleMiddle,
                    notify: Notifications.ensureVisibleMiddle
                },
                {
                    name: "Last Item",
                    className: "ensureVisibleLast",
                    eventMethod: ListView.Methods.ensureLastItemVisible,
                    info: Documentation.ensureVisibleLast,
                    notify: Notifications.ensureVisibleLast
                }
            ]
        },
        {
            name: "Scroll Position", subOptions: [
                {
                    name: "Pixel 0",
                    className: "scrollPositionZero",
                    eventMethod: function () { ListView.Methods.scrollPosition(0)},
                    info: Documentation.scrollPositionZero,
                    notify: function () { Notifications.scrollPosition(0) }
                },
                {
                    name: "Pixel 500",
                    className: "scrollPositionFiveHundred",
                    eventMethod: function () { ListView.Methods.scrollPosition(500) },
                    info: Documentation.scrollPositionFiveHundred,
                    notify: function () { Notifications.scrollPosition(500)}
                }
            ]
        }
    ];


    WinJS.Namespace.define("ControlBox", {
        configs: configs,
        actions: actions
    });
})();