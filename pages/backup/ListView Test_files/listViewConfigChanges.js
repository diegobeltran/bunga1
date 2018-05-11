(function () {
    "use strict";
   
   function itemsReorderable(reorderable) {
       ListView.listView.itemsReorderable = reorderable;
   }

   function tapBehavior(behavior) {
       ListView.listView.tapBehavior = behavior;
   }

   function selectHeaderTapBehavior(behavior) {
       ListView.listView.groupHeaderTapBehavior = behavior;
   }

   function selectionMode(mode) {
       ListView.listView.selectionMode = mode;
   }

   function changeItemTemplate(templateName) {
       
        switch (templateName) {
            case "textWithImage":
                ListView.listView.itemTemplate = WinJS.UI.simpleItemRenderer(Templates.textWithImageTemplate);
                break;
            case "image":
                ListView.listView.itemTemplate = WinJS.UI.simpleItemRenderer(Templates.imageTemplate);
                break;
            case "inline":
                ListView.listView.itemTemplate = document.querySelector(".listIconTextTemplate");
                break;
            case "interactive":
                ListView.listView.itemTemplate = WinJS.UI.simpleItemRenderer(Templates.interactiveTemplate);
                break;
        }
        ListView.listView.forceLayout();

   }

   function changeHeaderTemplate(templateType) {

        switch (templateType) {
            case "text":
                ListView.listView.groupHeaderTemplate = WinJS.UI.simpleItemRenderer(Templates.textHeaderTemplate);
                break;
            case "textWithImage":
                ListView.listView.groupHeaderTemplate =  WinJS.UI.simpleItemRenderer(Templates.textWithImageHeaderTemplate);
                break;
            case "button":
                ListView.listView.groupHeaderTemplate =  WinJS.UI.simpleItemRenderer(Templates.buttonHeaderTemplate);
                break;
            case "interactive":
                ListView.listView.groupHeaderTemplate =  WinJS.UI.simpleItemRenderer(Templates.interactiveHeaderTemplate);
        }

   }

   function itemsDraggable(draggable) {
       ListView.listView.itemsDraggable = draggable;
   }

    WinJS.Namespace.define("Config", {

        itemsReorderable: itemsReorderable,
        tapBehavior: tapBehavior,
        selectionMode: selectionMode,
        changeItemTemplate: changeItemTemplate,
        changeHeaderTemplate: changeHeaderTemplate,
        selectHeaderTapBehavior: selectHeaderTapBehavior,
        itemsDraggable: itemsDraggable
    });
})();