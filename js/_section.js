       var gridster;
       var maxcols=25;
       var dragGridEnabled = false;
       var _currentMode=0;
       var functionName;
       var _arrayModule = [];      
       var ratio=window.innerWidth/window.innerHeight;	   
      var _pagewidth=window.innerWidth-(window.innerWidth*0.1);      
	  var calheight=(_pagewidth/maxcols)+1;     
      var calwidht=calheight;     
      var _fullScreen = false;
	  resize1a(window.innerHeight);
	 
	 
	function resize1a(value){
	   
	   if(value > 600){
		   
		   $('#1a').css({
           'height': '500px'
    //... and so on
           });
		   
		   
	   }else{
		   
		   $('#1a').css({
           'height': '300px'
    //... and so on
           });
		   
		   
	   }   
	   
   }
	 
	 
      function showFullScreen(){
    
    
      try{
       window.external.notify("showmode");
       }
       catch(e)
       {
       }
    
       _fullScreen = true;
       var importantStuff = window.open('section.htm?_target=section&_fs=true&_preview='+ _previewmode, '_blank');    
        //para control webview 
    
       
         
       }
       
      $(function(){

        gridster = $(".gridster ul").gridster({
          widget_base_dimensions: [calwidht,calwidht],
          widget_margins: [0, 0],
          helper: 'clone',
          draggable: {
              start: function (e, ui, $widget) {
                  //log.innerHTML = 'START position: ' + ui.position.top + ' ' + ui.position.left + "<br >" + log.innerHTML;
                  //alert('start');

                  //var dragStartProxy = createjs.proxy(dragexecute, e, ui, $widget, "star");
                  // element.addEventListener("click", clickProxy);
                  dragexecute(e, ui, $widget, "star");

              },

              drag: function (e, ui, $widget) {
                  //log.innerHTML = 'DRAG offset: ' + ui.pointer.diff_top + ' ' + ui.pointer.diff_left + "<br >" + log.innerHTML;
                  //alert('drag');
                  //var dragProxy = createjs.proxy(dragexecute, e, ui, $widget, "drag");
                  dragexecute(e, ui, $widget, "drag");
              },

              stop: function (e, ui, $widget) {
                  //log.innerHTML = 'STOP position: ' + ui.position.top + ' ' + ui.position.left + "<br >" + log.innerHTML;
                  //alert('stop');
                  //var dragStopProxy = createjs.proxy(dragexecute, e, ui, $widget, "drag");
                  dragexecute(e, ui, $widget, "stop");
              }
          },
          shift_widgets_up: false,
            shift_larger_widgets_down: false,
            collision: {
                wait_for_mouseup: true
            },
                autogenerate_stylesheet: true,
                min_cols: 1,
                max_cols:maxcols,
         // max_cols:null,
          resize: {
            enabled: true
          }
        }).data('gridster');
          $('.gridster  ul').css({'padding': '0'});
         
        $('.js-resize-random').on('click', function() {
            gridster.resize_widget(gridster.$widgets.eq(getRandomInt(0, 9)),
            getRandomInt(1, 4), getRandomInt(1, 4))
        });

      });
     
    
   
        // Wire XYFocus up to the arrow keys
    WinJS.UI.XYFocus.keyCodeMap.up.push(WinJS.Utilities.Key.upArrow);
    WinJS.UI.XYFocus.keyCodeMap.down.push(WinJS.Utilities.Key.downArrow);
    WinJS.UI.XYFocus.keyCodeMap.left.push(WinJS.Utilities.Key.leftArrow);
    WinJS.UI.XYFocus.keyCodeMap.right.push(WinJS.Utilities.Key.rightArrow);

    //WinJS.UI.processAll();
    WinJS.UI.processAll().then(function () {
    
    //document.getElementById("dropdown4-tab").addEventListener("click", previewmode, false);
    //document.getElementById("dropdown3-tab").addEventListener("click", desingmode, false);
    //document.getElementById("dropdown2-tab").addEventListener("click", removeWid, false);
    //document.getElementById("dropdown1-tab").addEventListener("click", addWid, false);    
    //document.getElementById("show-tab").addEventListener("click", showFullScreen, false);
  
    
    //document.getElementById("section1settings").addEventListener("click", showConfirmFlyout, false);
    //document.getElementById("section2minus").addEventListener("click", showConfirmFlyout, false);
    
    
      
    });
    
    ////////////form
    setonlywidget();
     
    //clockStart();
    
    setTimeout(function(){ creategrid(); }, 800);
    
   
	var preload;
    var elements=[];
  
  ////////////////////////////////////////////////
  this.myNameSpace = this.myNameSpace || {};
        (function() 
        {
            function MyApp() {
                this.init();
            }
 
            MyApp.prototype = {
                displayMessage:null,
 
                init: function() {
                    //this.displayMessage = document.getElementById("status");
 
                    if (!createjs.Sound.initializeDefaultPlugins()) 
                    {
                      return;
                    }
 
                    //var audioPath = "assets/";
                    //var handle=handleLoadComplete;
                    initialized(handleLoadComplete);
                    var assetsPath = "../audio/";
		                
                    
                    //var sounds = [
			              //{src: "Tiger-roaring.mp3", id: 1},
			              //{src: "Evil_Laugh.mp3", id: 2},
			              //{src: "Monster_Gigante-Doberman.mp3", id: 3},

			              //{src: "I_Am_Dracula.mp3", id: 4},
			              //{src: "Humm.ogg", id: 5},
			              //{src: "R-Damage.ogg", id: 6},

			              //{src: "Thunder1.ogg", id: 7},
			              //{src: "S-Damage.ogg", id: 8},
			              //{src: "U-CabinBoy3.ogg", id: 9},

			              //{src: "ToneWobble.ogg", id: 10},
			              //{src: "Game-Death.ogg", id: 11},
			              //{src: "Game-Break.ogg", id: 12}  //OJR would prefer a new sound rather than a copy
		                //];
 
                    
                    createjs.Sound.alternateExtensions = ["mp3"];
                    var loadProxy = createjs.proxy(this.handleLoad, this);
                    createjs.Sound.addEventListener("fileload", loadProxy);
                    //createjs.Sound.registerManifest(manifest, audioPath);
                   
                    createjs.Sound.registerSounds(sounds, assetsPath);

                    loadListModules();

                    //createEvents();
                    dragenabled();

                  },
 
                handleLoad: function(event) {
                   // createjs.Sound.play(event.src);
                  
                   
                },
               stop: function () {
		           if (preload != null) {
			              preload.close();
		              }
		            createjs.Sound.stop();
	              }


            }
            myNameSpace.MyApp = MyApp;
         }
        
        ());




/////////////////////////////////fin del objeto


        function loadListModules() {

            var ii = 1;

            var longitud = $(".gridster ul").find('li').length;

            var man = [];

            var _currtemplate = store.get('_currentTemplate');
                   

            for (ii = 1; ii <= longitud; ii++) {

                //var element = document.getElementById(ii);
                var pt = "c" + _currtemplate + "-" + ii ;
                var _name=replaceAll("get_m_w_" + pt,"-","_");
                //alert(functionName);
                pt += ".js?v=" +ramdonversion();
                var item = {
                    src: pt,
                    id: _name
                };
                man[ii - 1] = item;
                //loadModules(_currtemplate, ii);               

                //dynamicInsert('config/widget/' + pt);
            }
            console.log("loadListModules");
            console.log(man);
            preload.loadManifest(man, true, "config/widget/");

        }


        function _msg() {

            this.data = arguments[0];

            //this.marca = arguments[1];

            //this.modelo = arguments[2];
        }

        //function loadModuleFiles(_currtemplate, widg, module){
        
        
        //    var pt = "" + _currtemplate + "-" + widg + "-" + module ;
            
        //    pt="get_module_" + pt;

        //    var _f=replaceAll(pt,"-","_");
        //    //alert("xx " + _f);
        //    //alert(_f);
        //    if(functionExists(_f)){
            
        //        alert('si');

        //        var p = ejecutar(_f, null);

        //        alert(p);
            
        //    }else{
            
            
            
            
        //    }  
        //}



        function createEvents2(mod,element) {

            //_exists &&
            //alert(mod.data + "events2");
            //for(i=0;i<amod.lenght;i++){

                //var mod = amod[i];

                if (mod != undefined && mod.WidgetNumber != undefined && (mod.WidgetNumber == ii || mod.WidgetNumber == "ALL"))
                      {
		              //click, mousedown, dblclick, pressmove, pressup, mouseover / mouseout, and rollover / rollout. 
                      var clickProxy = createjs.proxy(execute,this, element, mod,"click");
                      element.addEventListener("click", clickProxy);

                      var dblclickProxy = createjs.proxy(execute, this, element, mod,"dblclick");
                      element.addEventListener("dblclick", dblclickProxy);

                      var mousedownProxy = createjs.proxy(execute, this, element, mod, "mousedown");
                      element.addEventListener("mousedown", mousedownProxy);

                      var pressmoveProxy = createjs.proxy(execute, this, element, mod, "pressmove");
                      element.addEventListener("pressmove", pressmoveProxy);

                      if (typeof execute === "function")
                      {
                          // Do something
                          var mouseoverProxy = createjs.proxy(execute, this, element, mod, "mouseover");
                          element.addEventListener("mouseover", mouseoverProxy);
                      }
                     
                    }

            //}
        }

        function ejecutar(strFunction,vari) {

          
            return  executeFunctionByName(strFunction, window,  vari);
            //window[strFunction](vari);
            
        
        }


        function createEvents(valor=1) {

            //alert("create");
                    var ii = valor;
		
                    var longitud = $(".gridster ul").find('li').length;

                    var _currtemplate = store.get('_currentTemplate');

                     //preload.removeEventListener("fileload",handleLoadComplete);

                     //preload.addEventListener("fileload", handleLoadComplete2);
                       //var handle=handleLoadComplete2();
                        initialized(handleLoadComplete2);
                        console.log('createEvents 1');
                        var _p= new _msg("1");
                        var man=[];
                        var cont=0;
		                for(ii=1;ii <= longitud;ii++)
		                {

		                var element = document.getElementById(ii);        

		                var _exists = false;
		                //alert("get_m_w_c" + _currtemplate + "_" + ii);
		                var _f=replaceAll("get_m_w_c" + _currtemplate + "_" + ii,"-","_");
		                //alert("xx " + _f);
		                if(functionExists(_f))
                        {
		                    //alert('si');
                            _exists=true;
                        }
                            else{
                            
                           // alert("no");
                            }
		               
                            console.log('createEvents 2');
                            //pueden ser muchos modulos por widget
                        if (_exists) {
                           
                            console.log('createEvents 3');
                           // var sch = exbyname("get_modules_widget_" + ii,);
                            //executeFunctionByName("get_modules_widget_" + ii,window,0,_p)
                            //while (1 == 1) { }

                            //createEvents2(_p,element);
                            //alert('e');
                            _p.data= ejecutar(_f, _p);
                            
                            var _modulestmp=JSON.parse(_p.data);

                            console.log(_modulestmp);
                            //Cargar los modulos
                            var yuy;
                            for (yuy = 0; yuy < _modulestmp.length; yuy++) {

                                _pj = _modulestmp[yuy];

                                for (yu = 0; yu < _pj.module.length; yu++) {
                                    // alert("for");
                                    //var element = document.getElementById(ii);
                                    var pt = "" + _currtemplate + "-" + ii + "-" + _pj.module[yu] + "-" + _modulestmp[yuy].mode;
                                    console.log('Ruta ' + pt);
                                    var _f1 = "get_module_" + pt;

                                    _f1 = replaceAll(_f1, "-", "_");

                                    pt += ".js?v=" + ramdonversion();
                                    //alert(_f1);
                                    var item = {
                                        src: pt,
                                        id: _f1
                                    };

                                    man[cont] = item;
                                    cont = cont + 1;
                                }
                            }
                            
                        }

                        elements.push(element);
                        var clickProxy = createjs.proxy(execute, this, element, null, "click");
                        element.addEventListener("click", clickProxy);

                        }		               
                        console.log(man);
                        preload.loadManifest(man, true, "config/widget/");                       
		                 
		                }
                         
                     
                


  	            function playSound(target) 
                {                 
		            //Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
		            		            
                try
                {
                  var el=elements[target-1];
		
		            var instance = createjs.Sound.play(el.id);
		            if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
			              return;
		            }
		            var classn=el.className;
                    el.className = classn + " playsound ";
		            instance.addEventListener("complete", function (instance) {
			        el.className = classn;
                    endSound_function(el);
		             });
                }
                catch(e)
                {
                    alert('463 ' + e.message);
      
                }     
             }
             
            
            // sectiontoolbar
             
       var canvas = document.getElementById("demoCanvas");
       var input = document.getElementById("testFile");
       var stage = new createjs.Stage(canvas);
       var image = new Image();

       //createjs.Ticker.addEventListener("tick", handleTick);

       function handleTick(event) {
         stage.update()
        }

       input.addEventListener("change", previewFile);

       function previewFile()
       {
       var file = input.files[0];
       var reader = new FileReader();
       reader.onloadend = function () {
        image.src = reader.result;
        var bitmap = new createjs.Bitmap(image);
        stage.addChild(bitmap);        
        $("#gridPage").css("backgroundImage", "url(" + canvas.toDataURL() + ")");
        }
        if (file) {
        reader.readAsDataURL(file);
        } else {
        alert("fail");
       }
       }
             
             
             


	var stage;
	var bg, logo;		
	var content, monalisa;
    var imagepath;
    var imagewidth;
    var imageheight;
		// Resize event listener
	window.addEventListener('resize', resize, false);

    function showSettings(){
      
      $('#myTabContent').toggle();
      
    }


		/**
		 * Init handler
		 */
		function loadbackground() {

			stage = new createjs.Stage("demoCanvas");
			createBackground();
			createLogo();
			createContent();
			//createjs.Ticker.addListener(this);
            createjs.Ticker.addEventListener("tick", tick);
			resize();
		}
		
		/**
		 * create and display the background (fullscreen)
		 */
		function createBackground() {
			bg = new createjs.Shape();		
			stage.addChild(bg);
    	}

		/**
		 * create and display logo (top-right)
		 */
		function createLogo() {

			logo = new createjs.Bitmap("logo.png");
			//logo.y = 1;
			stage.addChild(logo);

		}
		
		 
		/**
		 * create content (centered)
		 */
		function createContent() {


			content = new createjs.Container();
			stage.addChild(content);
			// Load the Monalisa Image
			// (You should also use PreloadJS to avoid the onload listener)
			monalisa = new Image();
			monalisa.src = imagepath;//"mona.jpg";
            
			monalisa.onload = handleImageLoad;
			

		}
		
		var bmpMonaLisa;
		var relacionaspecto;
		function handleImageLoad() {

			// Create a CreateJS bitmap from the loaded image
			bmpMonaLisa = new createjs.Bitmap(monalisa);

			relacionaspecto=bmpMonaLisa.image.width/bmpMonaLisa.image.height;
			
			//alert('xxx' + relacionaspecto);
			//alert(window.innerHeight);
			// Add the bitmap to the Container
			content.addChild(bmpMonaLisa);
     
			// Set the registration point of the content Container to center
			content.regX = 0;//window.innerWidth;//bmpMonaLisa.image.width;
			content.regY = 0;//window.innerHeight;//bmpMonaLisa.image.height;//bmpMonaLisa.image.height/2;

      var scalesizex=window.innerWidth-(window.innerWidth*0.1);
      
      var scalesizeimagex=bmpMonaLisa.image.width;
      
	  //scalesizeimagex/scalesizex
	  
      if(scalesizex > scalesizeimagex){
       
         scalesizex=scalesizeimagex/scalesizex;
         //scalesizex=scalesizex/scalesizeimagex;
        
      }
      else{
        
        scalesizex=scalesizex/scalesizeimagex;
       }
      
       var scalesizey=window.innerHeight;
      
       var scalesizeimagey=bmpMonaLisa.image.height;
      
       if(scalesizey > scalesizeimagey){
         scalesizey=scalesizeimagey/scalesizey;
       }
       else{
          
          scalesizey=scalesizey/scalesizeimagey;
         
       }
      
      
      
			// Set the scale value
			// It could be useful to properly handle different mobile resolutions
		
      
      
      if(_paramshow=='true')
      {
          
        	content.scaleX = window.innerWidth/bmpMonaLisa.image.width;
          content.scaleY=window.innerWidth/bmpMonaLisa.image.width;//window.innerHeight/bmpMonaLisa.image.height;
        
      }
      else
      {
        	//content.scaleY = (window.innerHeight/bmpMonaLisa.image.height) * 0.8; ///0.5;
          //window.innerWidth/bmpMonaLisa.image.width;
			//alert('scala  ' +scalesizex);
        	content.scaleX = scalesizex;
            content.scaleY=scalesizex;
      }
		
			resize();
			
		}


		/**
		 * Tick Handler
		 */
		//function tick() {
			
			//stage.update();
		//}	


		/**
		 * Resize event handler
		 */
    
    function resize2(){
      
      stage.update();
    
      return;


       var w = window.innerWidth-2; // -2 accounts for the border
    var h = window.innerHeight-2;
    stage.canvas.width = w;
    stage.canvas.height = h;
    //
    var ratio = h/w; // 100 is the width and height of the circle content.
    var windowRatio = w/h;
    var scale = w/h;
    if (windowRatio > ratio) {
        scale = h/w;
    }
    // Scale up to fit width or height
   
    bg.graphics.clear();
	bg.graphics.beginFill("#222").drawRect(0,0,stage.canvas.width,stage.canvas.height);
    // Center the shape
    content.scaleX= w/h ;
    content.scaleY =h/w ; 
    
    content.x = 0;
    content.y = 0;
        
    stage.update();
    
      return;

      
    }
    
    
		function resize() 
    {
         
          
	   //alert('resize');
	      
       if(stage!=null){
			// Resize the canvas element
		  	stage.canvas.width = window.innerWidth;
			//alert('ddd' + (window.innerWidth/relacionaspecto));
			
	    	stage.canvas.height = window.innerWidth/relacionaspecto;
			
			//stage.canvas.height = bmpMonaLisa.image.height;
	    	
        }
	    	// Logo: top-right position (canvasWidth - image width - 10 px padding)
	    	//logo.x = stage.canvas.width ;//- 120 - 10

		    // Background: full screen redraw 
            //alert('');
	    	bg.graphics.clear();
	    	bg.graphics.beginFill("#222").drawRect(0,0,stage.canvas.width,stage.canvas.height);
	    	//alert('1');
	        // Content: centered
	        //content.x = stage.canvas.width / 2;
	        //content.y = stage.canvas.height / 2;
          
             content.x = 0;
             content.y = 0;
             stage.update();
          
          
	    }

      function loadConfigSectionData()
       {
		  
          var _dataConfig=JSON.parse (store.get('_currentSectionConfig'));
          
          var _page=$('#gridPage');
		  
		  //alert(_dataConfig.background_imageurl);
		  
          //background
          if(_dataConfig.background_imageurl != '')
          {
           
            imagepath='../images/templates_1/' + _dataConfig.background_imageurl;
			
            loadbackground();
           
           //$(_page).css('background-image', 'url(../images/templates_1/' + _dataConfig.background_imageurl + ')');  
           //$(_page).css('width','100%');
           }
           else if(_dataConfig.background_color !='')
           {
           }
           
           if(_dataConfig.background_cssurl !='')
           {
               
               $('link[rel=stylesheet][href*="defaultstylesection"]').remove();
               
               $('head').append('<link rel="stylesheet" type="text/css" href="../css/' + _dataConfig.background_cssurl 
               + '">');
          }
           
            if(_paramshow=='true')
             {
         
                 $( document ).ready(function() {                  
                 $('#demoCanvas').css('top','0%');
                 $('#myTab').hide();
                 $('body').css('background_color','black');
                 if(_previewmode){
                 
                     previewmode();
                 }
                  
                 });
             }
           
           
           
           
           //var ii=0;
           //for(ii=0;ii < elements.length;ii++)
		     //           {
             //         var element =elements[ii];
		                 
		     //         element.addEventListener("click", function() {
             //         click_function(this);
	         //        });
            //}
          
         }
      
           
       function click_function(e){
               
                //alert('click xxxx');
               //new createjs.Shape().set({name:"newShapes"});
                var text = new createjs.Text("Hola como estas", "12px Verdana", "#aa0000").set({name:e.id + "_txt"});
                //text.align='center';
                var p = $( e );
                var offset = p.position();
                    
                text.x = (offset.left)* 1.1 + p.width();
                text.y = offset.top ;//+ p.height();
               
                // Put it all in a container on the stage
               //content.addChild(sb,text);
               //content.addChild(sb,text);
               stage.addChild(text);
               
               sprite(e,offset.left,(offset.top+p.width()/2),'bubbles.png');
               //setimage(e,offset.left+ (p.width()/2)+30,offset.top-p.height(),80,50,"ScaleBitmapImage.png");
               //pajaro(e);
               loadAnimation(e);
              }
       
       
       function setimage(e,x,y,sizex,sizey,srcpath)
       {
                var image = new Image();
			    image.onload = function() { stage.update(); }
			    image.src = srcpath;
                var sb = new createjs.ScaleBitmap(image, new createjs.Rectangle(12, 12, 5, 10)).set({name:e.id + "_scb"});
                sb.setDrawSize(sizex, sizey);
                sb.x=x;
                sb.y=y;
                stage.addChild(sb);
       }
       
       
       function sprite(e,x,y,srcpath)
       {
         
        
         var  img = new Image();
         img.src = srcpath;
         img.onload = function(event) {
         var data = {
         framerate: 10,
         images: [img],
         frames: {width:64, height:64, regX:32, regY:32},
         animations: {
            'explode': [0, 10],
          }
        }
       
       var spritesheet = new createjs.SpriteSheet(data);
       var animation = new createjs.Sprite(spritesheet, 'explode').set({name:e.id + "_ani"});
       animation.x = x;
       animation.y = y;
 
       //content.addChild(animation);
       stage.addChild(animation);
 
       createjs.Ticker.addEventListener("tick", tick);
    
     }
    
    }

    function update(event) {
        stage.update();
    }
         
         
         
    
       
       function endSound_function(el)
      {
         
          for (var i=stage.numChildren-1; i>=0; i--)
                   { var child = stage.getChildAt(i) 
                     if (child.name == el.id + "_txt"  ||  child.name == el.id + "_scb" ||  child.name == el.id + "_ani") 
                   { 
                     stage.removeChild(child); 
                    } 
                    
                    
                  } 
         
       }
       
    var sky, grant, ground, hill, hill2,w, h,loader;

	function loadAnimation(e) {
		//examples.showDistractor();
		//stage = new createjs.Stage("testCanvas");

		// grab canvas width and height for later calculations:
		w = stage.canvas.width;
		h = stage.canvas.height;

		manifest = [
			{src: "spritesheet_grant.png", id: "grant"},
			{src: "sky.png", id: "sky"},
			{src: "ground.png", id: "ground"},
			{src: "hill1.png", id: "hill"},
			{src: "hill2.png", id: "hill2"}
		];

		loader = new createjs.LoadQueue(false);
		loader.addEventListener("complete",function (){
        handleComplete(e);
    } );
		loader.loadManifest(manifest, true, "../images/art/");
	}

	function handleComplete(e) {
		//examples.hideDistractor();

		sky = new createjs.Shape();
		sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);

		var groundImg = loader.getResult("ground");
		ground = new createjs.Shape();
		ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
		ground.tileW = groundImg.width;
		ground.y = h - groundImg.height;

		hill = new createjs.Bitmap(loader.getResult("hill"));
		hill.setTransform(Math.random() * w, h - hill.image.height * 4 - groundImg.height, 4, 4);
		hill.alpha = 0.5;

		hill2 = new createjs.Bitmap(loader.getResult("hill2"));
		hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);

		var spriteSheet = new createjs.SpriteSheet({
				framerate: 30,
				"images": [loader.getResult("grant")],
				"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
				// define two animations, run (loops, 1.5x speed) and jump (returns to run):
				"animations": {
					"run": [0, 25, "run", 1.5],
					"jump": [26, 63, "run"]
				}
			});
		grant = new createjs.Sprite(spriteSheet, "run").set({name:e.id + "_ani"});;
		grant.y = 35;
    //stage.addChild(sky, hill, hill2, ground, grant);
		stage.addChild( grant);
		stage.addEventListener("stagemousedown", handleJumpStart);

		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", tick);
	}

	function handleJumpStart() {
		grant.gotoAndPlay("jump");
	}

	function tick(event) {
    try{
		var deltaS = event.delta / 1000;
		var position = grant.x + 150 * deltaS;

		var grantW = grant.getBounds().width * grant.scaleX;
		grant.x = (position >= w + grantW) ? -grantW : position;

		ground.x = (ground.x - deltaS * 150) % ground.tileW;
		hill.x = (hill.x - deltaS * 30);
		if (hill.x + hill.image.width * hill.scaleX <= 0) {
			hill.x = w;
		}
		hill2.x = (hill2.x - deltaS * 45);
		if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
			hill2.x = w;
		}

    }
    catch(e){
      
    }
		stage.update(event);
	}
    

    ////////////////////////////////////////////////////
    	 ///////////////////////carga el widget

    var currentwidget;          
    //Crear el formulario cargar los modulos por widget al dar click
	function createwidget()
          {
              //return;
       try{
	       
		   
           var currentwidgettmp=store.get('_currentWidget');
           
           //if(currentwidgettmp != undefined && (currentwidgettmp !=currentwidget) )
           //{
           if (currentwidgettmp != undefined )
           {

		        //alert(currentwidgettmp);
               ///////////////////////////////formulario con informacion del widget
               var sectionname=  store.get('_currentTemplate');
               
			   //sectionname=_user.toString() + '-' + sectionname;
			   
               var widgetfile='config/widget/'+ sectionname + '-' + currentwidgettmp + '.js?v='+ramdonversion();

               //alert(widgetfile);
		       	   
			   dynamicInsert(widgetfile);

               ////////////////////////////////////////////////////
			   //CreateReaderControl('widget.htm','?_target=widget','section3');
			   
               currentwidget = currentwidgettmp;

               store.set('_currentWidgetModules', null);

               var modulesItem = [];

               //Carga los modulos pertenecientes a un widget en un template
               console.log('inicio loadModuleWidget');
               modulesItem = loadModuleWidget(sectionname, currentwidgettmp);  
              
               console.log('fin loadModuleWidget');
               if (modulesItem.length > 0) {
                   
                   var ii = 0;
                   var modulesResume = [];
                   for (ii = 0; ii < modulesItem.length; ii++)
                   {
                       var item = createListitem2(modulesItem[ii].ModuleName, modulesItem[ii].Description);
                       modulesResume.push(item);
                   }
                   //FALTA PRUEBAs
                   for (ii = 0; ii < modulesItem.length; ii++) {
                       var item = createListitem2(modulesItem[ii].ModuleName, modulesItem[ii].Description);
                       modulesResume.push(item);
                   }

                   store.set('_currentWidgetModules', modulesResume);
                   createList();
               }   

           }
           
           }
           catch(e){
               
               alert('home createwidget ' + e.message);
               
           }
              
          }

function loadModuleWidget(sectionname, currentwidgettmp) {

    //EJECUTAR EL METODO QUE TRAE LOS MODULOS QUE CONTIENE UN WIDGET
    //_arrayModule array donde se guardan los metodos de cada widget si se encuentra es porq se cargo en el sistema
    var modulesItem = [];

    if (_arrayModule.length > currentwidgettmp) {

        var ii = 0;
        
        for (ii = 0; ii < _arrayModule.length; ii++) {

            var pt = "c" + sectionname + "_" + currentwidgettmp;
            var _name = replaceAll("get_m_w_" + pt, "-", "_");
            console.log('loadModuleWidget 1');
            if (_name == _arrayModule[ii]) {
                //alert(_name);
                console.log('loadModuleWidget 2');
                var arraym = executeFunctionByName(_name, window);
                console.log('loadModuleWidget 3');
                console.log(arraym);
                console.log('loadModuleWidget 3');
                if (arraym != undefined) {
                    
                    var arrtmptotal = JSON.parse(arraym);
                    console.log('loadModuleWidget 4');

                    var yuy;
                    var arrwidtmp;
                    var arrayms;
                    for (yuy = 0; yuy < arrtmptotal.length; yuy++) {

                        if (arrtmptotal[yuy].mode == _currentMode) {

                            arrayms = arrtmptotal[yuy];
                        }                

                    }
                    console.log('loadModuleWidget 5'); 
                    if (arrayms == undefined) {

                        alert('Empty modules');
                        return modulesItem;
                    }                    

                    //for (yuy = 0; yuy < arrayms.length; yuy++) {

                        //var arrayms = arrwidtmp[yuy];
                        console.log('loadModuleWidget 6'); 
                        for (iii = 0; iii < arrayms.module.length; iii++) {
                            console.log('loadModuleWidget 7'); 
                            var pt = "" + sectionname + "-" + currentwidgettmp + "_" + arrayms.module[iii] + "_" + arrayms.mode;
                            console.log('loadModuleWidget 8'); 
                            var _f1 = "get_module_" + pt;

                            _f1 = replaceAll(_f1, "-", "_");

                            //alert(_f1);

                            var modulos = executeFunctionByName(_f1, window);
                            console.log('loadModuleWidget 9'); 
                            var modulo = JSON.parse(modulos);

                            console.log(modulo.DocumentNumber);

                            modulesItem.push(modulo);

                        }
                    //}

                }

            }
        }

        /////////////
        return modulesItem;
    }




}
function createListitem2( Name, Description, image) {

    var item = { title: Name, text: Description, picture: "../../images/fruits/60Mint.png" }

    return item;
}

function createListitem(id,Name,Description,category,image) {

    var item = { ID: id, title: Name, text: Description, category: category, captionclass: "caption transparent", classname: "tile blue title-scaleup imagetile w2 h1 isotope-item", picture: image }

    return item;
}
	function loadWidgetConfig(data) {
      //alert("Symbol: " + data.symbol + ", Price: " + data.price);
        //alert(data);
        
		 store.set('_currentwidgetconfigkrip',data);
         CreateReaderControlWidget(data);   
      
      }
      /////////////////////////////////////////
		
     function createdocument(documentid,widgetid)
          {
              //return;
       try{
	      
		    store.set('_currentDocument',documentid.ID);
			store.set('_currentDocumentName',documentid.title);
		   
		    var currentdocumenttmp=store.get('_currentDocument');
		   
		    store.set('_currentWidget',widgetid);
            
			var currentwidgettmp=store.get('_currentWidget');
           
           if(documentid != undefined  )
           {
		   
		       
              var sectionname=  store.get('_currentTemplate');
               
			   sectionname=sectionname + '-' + currentdocumenttmp;
			   
               var widgetfile='config/documents/'+  sectionname  + '.js?v='+ramdonversion();
               
			        
               var otherpath='../modules/' + 'm_' + documentid.ID + '/default.js';
               //alert(otherpath);
               dynamicInsert(widgetfile, 0, otherpath);
               
			   //CreateReaderControl('widget.htm','?_target=widget','section3');
			   
               currentwidget=currentwidgettmp;
               //CreateReaderControlCreateWidget();
           }
           
           }
           catch(e){
               
               alert('home createwidget ' + e.message);
               
           }
              
          }
          
	
	function loadDocument(data) {
      //alert("Symbol: " + data.symbol + ", Price: " + data.price);
        //alert(data);
        
		 store.set('_currentdocumentconfigkrip',data);
         
		 CreateReaderControlDocument(data);   
      
      }
	 
	 
	 
	 /////////////////////////////////////////////////////////
             
    var sectiontoolbar = $("#sectiontoolbar"); 
	  
    var _con=store.get('_currentsectionconfigkrip');
       
    CreateReaderControlSection(_con); 	
	
	function resizexx(){
		
		//alert('xxx');
		
	}
	
	function onResize( element, callback ){
    var elementHeight = element.height,
      elementWidth = element.width;
      setInterval(function(){
      if( element.height !== elementHeight || element.width !== elementWidth ){
        elementHeight = element.height;
        elementWidth = element.width;
        callback();
      }
  }, 300);
}

var element = canvas;//document.getElementById("demoCanvas");
onResize( element, changesize );
	
	
	var _ini_ =1;
	
	function changesize(){
		
	
		if(_ini_==1){
			_ini_=0;
		}else{
			window.parent.loadsection1(1);
		}
		 
		
		
	}
	
	
	function dragenabled(){
		
		
    WinJS.UI.processAll().then(function () {
    
	document.getElementById("demoCanvas").addEventListener("click", resizexx,false);
    Dragging.initGarbageCan();
    
    });		
	}

	 var _modules = [];

	function get_currentDocument() {


	    return _currentDocument;
	}
	function cancelDismissal(evenObject) {
    
    if (evenObject.detail.result === WinJS.UI.ContentDialog.DismissalResult.none) {
        evenObject.preventDefault();        
    }
	  
    var ifrm = document.getElementById("ifrmID_documentconfig");
	    // using reference to iframe (ifrm) obtained above
	var win = ifrm.contentWindow; // reference to iframe's window
	    // reference to document in iframe
	var doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document;
	    // reference to form named 'demoForm' in iframe
	var form = doc.getElementById('output');	
	var _currentDocument = JSON.parse(form.value);
        var _wid = store.get('_currentWidget');
        _wid = _wid - 1;
     AddModuleResumeList(_currentDocument);      
     createList();

        //FALTA CODIGO PARA GUARDAR
	
}

function AddModuleResumeList(module) {

    var modulesResume=  store.get('_currentWidgetModules');
    var item = createListitem2(module.ModuleName, module.Description);
    modulesResume.push(item);
    store.set('_currentWidgetModules', modulesResume);
}

function createList() {
    //'bottom_pane'
    console.log('ini createList');

   var element= $(window.parent.central_bar);
    //alert(element);
    if (_fullScreen) {
        
        CreateReaderControlFromElement('/pages/lista/ListView.html?v =' +ramdonversion(), '', element );
    } else {
        CreateReaderControlFromElement('/pages/lista/ListView.html?v =' + ramdonversion(), '', element);
    }
   
    console.log('fin createList');
}



	//var preload;
	function opendocumentsettings(documentid,widgetid){
		
		    var doc=JSON.parse(documentid);		    
			createdocument(doc,widgetid);
		    var contentDialog = document.querySelector(".win-contentdialog").winControl;
			contentDialog.addEventListener("beforehide", cancelDismissal, false);
            contentDialog.show();
				
		
	}
	
	function initialized(_handleLoadComplete) {
	    // Create a new queue.
	    //preload = new createjs.LoadQueue(true, "assets/");

	    // Use this instead to favor XHR loading
	    preload = new createjs.LoadQueue(true);
	    //createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);  // need this so it doesn't default to Web Audio
	    //preload.installPlugin(createjs.Sound);
	    preload.on("fileload", handleFileLoaded);
	    preload.on("error", handleError);
	    preload.on("complete", _handleLoadComplete);
	}



    function get_module_widget(widget)
    {  var modname = [];
	    return modname;
	}

	// Load a single asset.
	function loadAsset(target) {
	    var div = document.getElementById(target.id);
	    div.innerHTML = "<label>Loading...</label>";

	    var type = target.attributes.getNamedItem("type");

	    var item = {
	        src: target.id,
	        id: target.id
	    };

	    if (!type) {
	        alert('notype');
	        preload.loadManifest({ path: "../_assets/", manifest: [item] });
	    } else {
	        alert(type.value);
	        item.type = type.value;
	        item.callback = "maps";
	        preload.loadFile(item, true);
	    }
	}

	function handleLoadComplete(event) {
	    
	    if (preload != null) {
	        preload.close();
	    }
	    createEvents();

	}
    //funcion final de carga 
	function handleLoadComplete2(event) {
	    
	    //myNameSpace.MyApp = MyApp;
	   
	     alert("sixxx");
         //myNameSpace.test();
	    //createEvents();
	}

    
	function handleFileLoaded(event) {
	    var item = event.item;
	    var id = item.id;
	    var result = event.result;

	    //var div = document.getElementById(id);
	    //if (div == null) {
	    //    console.log("Could not find DIV:", id, event);
	    //    return;
	    //}
	    switch (item.type) {
	        case createjs.Types.CSS:
	            var idcss = item.src.toLowerCase().split("/").pop().split(".")[0];
	            if (!_existstag(idcss, 'link', 'href')) {
	            (document.head || document.getElementsByTagName("head")[0]).appendChild(result);
	            //div.innerHTML = "<label>CSS is complete :)</label>";
	            }
	            break;

	        case createjs.Types.IMAGE:
	            div.innerHTML = "";
	            result.width = div.clientWidth;
	            result.height = div.clientHeight;
	            //div.appendChild(result);
	            break;

	        case createjs.Types.JAVASCRIPT:
	            result.id="" + item.id;
	            functionName=item.id;
                //alert(functionName);
	            if(functionName.indexOf("get_m_w_c")>-1)
	            {
	                //alert(result.text);
	                result.text=result.text.replace('xxx',item.id);
	                //alert(result.text);
	                //var a=result.text.split(",");
                    rec_data2(result.text, item.id);

                    _arrayModule.push(functionName);

                }
                else
                if(functionName.indexOf("get_module_")>-1)
	            {
	                          
                    rec_data2(result.text,item.id);
	            }
                //document.body.appendChild(result);

	            //var letra = item.src.text().charAt(0);
                //obtener archivos de configuracion 
                //if(letra=="c"){
                

                
                //}
	            //div.innerHTML = "<label>Javascript is complete :)</label>";
	            break;

	        case createjs.Types.JSON:
	        case createjs.Types.XML:
	            //div.innerHTML = "<label>" +
				//		item.type +
				//		" loaded: <br /><xmp>" +
				//		(event.rawResult ? event.rawResult : '') +
				//		"</xmp></label>";
	            break;
	        case createjs.Types.JSONP:
	            //div.innerHTML = "<label>JSONP is complete :)</label>";
	            break;
	        case createjs.Types.SOUND:
	            document.body.appendChild(result);
	            result.play();
	            //div.innerHTML = "<label>Sound is complete :)</label>";
	            break;

	        case createjs.Types.SVG:
	            div.innerHTML = "";
	            //div.appendChild(result);
	            break
	    }
	    //div.style.backgroundColor = "#222222";
	}

	// A file failed to load.
	function handleError(event) {

	    var item = event.data;
	    //var div = document.getElementById(item.id);
	    //if (div != null) {
	    //    div.innerHTML = "<label>Error " + (item.id == "NoFileHere.png" ? ":)" : ":(") + "</label>";
	    //    div.className = "gridBox error";
	    //}
	    console.log("handleError error");
	}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	function dragexecute(event, target, module, eventName) {

	    if (dragGridEnabled == false) {

	        return;
	    }
	    //console.log(target.$helper.context.id);
	    //target.$helper.context.dataset.col
	    //target.$helper.context.dataset.row
	    //target.$helper.context.sizex
	    //target.$helper.context.sizeY
	    console.log(eventName);
	    //console.log(target.$helper.context.dataset);
	   
	}

	
	function execute(event,target,module,eventName) {

        //alert('click');
	    
	    switch (event.type) {

	        case "click":

	            if (_editmode == false) {
	                //playSound(target.id);
	                //click_function(target);
                } else
                {
	                createwidget();
	            }
	            break;

	        case "mouseover":

	            break;

	        case "dblclick":

                break;

             case "mousedown":
                console.log(module + " " + event.type);
                break;

            case "pressmove":
                console.log(module + " " + event.type);
                break;

	    }
	    

	   // tmps = event;
	    //var ss=store.get('_currentWidget'); 
	    //alert(ss);
	    //createwidget();
	}

	//function dblclic_execute(event, target, module) {

	//}

	//function mouseover_execute(event, target, module) {

	//}

	function executemethod(target,methodname) {

         var tot = _modules.length;

	    for (i = 0; i < tot; i++) {

	        var act = _modules.Actions;
	        if (act.indexOf(methodname) != -1) {
	            var methodstr = _modules[i].Actions;
	            exbyname();

	        }
	    }


	}