
   
    var sectioncreate=0;
    function CreateReaderControlSection(_sectionform)
    {              
        CreateReaderControl('../forms/DynamicForm.html',_sectionform + '&_target=Section','1a');
        sectioncreate=1;        
    }
    function CreateReaderControlCreateWidget()
    {   
        CreateReaderControl('../forms/DynamicForm.html',createwidgetform + '&_target=createWidget','1a');
        
    }
    
    function CreateReaderControlWidget2(createwidgetform)
    {   
        if(selectitemxs!=undefined)
        {
         var settingstittle = document.getElementById("settingstittle");
         var valuezx=settingstittle.textContent;
         valuezx=valuezx.replace('Widget ','');
         CreateReaderControl('../forms1/DynamicForm.html',createwidgetform+ '&_target=Widget_' + valuezx,'1a');
        }
        else
        {
        
        alert("Nos Widget Selected");
         }
   }
   
    function CreateReaderControlWidget(_createwidgetform)
    {   
        
        //var currentwidgettmp=store.get('_currentWidget');
        //alert(createwidgetform);
        //CreateReaderControl('../forms/DynamicForm.html',_createwidgetform 
        //+ '&_target=Widget_' + currentwidgettmp,'1a');
		
		var currentwidgettmp=store.get('_currentWidget');
        //alert(createwidgetform);
        CreateReaderControl('../forms/DynamicForm.html',_createwidgetform 
        + '&_target=Widget_' ,'1a');
		
        
   }
   
   function CreateReaderControlDocument(_createwidgetform)
    {   
        
        //var currentwidgettmp=store.get('_currentWidget');
        //alert(createwidgetform);
        //CreateReaderControl('../forms/DynamicForm.html',_createwidgetform 
        //+ '&_target=Widget_' + currentwidgettmp,'1a');
		
		var currentwidgettmp=store.get('_currentDocument');
        //alert(createwidgetform);
        CreateReaderControl('../forms/DynamicDocument.html',_createwidgetform 
        + '&_target=document' ,'documentconfig');
		
        
   }
   
  
   
   
  