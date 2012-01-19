function palet(initX, initY, taille) {
    this.taille = taille;
    this.x = initX;
    this.y = initY;
    this.force = 0;
    this.vx = 0;
    this.vy = 0;
}

palet.prototype.dessine = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.taille, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

palet.prototype.bouger = function(x, y) {
    this.x = x;
    this.y = y;
}

palet.prototype.bougerSeul = function() {
    if (this.force > 0) {
        this.bouger(this.x + this.vx * this.force / 6, this.y + this.vy * this.force / 6);
        this.force -= 1;
    }
}

palet.prototype.bougera = function(angle, force) {
    this.force = force;
    this.vx = Math.cos(angle);
    this.vy = Math.sin(angle);
    writeInConsole("angle: " + angle + " - force: " + force);
}

palet.prototype.rebondirHorizontal = function() {
    this.vy = -1 * this.vy;
}

palet.prototype.rebondirVertical = function() {
    this.vx = -1 * this.vx;
}