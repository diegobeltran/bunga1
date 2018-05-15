
    var listviewselectedindex;
          //document.domain = "mydomain.com";
       function seletecteditemlist(noti) {
       
        try{
        var listView = document.querySelector(".listView").winControl;
	    var list = listView.itemDataSource.list;
		if(noti !=undefined){
        listviewselectedindex = noti;
    }

		if(listviewselectedindex!=undefined)
        {
		 var item = list.getAt(noti);
		 //alert(item.ID);
         store.set('_currentTemplate',_user.toString() + '-' + item.ID) ;

         window.parent.loadsection(noti);
        }
        }
        catch(e){

        alert('error temp' + e.message);
            
    }

    }

      

   function inite(myData_temp) {
        "use strict";     
    // Create a WinJS.Binding.List from the array. 
   

    try{
    var itemsList = new WinJS.Binding.List(myData_temp);
    }
    catch(e){

        alert(e.message);
        
    }
 // Sorts the groups.
    function compareGroups(leftKey, rightKey) {
        return leftKey.charCodeAt(0) - rightKey.charCodeAt(0);
    }

    // Returns the group key that an item belongs to.
    function getGroupKey(dataItem) {
        return dataItem.category.toLowerCase();//dataItem.title.toUpperCase().charAt(0);
    }

    // Returns the title for a group.
    function getGroupData(dataItem) {
        return {
        title:dataItem.category.toLowerCase() //dataItem.title.toUpperCase().charAt(0)
        };
    }

    // Create the groups for the ListView from the item data and the grouping functions
    var groupedItemsList = itemsList.createGrouped(getGroupKey, getGroupData, compareGroups);
    //Show the flyout
    function showConfirmFlyout() {
    
    var sz= document.getElementById("semanticZoomDiv").winControl;

	if(sz.zoomedOut==true){
        sz.zoomedOut = false;
    }
    else{
        sz.zoomedOut = true;
    }
    }

	function showSettings() {
    
    var x= document.getElementById("semanticZoomDiv");
	var y= document.getElementById("semanticform");

        if (x.style.display === "none") {
        x.style.display = "block";
    y.style.display = "none";


    } else {
        x.style.display = "none";
		
    CreateReaderControl('../forms/DynamicForm.html','','semanticform');

		y.style.display = "inline-block";
		y.style.height = document.height/2;
		y.style.height = document.height;

    }



    }


    WinJS.Namespace.define("myData",
        {
        groupedItemsList: groupedItemsList
        });

	 function itemDragStartHandler(event) {
        
		var indi=Notifications.getIndices(event);

         //alert(indi);

        Notifications.itemDragStart(event);


    // Pass indices of dragged items into event so they're available for later drag events
	    var indic=event.detail.dragInfo.getIndices().toString();

		var listView = document.querySelector(".listView").winControl;
	    var list = listView.itemDataSource.list;


		 var item = list.getAt(indic);
		 //alert(item.ID);
         //store.set('_currentTemplate',_user.toString() + '-' + item.ID) ;
		var jitem=JSON.stringify(item);

        //event.detail.dataTransfer.setData('text', '{"ID":' + item.ID + ',' + '"category":' + '"' + item.category + '"' + ',' + '"title"' + '"' + item.title + '"' + '}');
		event.detail.dataTransfer.setData("text", jitem);
        event.detail.dataTransfer.effectAllowed = "all";

        //Dragging.garbageCan.activate();
    }

    function itemDragEndHandler(event) {
        //alert(event);
        Notifications.itemDragEnd(event);
    //Dragging.garbageCan.deactivate();
    }



    WinJS.UI.processAll().then(function () {




        document.getElementById("section1minus").addEventListener("click", function () {

            var xd = document.getElementById("section1minus").winControl;
            var sz = document.getElementById("semanticZoomDiv").winControl;

            if (sz.zoomedOut == true) {

                xd.icon = 'zoomout';
            } else {
                xd.icon = 'zoomin';
            }

            showConfirmFlyout();


        }, false);
	
    document.getElementById("section1settings").addEventListener("click", function(){
	
	var x= document.getElementById("semanticZoomDiv");
	var y= document.getElementById("semanticform");

        if (x.style.display === "none") {
        x.style.display = "block";
    y.style.display = "none";

    } else {
        x.style.display = "none";
		
    CreateReaderControl('../forms/DynamicForm.html','','semanticform');

		y.style.display = "inline-block";
		y.style.height = document.height/2;
		y.style.height = document.height;

		}




	}, false);



	var listView = document.querySelector("#listViewx").winControl;
    listView.itemsDraggable = true;
    //document.getElementById("notificationBanner").addEventListener("change", selectlistview, false);

    //var listView = document.querySelector(".listView").winControl;
    listView.addEventListener("iteminvoked", function(eventInfo){
	
	      
	      var index = eventInfo.detail.itemIndex;
		  seletecteditemlist(index);

	}, false);



    listView.addEventListener("groupheaderinvoked", Notifications.groupHeaderInvoked, false);

	listView.addEventListener("itemdragstart", itemDragStartHandler, false);

    listView.addEventListener("itemdragend", itemDragEndHandler, false);


    });



 // WinJS.UI.processAll();

  }; // End of data.js

   AddSource();
