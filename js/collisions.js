

function collisionPaletpoussoir(frap, pal) {
    var AxBx, AyBy, dist, p1, p2, i, pTest, ecartAutorise, angle;
    ecartAutorise = 30;
    AxBx = pal.x - frap.x;
    AyBy = pal.y - frap.y;
    dist = Math.sqrt(AxBx * AxBx + AyBy * AyBy);
    if (dist <= frap.taille + pal.taille) {
	    if(frap.lastPoints != null && frap.lastPoints.length > 20) {
		// il y'a bien colision
		p1 = frap.lastPoints[frap.lastPoints.length - 1];
		p2 = frap.lastPoints[frap.lastPoints.length - 10];
		angle = Math.atan2(p1.y - p2.y, p1.x - p2.x);
		pal.bougera(angle, 80);
		frap.lastPoints = null;
		return true;
	} else {
		pal.rebondirHorizontal();
		pal.rebondirVertical();
	}
    }
    return false;
}

function collisionPaletBut(pal, buts) {
    var i = 0;
    for (i = 0; i < buts.length; i++) {
        if (pal.x - pal.taille > buts[i].x && pal.x + pal.taille < buts[i].x + buts[i].width &&
            ((pal.y > buts[i].y && pal.y - pal.taille < buts[i].y) ||
            (pal.y < buts[i].y && pal.y + pal.taille > buts[i].y))) {
            writeInConsole("colision but/palet : " + pal.x + " - " + pal.y + " - " + pal.taille +" :: " + buts[i].x + " - " + buts[i].y);
            return buts[i];
        }
    }
    return false;
}

function collisionPaletEnv(pal, env) {
    var rebond = false;
    if (pal.x - pal.taille < 0 || pal.x + pal.taille > env.width) {
        pal.rebondirVertical();
        rebond = true;
    }

    if (pal.y - pal.taille < 0 || pal.y + pal.taille > env.height) {
        pal.rebondirHorizontal();
        rebond = true;
    }
    return rebond;
}
