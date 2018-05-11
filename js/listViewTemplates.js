(function () {
    "use strict";

    function imageTemplate(item){
        var template = document.createElement("div");
        template.className = "listIconTextTemplate";
        template.style.overflow = "hidden";

        var image = document.createElement("img");
        image.className = "listIconTextItem-Image"
        image.src = item.data.picture;
        template.appendChild(image);

        return template;
    }

    function textWithImageTemplate(item) {
        var template = imageTemplate(item);

        var body = document.createElement("div");
        body.className = "listIconTextItem-Detail"
        body.style.overflow = "hidden";
        template.appendChild(body);

        var title = document.createElement("h4");
        title.className = "win-h4";
        title.textContent = item.data.title;
        body.appendChild(title);

        var fulltext = document.createElement("h6");
        fulltext.className = "win-h6";
        fulltext.textContent = item.data.text;
        body.appendChild(fulltext);

        return template;
    }

    function interactiveTemplate(item) {
        var template = textWithImageTemplate(item);
        var ratingElement = document.createElement("div");
        template.style.height = "120px";
        template.appendChild(ratingElement);
        new WinJS.UI.Rating(ratingElement, {
            averageRating: 2,
            maxRating: 4
        });
        return template;
    }

    function textHeaderTemplate(item) {
        var template = document.createElement("div");
        template.className = "listLayoutHeaderTemplate";
        template.style.overflow = "hidden";

        var title = document.createElement("div");
        title.className = "titleDiv"
        title.textContent =  item.key;
        template.appendChild(title);
        return template;
    }

    function textWithImageHeaderTemplate(item) {
        var template = textHeaderTemplate(item);
        var image = document.createElement("img");
        image.src = item.data.picture;
        template.appendChild(image);
        return template;
    }

    function buttonHeaderTemplate(item) {
        var template = textHeaderTemplate(item);
        var button = document.createElement("button");
        button.textContent = "Group " + item.data.title;
        template.appendChild(button);
        return template;
    }

    function interactiveHeaderTemplate(item) {
        var template = textHeaderTemplate(item);
        var ratingElement = document.createElement("div");
        new WinJS.UI.Rating(ratingElement, {
            averageRating: 1.2
        });

        template.appendChild(ratingElement);

        return template;
    }

    WinJS.Namespace.define("Templates", {
        textWithImageTemplate: textWithImageTemplate,
        imageTemplate: imageTemplate,
        textHeaderTemplate: textHeaderTemplate,
        interactiveTemplate: interactiveTemplate,
        textWithImageHeaderTemplate: textWithImageHeaderTemplate,
        buttonHeaderTemplate: buttonHeaderTemplate,
        interactiveHeaderTemplate: interactiveHeaderTemplate
    });


})();