(function () {

    var GitHubIssueLink = WinJS.Class.define(function () {
        this._link = document.querySelector(".gitHubIssueOpener").querySelector("a");
        this._config = {};

        // Retrieve ListView configuration
        var cb = document.querySelector(".controlBoxArea");
        var tables = cb.querySelectorAll(".controlBox");
        
        for (var i = 0, len = tables.length; i < len ; i++) {
            var rows = tables[i].rows;
            for (var j = 0, length = rows.length; j < length; j++) {
                if( !rows[j].querySelector(".controlBoxLabel")) {
                    continue;
                }
                var label = rows[j].querySelector(".controlBoxLabel").textContent;
                var selector = rows[j].querySelector(".controlBoxSelector");
                if (selector.selectedIndex >= 0) {
                    var value = selector.options[selector.selectedIndex].textContent;
                    this._config[label] = value;
                }
            }
        }

        this._link.href = this.getOpenIssueHref();
    },
    {
        configToString: function(){
            var url = "";
            for (var label in this._config) {
                url = url + label + ": " + this._config[label] + "\n";
            }
            return url;
        },

        getOpenIssueHref: function(){
            return "https://github.com/winjs/winjs/issues/new?body=Feature:+" + encodeURIComponent("ListView") +
              "%0AEnvironment:+" + encodeURIComponent(navigator.userAgent) + "%0ASource:+http://try.buildwinjs.com%20Play%20With%20ListView%0A" + encodeURIComponent(this.configToString()) + "&title=" + encodeURIComponent("ListView") + ":%20%3Ctitle%20here%3E";
        },

        update: function (label, value) {
            this._config[label] = value;
            this._link.href = this.getOpenIssueHref();
        }
    });

    var issueOpener = null;

    var initGitHubIssueOpener = function(){
        GitHub.issueOpener = GitHub.issueOpener || new GitHubIssueLink();
    }

    WinJS.Namespace.define("GitHub", {
        issueOpener: issueOpener,
        initGitHubIssueOpener: initGitHubIssueOpener
    })

})();