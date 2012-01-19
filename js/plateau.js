function but(initx, inity, initWidth, type) {
    this.x = initx;
    this.y = inity;
    this.width = initWidth;
    this.type = type;
}

but.prototype.dessine = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y - 7, this.width, this.y + 7);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y, this.width / 2 + 5, Math.PI, 0, this.type !== 'moi');
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black"; // line color
    ctx.stroke();
}


function environnement (width,height) {
    this.width = width;
    this.height = height;
    this.buts = Array();
    this.score = {moi: 0, adversaire: 0};
}

environnement.prototype.dessine = function() {
    var canvasFond = document.getElementById("plateauFond");

    if (canvasFond.getContext == null) {
        return;
    }
    var ctx = canvasFond.getContext("2d");
    ctx.rect(0, 0, this.width, this.height);
    ctx.moveTo(0, this.height / 2);
    ctx.lineTo(this.width, this.height / 2);
    ctx.arc(this.width / 2, this.height / 2, 86, 0, 2 * Math.PI, false);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();

    this.buts[0].dessine(ctx);
    this.buts[1].dessine(ctx);
}

