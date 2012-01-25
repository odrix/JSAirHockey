var io = require('socket.io').listen(80);

jeu = function() {
	this.joueur1 = null;
	this.joueur2 = null;

}

function connection(socket){
	association(socket);
	if(jeu.joueur1 !== null && jeu.joueur2 !== null) {
		eventJeu();
	}
}

function association(socket) {
	if(jeu.joueur1 === null){
		jeu.joueur1 = socket;
	} else if(jeu.joueur2 === null){
		jeu.joueur2 = socket;
	}
}

function eventJeu() {
	jeu.joueur1.on('Bouge', function(data) {
		jeu.joueur2.emit('BougerSeul', data);
	});
	jeu.joueur2.on('Bouge', function(data) {
		jeu.joueur1.emit('BougerSeul', data);
	});
	jeu.joueur1.on('PaletChange', function(data) {
		jeu.joueur2.emit('ChangerPalet', data);
	});
	jeu.joueur2.on('PaletChange', function(data) {
		jeu.joueur1.emit('ChangerPalet', data);
	});
}

io.sockets.on('connection', connection(socket));

