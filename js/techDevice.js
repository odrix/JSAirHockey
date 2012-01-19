function getMousePos(canvas, evt) {
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }

    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return mousePos = {
        x: mouseX,
        y: mouseY
    };
}

function getMouseCoords(event) {
    if (event != null && event.targetTouches != null && event.targetTouches.length == 1) {
        event = event.targetTouches[0];
    }
    if (event == null) {
        event = window.event;
    }
    if (event == null) {
        return null;
    }
    if (event.pageX || event.pageY) {
        return { x: event.pageX / scaleFactor, y: event.pageY / scaleFactor };
    }
    return null;
}

function onStart(event) {
    var mouseCoords;
    if (stopped == true) {
        return;
    }
    mouseCoords = getMouseCoords(event);
    if (mouseCoords == null) {
        return;
    }
    selectOffset = joueur.essayerAttraper(mouseCoords.x, mouseCoords.y);
}

function onEnd(event) {
    joueur.lacher();
    selectOffset = null;
}
function onMove(event) {
    var mouseCoords;

    if (stopped == true) {
        return;
    }
    if (selectOffset == null) {
        return;
    }
    mouseCoords = getMouseCoords(event);
    if (mouseCoords == null) {
        return;
    }
    joueur.bouger(mouseCoords.x - selectOffset.x, mouseCoords.y - selectOffset.y);

    savedMouseCoords = mouseCoords;
}