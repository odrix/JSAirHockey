function poussoir(initX, initY, taille, limits) {
    this.taille = taille;
    this.x = initX;
    this.y = initY;
    this.attrape = false;
    this.lastPoints = null;
    this.limits = limits || { x: 0, y: 0, width: env.width, height: env.height };
}

poussoir.prototype.dessine = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.taille, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#8ED6FF";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

poussoir.prototype.essayerAttraper = function(x, y) {
    var minDist = 10000.0;
    var aXbX, aYbY, dist, selectOffset;
    aXbX = x - this.x;
    aYbY = y - this.y;
    dist = Math.sqrt(aXbX * aXbX + aYbY * aYbY);
    if (dist < this.taille + 5) {
        this.attrape = true;
        selectOffset = { x: aXbX, y: aYbY };
    }
    return selectOffset;
}

poussoir.prototype.lacher = function() {
    this.attrape = false;
}

poussoir.prototype.bouger = function(x, y) {
    if (x - this.taille >= this.limits.x && x <= this.limits.width + this.limits.x - this.taille && y - this.taille >= this.limits.y && y <= this.limits.height + this.limits.y - this.taille) {
        this.x = x;
        this.y = y;
	socket.emit('Bouge', {x: x, y: y});
        if (this.lastPoints == null)
            this.lastPoints = new Array();
        this.lastPoints.push({ x: this.x, y: this.y });
    }
}

// pour le retour du serveur: affichage en mirroir
poussoir.prototype.bougerSeul = function(x, y) {
	this.x = env.width - x;
	this.y = env.height - y;
}
