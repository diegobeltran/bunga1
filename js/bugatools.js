 var listviewselectedindex;
 var selectitemxs;
 var _sectionConfig;
 var _widgetConfig;
 var _user = '12345';
 var _currentsource;
 function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
   }   
   


 function ramdonversion() {

     return Math.floor((Math.random() * 100) + 1);

 }

 function CreateReaderControl(page, query, div) {

     //alert($('#' + div));
     $('#' + div).empty();

     $('<iframe>', {
         src: page + query,
         id: 'ifrmID' + '_' + div,
         frameborder: 0,
         scrolling: 'yes',
         width: '99%',
         height: "100%"

     }).appendTo('#' + div);

}

function CreateReaderControlFromElement(page, query, div) {

    //alert($('#' + div));
    $(div).empty();

    $('<iframe>', {
        src: page + query,
        id: 'ifrmID' + '_' + div,
        frameborder: 0,
        scrolling: 'yes',
        width: '99%',
        height: "100%"

    }).appendTo(div);

}

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
 function dynamicInsert(url,veces=0,url2=''){
      
     $.ajax({
         type: 'HEAD',
         url: url,//'http://www.example.com/index.php',
         success: function() {
             dynamicInsert2(url);
             return true;
         },  
         error: function() {
             //alert('Page not found.');
             veces=veces+1;
             if(veces==1){
                 if(url2!=''){
                     url=url2;
                 }

                 //url default
             }
             if(veces==2){
                 //url servidor 
             }
             if(veces==3){
                 //url default
                 return false;
             }
             dynamicInsert(url,veces);
             return false;
         }
     });
 }
	  
	  
     function  dynamicInsert2(url){
		  
         var script = document.createElement('script');
         script.setAttribute('src', url);
         script.async = false; // optionally
         // load the script
         try{
             document.getElementsByTagName('head')[0].appendChild(script); 
         }
         catch(e){
             alert('home dynamicInsert ' + e.message);
         }
		  
		  
     }
	 



     /////////////////////////////////////////////////

     function createjscssfile(filename, filetype, implementationCode) {
         var fileref;
         if (filetype == "js") { //if filename is a external JavaScript file
             fileref = document.createElement('script');
             fileref.setAttribute("type", "text/javascript");
             fileref.setAttribute("src", filename);
             fileref.onload = function () { yourCodeToBeCalled() };
             fileref.onreadystatechange = function () { yourCodeToBeCalled() };
             fileref.async = false; // optionally

         }
         else if (filetype == "css") { //if filename is an external CSS file
             fileref = document.createElement("link");
             fileref.setAttribute("rel", "stylesheet");
             fileref.setAttribute("type", "text/css");
             fileref.setAttribute("href", filename);
             fileref.onload = implementationCode;
             fileref.onreadystatechange = implementationCode;
         }

         return fileref;
     }




     function replacejscssfile(oldfilename, newfilename, filetype, implementationCode) {
         var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none"; //determine element type to create nodelist using
         var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none"; //determine corresponding attribute to test for
         var allsuspects = document.getElementsByTagName(targetelement);
         for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
             if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) != -1) {
                 var newelement = createjscssfile(newfilename, filetype);
                 //alert(newfilename);
                 //document.getElementsByTagName("head")[0].appendChild(newelement);
                 //allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
             }
         }
     }

     function _existstag(name, tag, attribute) {

         var tot = document.getElementsByTagName(tag).length;

         for (var i = 0; i < tot ; i++) {

             var link = document.getElementsByTagName(tag)[i];

             var idcss = link.getAttribute(attribute).toLowerCase().split("/").pop().split(".")[0];

             if (idcss == name) {
                 return true;
             }

         }
         return false;
     }

     var cargado = true;
     function SwitchCss(path, attr, tag, implementationCode) {

         path = path.replace(new RegExp(/\\/g), "/");
         //'link'
         //href
         //scan links only within the Menu container, the Table with ID header
         if (document.getElementsByTagName(tag)) {
             var link;
             var linkHref;
             try {
                 var tot = document.getElementsByTagName(tag).length;

                 for (var i = 0; i < tot ; i++) {
                     (link = document.getElementsByTagName(tag)[i]);
                     //alert('xxxx');
                     //while(cargado==false){

                     //}
                     //alert('fin');
                     linkHref = document.getElementsByTagName(tag)[i];
                     //.getAttribute(attr);
                     //if (linkHref.toLowerCase() == path.toLowerCase()) {
                     //document.links[i].href=path;//+ document.links[i].href;
                     //document.write(document.links[i].href);
                     //alert(linkHref);
                     if (linkHref.getAttribute(attr) != null && linkHref.getAttribute('id') == null && tag == 'link') {
                         document.getElementsByTagName(tag)[i].setAttribute(attr, path + linkHref.getAttribute(attr));
                         //alert(linkHref.getAttribute(attr));

                     }
                     else if (linkHref.getAttribute(attr) != null && tag == 'script') {
                         //alert(path + linkHref.getAttribute(attr));
                         var fileref = document.createElement('script');
                         fileref.setAttribute("type", "text/javascript");
                         fileref.setAttribute("src", path + linkHref.getAttribute(attr));

                         //linkHref.parentNode.replaceChild(fileref, linkHref)
                         fileref.onload = implementationCode;
                         fileref.onreadystatechange = implementationCode;
                         fileref.async = false;
                         document.getElementsByTagName("head")[0].appendChild(fileref);

                     }
                     else {
                         alert('sss');

                     }

                     //document.getElementsByTagName('link')[i].setAttribute('href', path);
                     //}

                 }
             }
             catch (e) {
             }
         }
     }

     function trim(stringToTrim) {
         return stringToTrim.replace(/^\s+|\s+$/g, "");
     }





     function repli(path, attr, tag, implementationCode) {

         var tot = document.getElementsByTagName(tag).length;
         var link;

         for (var i = 0; i < tot ; i++) {
             link = document.getElementsByTagName(tag)[i];

             //SwitchCss(path,attr,tag,implementationCode);
             var gattr = link.getAttribute(attr);
             if (tag == 'link' && link.getAttribute(attr) != null) {
                 //alert(path + gattr );
                 replacejscssfile(gattr, path + gattr, 'css');
             }
             else if (link.getAttribute(attr) != null) {
                 //alert(path + gattr);
                 replacejscssfile(gattr, path + gattr, 'js');
             }


         }

     }


     function nop() {

     }


     function getAllUrlParams(url) {

         // get query string from url (optional) or window
         var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

         // we'll store the parameters here
         var obj = {};

         // if query string exists
         if (queryString) {

             // stuff after # is not part of query string, so get rid of it
             queryString = queryString.split('#')[0];

             // split our query string into its component parts
             var arr = queryString.split('&');

             for (var i = 0; i < arr.length; i++) {
                 // separate the keys and the values
                 var a = arr[i].split('=');

                 // in case params look like: list[]=thing1&list[]=thing2
                 var paramNum = undefined;
                 var paramName = a[0].replace(/\[\d*\]/, function (v) {
                     paramNum = v.slice(1, -1);
                     return '';
                 });

                 // set parameter value (use 'true' if empty)
                 var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                 // (optional) keep case consistent
                 paramName = paramName.toLowerCase();
                 paramValue = paramValue.toLowerCase();

                 // if parameter name already exists
                 if (obj[paramName]) {
                     // convert value to array (if still string)
                     if (typeof obj[paramName] === 'string') {
                         obj[paramName] = [obj[paramName]];
                     }
                     // if no array index number specified...
                     if (typeof paramNum === 'undefined') {
                         // put the value on the end of the array
                         obj[paramName].push(paramValue);
                     }
                         // if array index number specified...
                     else {
                         // put the value at that index number
                         obj[paramName][paramNum] = paramValue;
                     }
                 }
                     // if param name doesn't exist yet, set it
                 else {
                     obj[paramName] = paramValue;
                 }
             }
         }

         return obj;
     }

     function exbyname(functionName /*, args */) {

         executeFunctionByName(functionName, window, 0 /*, args */);

     }

     function executeFunctionByName(functionName, context /*, args */) {
         var args = Array.prototype.slice.call(arguments, 2);
         var namespaces = functionName.split(".");
         var func = namespaces.pop();
         for (var i = 0; i < namespaces.length; i++) {
             context = context[namespaces[i]];
         }
         return context[func].apply(context, args);
     }

     function executeFunctionByName3(functionName, context, timeout /*, args */) {
         var args = Array.prototype.slice.call(arguments, 3);
         var namespaces = functionName.split(".");
         var func = namespaces.pop();
         for (var i = 0; i < namespaces.length; i++) {
             context = context[namespaces[i]];
         }
         var timeoutID = setTimeout(
             function () { context[func].apply(context, args) },
             timeout
         );
         return timeoutID;
     }


     function createClass(name, rules) {
         var style = document.createElement('style');
         style.type = 'text/css';
         document.getElementsByTagName('head')[0].appendChild(style);
         if (!(style.sheet || {}).insertRule)
             (style.styleSheet || style.sheet).addRule(name, rules);
         else
             style.sheet.insertRule(name + "{" + rules + "}", 0);
     }

     function applyClass(name, element, doRemove) {
         if (typeof element.valueOf() == "string") {
             element = document.getElementById(element);
         }
         if (!element) return;
         if (doRemove) {
             element.className = element.className.replace(new RegExp("\\b" + name + "\\b", "g"), "");
         } else {
             element.className = element.className + " " + name;
         }
     }

     function functionExists(strFunction) {

         var functionString = strFunction;

         var str = eval("typeof " + functionString); // returns "undefined" or "function"

         if (str == "function") {

             return true;
         }

         return false;
     }


     function replaceAll(functionName, char, replace) {

         var name = functionName.replace(new RegExp(char, 'g'), replace);
         return name;
     }

     function rec_data(data) {


         alert('rec_data');
         alert();

         if (functionName == undefined) {
             console.log(functionName);
             return;
         }
         var re = /_/gi;

         var name = replaceAll(functionName, "-", "_");

         //alert(name);
         var script = document.createElement("script");
         //script.id = 
         var defscript = "function " + name + "(event){"

         defscript += "return " + "'" + data + "';";

         defscript += "} ";

         script.text = "" + defscript + " ";
         script.async = false; // optionally
         //=defscript;
         //alert(script.text);
         document.getElementsByTagName("body")[0].appendChild(script);

         console.log(executeFunctionByName(name, window));
         //return data;
     }

     function rec_data2(data, name) {


         //alert('rec_data2');
         //alert(name);

         if (name == undefined) {
             console.log(name);
             return;
         }


         //var name=replaceAll(functionName,"-","_");

         //alert(name);
         var script = document.createElement("script");
         //script.id = 
         var defscript = "function " + name + "(event){"

         defscript += "return " + "" + data + ";";

         defscript += "} ";

         script.text = "" + defscript + " ";
         script.async = false; // optionally
         //=defscript;
         //alert(script.text);
         document.getElementsByTagName("body")[0].appendChild(script);
         console.log('rec_data2');
         console.log(executeFunctionByName(name,window));
         //return data;
     }

     function AddSource() {

         var _source = getAllUrlParams().source;
         ///de aca se escoje la fuente
         _currentsource = _source;
         //cargar al eligir si son tempaltes, codigos etc.
         var pathsource = "../data/" + _source + ".js?v = " + ramdonversion();
         dynamicInsert2(pathsource);


     }