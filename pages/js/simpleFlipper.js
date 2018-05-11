(function () {
    "use strict";

    // Controls logic for displaying ListView and Documentation together
    // when the screen is large or one at a time if the screen is small
    var SimpleFlipper = WinJS.Class.define(
        function () {
            this._toggle = document.querySelector(".listViewDocumentationToggle");
            this._listView = document.querySelector(".listViewSection");
            this._docs = document.querySelector(".interactiveInfoSection");
            var expansion = "(max-width: 1366px)";
            var justListView = "(max-width: 850px) and (max-height: 599px)"

            this._toggle.addEventListener("click", this._flip.bind(this));

            this._states = {
                BOTH: {
                    visible: [
                        this._docs,
                        this._listView
                    ],
                    hidden: [
                        this._toggle
                    ],
                    toggleText: ""
                },
                DOCS: {
                    visible: [
                        this._docs,
                        this._toggle,
                    ],
                    hidden: [
                        this._listView
                    ],
                    toggleText: "ListView"
                },
                LISTVIEW: {
                    visible: [
                        this._listView,
                        this._toggle,
                    ],
                    hidden: [
                        this._docs
                    ],
                    toggleText: "Documentation",
                    postTransitionEvent: function () {
                        if (this._listView) {
                            this._listView.querySelector(".listView").winControl.forceLayout();
                        }
                    }
                },
                LISTVIEW_NO_FLIP: {
                    visible: [
                        this._listView,
                    ],
                    hidden: [
                        this._toggle,
                        this._docs
                    ],
                    toggleText: ""
                },
                UNINITIALIZED: {
                    visible: [

                    ],
                    hidden: [
                        this._toggle,
                        this._listView,
                        this._docs
                    ],
                    toggleText: ""
                }
            }

            this._state = this._states.UNINITIALIZED;
            this._docs.style.display = "none";
            this._toggle.style.display = "none";
            this._listView.style.display = "none";

            var expansionMQHandler = function () {
                // If we're thinner than threshold width use flipMode.
                // Otherwise, show all controls
                if (expansionMediaQuery.matches) {
                    this.moveState(this._states.LISTVIEW);
                } else {
                    this.moveState(this._states.BOTH);
                }
            }.bind(this);

            var listViewMQHandler = function () {
                if (justListViewMediaQuery.matches) {
                    this.moveState(this._states.LISTVIEW_NO_FLIP);
                } else {
                    this.moveState(this._states.LISTVIEW);
                }
            }.bind(this);

            var expansionMediaQuery = window.matchMedia(expansion);
            expansionMediaQuery.addListener(expansionMQHandler);

            var justListViewMediaQuery = window.matchMedia(justListView);
            justListViewMediaQuery.addListener(listViewMQHandler);

            if (justListViewMediaQuery.matches) {
                this.moveState(this._states.LISTVIEW_NO_FLIP);
            } else if (expansionMediaQuery.matches) {
                this.moveState(this._states.LISTVIEW);
            } else {
                this.moveState(this._states.BOTH);
            }
        },
        {
            moveState: function (nextState) {
                var hide = this._intersect(this._state.visible, nextState.hidden);
                var show = this._intersect(this._state.hidden, nextState.visible);
                var animation;
                for (var i = 0, len = hide.length; i < len; i++) {
                    var elem = hide[i];
                    animation = WinJS.UI.Animation.exitContent(elem, null).then(function () {
                        elem.style.display = "none";
                        elem.hidden = true;
                    });
                }
                if (animation) {
                    animation.then(function () {
                        this._showContent(show, nextState.toggleText);
                        if ("postEvent" in nextState) {
                            nextState.postTransitionEvent();
                        }
                    }.bind(this));
                } else {
                    this._showContent(show, nextState.toggleText);
                    if ("postEvent" in nextState) {
                        nextState.postTransitionEvent();
                    }
                }
                this._state = nextState;
            },

            _showContent: function (show, text) {
                for (var i = 0, len = show.length; i < len; i++) {
					
                    var elem = show[i];
                    elem.style.display = "block";
                    elem.hidden = false;
                    WinJS.UI.Animation.enterContent(elem, null).then(function () {
                    });
                }
                this._toggle.textContent = text;
            },

            _intersect: function (array1, array2) {
                var intersection = [];
                for (var i = 0, len = array1.length; i < len; i++) {
                    var elem = array1[i];
                    if (array2.indexOf(elem) !== -1) {
                        intersection.push(elem);
                    }
                }
                return intersection;
            },

            _flip: function () {
                if (this._state === this._states.LISTVIEW) {
                    this.moveState(this._states.DOCS);
                } else {
                    this.moveState(this._states.LISTVIEW);
                }
            },

            inListViewMode: function () {
                return (this._state === this._states.LISTVIEW);
            }
        }
    );

    var flipper = null;

    var initFlipper = function(){
        ExpandingFlipper.flipper = ExpandingFlipper.flipper || new SimpleFlipper();
    }

    WinJS.Namespace.define("ExpandingFlipper", {
        flipper: flipper,
        initFlipper: initFlipper
    });

})();