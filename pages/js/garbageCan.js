(function () {
    "use strict";

    //Controls logic for dragging an item into a garbage can.  ListView must have 
    //itemsReorderable set to true or itemsDraggable set to true
    var GarbageCan = WinJS.Class.define(
        function GarbageCan() 
        {
            
            //document.querySelector(".garbageCan").forEach()
            //{
             //   alert('select');
              //return;  
            //};
            
            var x = document.querySelectorAll(".garbageCan");
            var i;
            for (i = 0; i < x.length; i++) 
            {
            var elem=x[i];
            //alert('selc');
            
            elem.hidden = false;
            elem.style.opacity = 1;
            elem.control = this;

            elem.addEventListener("dragstart", function (event) {
                event.preventDefault();
            }, false);

            elem.addEventListener("dragover", function (event) {
                event.preventDefault();
            }, false);

            elem.addEventListener("dragenter", function (event) {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
            }, false);

            elem.addEventListener("drop", function (event) {
                event.preventDefault();
                alert(event.dataTransfer.getData("text") + '  ' + this.id);
                var indices = event.dataTransfer.getData("text").split(",");
                this.control.drop(indices);
                this.control.deactivate();
            }, false);

            this.activate = function () {
                WinJS.UI.Animation.enterContent(elem, null);
            };

            this.deactivate = function () {
                WinJS.UI.Animation.exitContent(elem, null);
            };

            this.drop = function (indices) {
                //Nota alert('drop');
                for (var i = indices.length - 1; i >= 0; i--) {
                    var data = ListView.listView.itemDataSource.list;
                    var item = data.splice(indices[i], 1)[0];
                }
            }
          }
        }
        
    );

    
    var garbageCan = null;

    var initGarbageCan = function () {
        Dragging.garbageCan = Dragging.garbageCan || new GarbageCan();
    }

    WinJS.Namespace.define("Dragging", {
        garbageCan: garbageCan,
        initGarbageCan: initGarbageCan
    })
})();