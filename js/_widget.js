
   
       var gridster;
       var maxcols=25;
      
       var ratio=window.innerWidth/window.innerHeight;
       
      var _pagewidth=window.innerWidth;
      var calheight=(_pagewidth/maxcols)+1;
     
      var calwidht=calheight;
     
      function showFullScreen(){
    
    
        try{
       window.external.notify("showmode");
       }
       catch(e)
       {
       }
    
         
       var importantStuff = window.open('section.htm?_target=section&_fs=true&_preview='+ _previewmode, '_blank');    
        //para control webview 
    
       
         
       }
       
      $(function(){

        gridster = $(".gridster ul").gridster({
          widget_base_dimensions: [calwidht,calwidht],
          widget_margins: [0, 0],
          helper: 'clone',
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
    
    document.getElementById("dropdown4-tab").addEventListener("click", previewmode, false);
    document.getElementById("dropdown3-tab").addEventListener("click", desingmode, false);
    document.getElementById("dropdown2-tab").addEventListener("click", removeWid, false);
    document.getElementById("dropdown1-tab").addEventListener("click", addWid, false);    
    document.getElementById("show-tab").addEventListener("click", showFullScreen, false); 
    
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
                    var ii=1;
		
                    var longitud=$(".gridster ul").find('li').length;
                    //agrega el evento a cada widget
		                for(ii=1;ii <= longitud;ii++)
		                {
                      var element =document.getElementById(ii);
		                
		                  element.addEventListener("click", function() {
						   //alert('xxxx2');
                           //playSound(this.id);
						   clic_execute(this);
						   
	                  });
		                  elements.push(element);
		                }
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
		
		function handleImageLoad() {

			// Create a CreateJS bitmap from the loaded image
			var bmpMonaLisa = new createjs.Bitmap(monalisa);

			// Add the bitmap to the Container
			content.addChild(bmpMonaLisa);
     
			// Set the registration point of the content Container to center
			content.regX = 0;//window.innerWidth;//bmpMonaLisa.image.width;
			content.regY = 0;//window.innerHeight;//bmpMonaLisa.image.height;//bmpMonaLisa.image.height/2;

      var scalesizex=window.innerWidth;
      
      var scalesizeimagex=bmpMonaLisa.image.width;
      
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
        	content.scaleX = scalesizex;
          content.scaleY=scalesizex;
      }
		

			
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
         
          

       if(stage!=null){
			// Resize the canvas element
		  	stage.canvas.width = window.innerWidth;
	    	stage.canvas.height = window.innerHeight;	    	
        }
	    	// Logo: top-right position (canvasWidth - image width - 10 px padding)
	    	//logo.x = stage.canvas.width ;//- 120 - 10

	    	// Background: full screen redraw 
	    	bg.graphics.clear();
	    	bg.graphics.beginFill("#222").drawRect(0,0,stage.canvas.width,stage.canvas.height);
	    	
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
               
                alert('click xxxx');
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
      
      
   

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function clic_execute(target)
	{
		//alert('clicc 2');
        playSound(target.id);
		click_function(target);
		//var ss=store.get('_currentWidget'); 
		//alert(ss);
		//createwidget();
	}
  
        //alert('w'); 
    var _con=store.get('_currentwidgetconfigkrip');
    
	if(_con!=undefined){
		CreateReaderControlSection(_con); 
	}
	
    

