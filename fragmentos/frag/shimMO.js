function nop() { }
if (!window.MutationObserver) {
    window.MutationObserver = function () {
        this.observe = nop;
        this.disconnect = nop;
    };
}