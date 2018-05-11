
function on_click_1_1(target,config) { 
    $('.gridster').find('#1').addClass('bk_');
}

function on_click_time_1_1(target, config,time) {
    $('.gridster').find('#1').addClass('bk_');

    setTimeout(function () { $('.gridster').find('#1').removeClass('bk_'); }, time);
}