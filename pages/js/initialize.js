(function () {
    "use strict";

    function initializeListView() {
        var listView = document.querySelector(".listView").winControl;
        addListViewEventListeners(listView);
			listView.tapBehavior = WinJS.UI.TapBehavior.directSelect;
			listView.selectionMode = WinJS.UI.SelectionMode.single;
			 listView.itemsReorderable = true;
        listView.itemsDraggable = true;
        WinJS.Namespace.define("ListView", {
            listView: listView
        });

        window.addEventListener("resize", function () {
            ListView.listView.recalculateItemPosition();
        }, false);
    }

    function addListViewEventListeners(listView) {
        listView.itemTemplate = WinJS.UI.simpleItemRenderer(Templates.textWithImageTemplate);
        listView.groupHeaderTemplate = WinJS.UI.simpleItemRenderer(Templates.textHeaderTemplate);
		
        listView.addEventListener("iteminvoked", Notifications.itemInvoked, false);
        listView.addEventListener("groupheaderinvoked", Notifications.groupHeaderInvoked, false);
        listView.addEventListener("itemdragstart", itemDragStartHandler, false);
        listView.addEventListener("itemdragenter", Notifications.itemDragEnter, false);
        listView.addEventListener("itemdragend", itemDragEndHandler, false);
        listView.addEventListener("itemdragbetween", Notifications.itemDragBetween, false);
        listView.addEventListener("itemdragleave", Notifications.itemDragLeave, false);
        listView.addEventListener("itemdragechanged", Notifications.itemDragChanged, false);
        listView.addEventListener("itemdragdrop", Notifications.itemDragDrop, false);
        listView.addEventListener("keyboardnavigating", Notifications.keyboardNavigating, false);
        listView.addEventListener("loadingstatechanged", Notifications.loadingStateChanged, false);
        listView.addEventListener("selectionchanging", Notifications.selectionChanging, false);
        listView.addEventListener("selectionchanged", Notifications.selectionChanged, false);
         
       // document.body.addEventListener('touchmove', function(event) {
       // event.preventDefault();
       // }, false); 
       
       // listView.addEventListener("touchstart", Notifications.itemInvoked, false);
        //listView.addEventListener("touchmove", touchStartHandler, false);
       // listView.addEventListener("touchend", Notifications.itemInvoked, false);
        //initTouch();
        
        
         }

    function initializeDocumentation() {
        Documentation.updateInfoImmediate(Documentation.welcome);
    }
    function initTouch()
{
   document.addEventListener("touchstart", touchHandler, true);
   document.addEventListener("touchmove", touchHandler, true);
   document.addEventListener("touchend", touchHandler, true);
   document.addEventListener("touchcancel", touchHandler, true);    
}

    
    function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);

    event.preventDefault();
}

    
    
    
    
     function touchStartHandler(evt) {
         
      // evt.preventDefault();
      var target = event.target;
      alert('ss2');
     if (event.targetTouches.length == 1) 
     {
         
         
    var touch = event.changedTouches[0];
   
            simulatedClick(target.parentNode);
            alert('ss');
     }
     
       //var touches = evt.changedTouches;
       
      //var touchestar=  evt.targetTouches;
      
       //for (var i=0; i< touchestar.length; i++) {
           
        //  alert(touchestar[i].name);
           
       //}
       return;
       for (var i=0; i<touches.length; i++) {
           
           // alert('x: ' +touches[i].pageX + ' y:' + touches[i].pageY); 
            
            
            
        alert(event.type);
        var xxc=touches[i].pageX ;
        var yyc=touches[i].pageY ;
         
         // translate the element
         target.style.webkitTransform =
         target.style.transform =
         'translate(' + 100 + 'px, ' + 500+ 'px)';

            //alert('');
            
            
    // update the posiion attributes
    //target.setAttribute('data-x', xxc);
    //target.setAttribute('data-y', yyc);
              
       }
      
    }
    
    

    function itemDragStartHandler(event) {
        
         //alert('ide');
        
        Notifications.itemDragStart(event);

        // Pass indices of dragged items into event so they're available for later drag events
        //event.detail.dataTransfer.setData("text", event.detail.dragInfo.getIndices().toString());
        //event.detail.dataTransfer.effectAllowed = "all";

        Dragging.garbageCan.activate();
    }

    function itemDragEndHandler(event) {
        Notifications.itemDragEnd(event);
        Dragging.garbageCan.deactivate();
    }

    function addClipboardEvents() {
        var clipboard = document.querySelector(".copyToClipboardButton");

        // In Chrome / Safari you can't copy content to the keyboard.  Detecting the browser in lieu of a
        // good way to perform feature detection
        var userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Chrome") !== -1 || userAgent.indexOf("Safari") !== -1 ) {
            clipboard.style.display = "none";
            return;
        }
        
        clipboard.style.opacity = 0;
        clipboard.addEventListener("click", function () {
            copyCodeToClipboard();
            this.style.backgroundColor = "#3A8F3A";
        }, false);
        var codeContainer = document.querySelector(".selectionSampleCodePre");
        codeContainer.addEventListener("mouseenter", function () {
            WinJS.UI.Animation.fadeIn(clipboard);
        }, false);
        codeContainer.addEventListener("mouseleave", function () {
            WinJS.UI.Animation.fadeOut(clipboard).done(function () {
                clipboard.style.backgroundColor = "#000000";
            });
        }, false);
    }

    function copyCodeToClipboard() {
        var codeElem = document.querySelector(".selectionSampleCode");
         if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(codeElem);
            window.getSelection().addRange(range);
            document.execCommand("Copy");
            window.getSelection().removeAllRanges();
        }
    }

    WinJS.Namespace.define("Init", {
        initializeListView: initializeListView,
        initializeDocumentation: initializeDocumentation,
        addClipboardEvents: addClipboardEvents
    });
    	

})();