 var gridster;
 var contador=1;  
 var onlywidget=false;    
 var currentTemplate; 
 var _previewmode  =false;
 var _editmode  =false;
 var _paramshow;
  var timerId;  
   var sounds;
    var sectioncreate=0;             
 // same object than generated with gridster.serialize() method
      var serialization = [
       
        {
            col: 3,
            row: 1,
            size_x: 1,
            size_y: 2
        },
        {
            col: 1,
            row: 1,
            size_x: 1,
            size_y: 2
        },
        {
            col: 2,
            row: 1,
            size_x: 1,
            size_y: 1
        }
      ];


          // sort serialization
          serialization = Gridster.sort_by_row_and_col_asc(serialization);
     
     
       
   var endFunction=0;
   function loadAllFiles()
   {
     endFunction=0;
     var sectionname=  store.get('_currentTemplate');
               
     var widgetfile='config/files/'+ sectionname + '.js';
    
	 //alert(sectionname);
    try{                  
     dynamicInsert(widgetfile);
     
    }
     catch(e){
         alert(e.message);
     }
   
   
}
   
  
  function  loadFiles(data)
  {
    
    sounds=data;
    //aplicacion de audio
    var myApp = new myNameSpace.MyApp();
    
    loadConfigSectionData();
    
    endFunction=1; 
 }
     
     
         function setonlywidget()
         {
             
             var _param=(window.location.href.match(/[?&]_target=([^&]+)/)||[])[1] || 'undefined';
          
             _paramshow=(window.location.href.match(/[?&]_fs=([^&]+)/)||[])[1] || 'undefined';
             
             var  _preview=(window.location.href.match(/[?&]_preview=([^&]+)/)||[])[1] || 'undefined';
            
             if(_preview=='true'){
               
                 _previewmode=true;
             }
             else{
                  _previewmode=false;
             }
             if(_param=="widget")
             {
               onlywidget=true;
               
             }
             //cambia el color de fondo si es pantalla completa
             
                      
        }
        
        
     
          function creategrid() {
           var currentwidgettmp=store.get('_currentWidget');
           var currentsectiontmp=store.get('_currentSection');
           var currentTemplatetmp=store.get('_currentTemplate');
           
           
           if(currentTemplatetmp == undefined){
               return;
           }
           
           if(onlywidget==true)
           {   
          
           var arr = [];
           var cont=1;
           for (var prop in currentsectiontmp) {
               if(currentwidgettmp==cont){
                  
                   arr.push(currentsectiontmp[prop]);
                }
                cont=cont+1;
                }
               serialization=arr;
               contador=currentwidgettmp;
               $('#config').val(store.get('_currentWidgetConfig'));
           }
           
           else{
                //alert(onlywidget);
               
                //serialization=currentsectiontmp;
                $('#config').val(store.get('_currentSectionConfig'));
                
                if( currentTemplatetmp ==currentTemplate )
                {
                    return;
                }
                else
                {
                  var _cursectionini=   store.get('_currentSectionIni');
                  
                  if(_cursectionini != undefined && _cursectionini!=''){
                      
                     serialization = Gridster.sort_by_row_and_col_asc(_cursectionini);
                  } 
                   currentTemplate= currentTemplatetmp;
                    
                }
                contador=1;
                
               
           }
            gridster.remove_all_widgets();
            var dic='<div class="gridster-box"';
            //dic+='style="position:relative;z-index:1000;cursor: hand">';
			//dic+='<div frameborder="0" src="" width="100%" height="100%"></div>';
			dic+='</div>';
            $.each(serialization, function() 
            {
                gridster.add_widget('<li class="gridcss_li" onfocus="selectitemf(this);" tabindex="' 
                + contador +'" id="' + contador.toString()+ '' + '"   onclick="selectitem(this);">' 
                + '<div class="number_li">' + contador +'</div></>' + dic, this.size_x, this.size_y, this.col, this.row);
                contador=contador+1;
                
            });
            serialize();
            //carga toda la seccion
            if(onlywidget==false)
           { 
            
            //initsounds();
            try{
            
            loadAllFiles();
            //alert('169xxx');ggggggggggggggggggggggggggggggggggggggggggggg
            }
            catch(e){
                alert('gridsterdeploy 166');
            }   

           }
		   //var sdf=$('.gridcss_li');
		   //$.each(sdf, function(evt){
			   
			   //alert(evt);
		   //}); 
		     /////////////////////////// gridcss_li   
			//createjscssfile("/pages/config/documents/12345-19-19-1.css?v="+ramdonversion(), "css");
         }
         
 var triggermethod=0;
       
       function selectitem(e){
                
              //alert('1');  
           $(e).focus();
           
       }      
     
        function selectitemf(e){
          
		  //alert('selectitemf');
          if(!_previewmode)
          {
          $('.gridster').find('.gridster-box').removeClass('test');
           $(e).find('.gridster-box').addClass('test');
           serialize();
           selectitemxs=e;
		   var sit=$(selectitemxs).find('.number_li').text();
		   //alert('selectitemf ' + sit);  
           if(!onlywidget){
               store.set('_currentWidget', sit); 
           }
          }
          
           
       }

       function serialize() {
            var s = gridster.serialize();
            //JSON.stringify(s)
            $('#log').val(JSON.stringify(s));
            
            if(!onlywidget){
                store.set('_currentSection', s) ;
            }
            //store.set('_currentSection', s) ;
        }
        
        function addWid() {
             var dic='<div class="gridster-box"></div>';
             gridster.add_widget('<li class="gridcss_li" onfocus="selectitemf(this);" tabindex="' + contador 
             +'" id="' + contador +'"   onclick="selectitem(this);">' 
             + contador +'</>' + dic, 1, 1, 1, contador);
             
             contador=contador+1;
            
        }
    
       function removeWid()
       {
           gridster.remove_widget( selectitemxs );
           reCreate(); 
       }
       
        function reCreate()
       {
            var serxs= gridster.serialize();
           
            serialization = Gridster.sort_by_row_and_col_asc(serxs);
           
            contador=1;
            
            creategrid();
            
            serialize();
       }
       
function loadback(){
         return;
}
       
       
    function clockStart() {
    if (timerId) return;
     timerId = setInterval(creategrid, 1000)
    }

    function clockStop() {
    clearInterval(timerId);
    timerId = null;
    }
    
    function previewmode(){
        
        $('.gridster').find('.gridster-box').removeClass('test');
		$('.gridster').find('li').addClass('viewclass');
        //$('.gridster').find('#1').addClass('viewclass');
         gridster.disable();        
        _previewmode=true;
        
    }
    
    function desingmode(){
        
         $('.gridster').find('li').removeClass('viewclass'); 
         gridster.enable();
         _previewmode=false;
        
        
    }
    
	
	function editmode(){
			
		if(_editmode==false){
			gridster.disable(); 
			_editmode=true;
		}else{
			
			gridster.enable(); 
			_editmode=false;
			
		}
		 
		
	}
    