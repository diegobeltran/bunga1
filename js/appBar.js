
WinJS.Namespace.define("Sample", {
    outputCommand: WinJS.UI.eventHandler(function (ev) {
        var status = document.querySelector(".status");
        var command = ev.currentTarget;
        if (command.winControl) {
            var label = command.winControl.label || command.winControl.icon || "button";
            var section = command.winControl.section || "";
            var msg = section + " command " + label + " was pressed";
			var selec=command.winControl.selected;
			
			//alert(selec);
            //status.textContent = msg;
			//alert(label);
			switch(label)
			{
			    
               case'add' :
               
			   addWid();
               break;			   
				
				
			   case'remove' :

			   removeWid();
               break;	
			   
			   case'edit' :
			   editmode();
               break;
               case'preview' :
			   if(selec){
			   previewmode();
			   }
			   else{
				desingmode();
			   }
               break;				   
			   
			   case'fullScreen' :
			   showFullScreen();
               break;	
			   
			   case'settings' :
			   alert('settings');
			   showSettings();
			   //var splitView = document.querySelector("#splitview_button").winControl;
			   //splitView.oninvoked();
			   //showDialog();
               //showConfirmFlyout();
			   return false;
			   break;			   	
				
				
			}
			
        }
    })
});

WinJS.UI.processAll();


  