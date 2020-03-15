
var delayValue = 10000

function onInactive(cb){
    var wait = setTimeout(cb, delayValue); 
    document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function(){
        clearTimeout(wait);
        wait = setTimeout(cb, delayValue);
    };
}