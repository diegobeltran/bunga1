//// Copyright (c) Microsoft Corporation. All rights reserved

// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("home.html", {
        processed: function (element, options) {
           
            this._hub = element.querySelector(".win-hub").winControl;
            this._listview = element.querySelector(".ZoomedOutListView").winControl;
            this._onHeaderInvokedBound = this.onHeaderInvoked.bind(this);
            this._onResizeBound = this.onResize.bind(this);
            window.addEventListener("headerinvoked", this._onHeaderInvokedBound);
            
            window.addEventListener("resize", this._onResizeBound);
            updateHubLayout(this._hub, this._listview);
        },

        // This function is called whenever a user navigates to this page. 
        ready: function (element, options) {

            // Reset the scroll position from the history state.
            var oldScrollPosition = WinJS.Navigation.state && WinJS.Navigation.state.oldScrollPosition;
            if (oldScrollPosition) {
                this._hub.scrollPosition = oldScrollPosition;
            }
     },

        //navigate to deeper levels by invoking interactive headers
        onHeaderInvoked: function (ev) {
            var index = ev.detail.index;
            var section = ev.detail.section;
            var hub = this._hub;

            // Store the scroll position so it can be retrieved if user comes "back" to this page.
            WinJS.Navigation.state = WinJS.Navigation.state || {};
            WinJS.Navigation.state.oldScrollPosition = hub.scrollPosition;

            //check that the correct section is invoked
             if (index === 1) {
               //alert('a');
               location.href= "section.htm";
            }
            
            if (index === 2) {
               alert('a');
                WinJS.Navigation.navigate("bottom.htm");
            }

            if (index === 3) {
              
              WinJS.Navigation.navigate("/video.html");
               try{
                 
                 //WinJS.Navigation.navigate("/video.html").done( function(){
                 //    alert('hhhh');
                     
                 //} 
                 //);  
                //WinJS.Navigation.navigate("/video.html");
                 alert('b');
                }
                catch(e){
                    alert(e.message);
                }
            }
        },

        //go into vertical state when width is less than 500px
        //a developer can choose to go into vertical state when height of the app is greater than the width of the app
        onResize: function () {
           
            if (document.body.contains(this._hub.element)) {
                updateHubLayout(this._hub, this._listview);
                return this._hub.orientation;
            } else {
                return;
            }
        },

        unload: function () {
            // Respond to navigations away from this page.
            window.removeEventListener("headerinvoked", this._onHeaderInvokedBound);
            window.removeEventListener("resize", this._onResizeBound);
        }
    });

    function updateHubLayout(hub, listview) {
     
        if (document.body.clientWidth < 500) {
            if (hub.orientation !== WinJS.UI.Orientation.vertical) {
                hub.orientation = WinJS.UI.Orientation.vertical;
                listview.layout = new WinJS.UI.ListLayout();
            }
        }
        else {
            if (hub.orientation !== WinJS.UI.Orientation.horizontal) {
                hub.orientation = WinJS.UI.Orientation.horizontal;
                listview.layout = new WinJS.UI.GridLayout();
            }
        }
    }
    
    
    var myData = [
    { header: "create toon",  picture: "fa fa-th", color:"tile orange w2 h1 icon-featurecw titlex-fadeout isotope-item" },
     { header: "content manager",  picture: "fa fa-picture-o" , color:"tile blue w2 h1 icon-featurecw titlex-fadeout isotope-item"},
       { header: "search",  picture: "fa fa-search" , color:"tile green w2 h1 icon-featurecw titlex-fadeout isotope-item"},
      { header: "about",  picture: "fa fa-picture-o", color:"tile purple w2 h1 icon-featurecw titlex-fadeout isotope-item" },
       { header: "help",  picture: "fa fa-picture-o", color:"tile blue w2 h1 icon-featurecw titlex-fadeout isotope-item" },
       { header: "contact",  picture: "fa fa-envelope", color:"tile yellow w2 h1 icon-featurecw titlex-fadeout isotope-item" },
    ];

    // Create a WinJS.Binding.List from the array. 
    var itemsList = new WinJS.Binding.List(myData);
    
    function showConfirmFlyout() {
    
    var sz= document.getElementById("semanticZoomDiv").winControl;
    
          sz.zoomedOut=true;
    }
    //Navigation
    ////////////////////////////
    var quees;
    function navigate_mytoons(){
    
    //quees=e;
    //alert(e);
    //CreateReaderControl('section.htm','?Function=section','modal_dialog');
       //storage.set('_sectionnumber',index);
        //semanticZoomDiv  
    }
  
    function itemInvoked(eventInfo) {
        var index = eventInfo.detail.itemIndex;
        
		//alert(index);
        
         //CreateReaderControl('Templates.htm','?Function=section','section1');
        store.set('_sectionnumber',index);
        
    }
    ////////////
    
     WinJS.Namespace.define("myData",
           {
            
            groupedItemsList: itemsList
            
            }); 
            
            WinJS.UI.processAll().then(function () {
                
                document.getElementById("section1minus").addEventListener("click", showConfirmFlyout, false);
                document.getElementById("navbar1").addEventListener("click", navigate_mytoons, false);
                document.getElementById("navbar2").addEventListener("click", navigate_mytoons, false);
                document.getElementById("navbar3").addEventListener("click", showConfirmFlyout, false);
                document.getElementById("navbar4").addEventListener("click", showConfirmFlyout, false);
                var listView = document.querySelector(".ZoomedOutListView").winControl;
                listView.addEventListener("iteminvoked", itemInvoked, false);
                listView.addEventListener("groupheaderinvoked", itemInvoked, false);
                
                
                });
            })();

