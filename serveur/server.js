var io = require('socket.io').listen(8080);

// une partie
function jeu() {
	this.joueur1 = null;
	this.joueur2 = null;
}

jeu.prototype.isReady = function() {
	return this.joueur1 !== null && this.joueur2 !== null;
}

// le serveur gere plusieurs partie de air hockey
var jeuList = new Array();

// tentative d'association de joeur entre eux pour faire une partie
function association(socket) {
	var currentJeux = null;
	for(var i=0;i<jeuList.length;i++) {
		if(!jeuList[i].isReady()) {
			currentJeux = jeuList[i];
		}
	}

	if(currentJeux == null) {
		jeuList.push(new jeu());
		currentJeux = jeuList[jeuList.length-1];
		console.log("nouveau jeu");
	}

	if(currentJeux.joueur1 === null){
		currentJeux.joueur1 = socket;
		console.log("socket -> joueur 1");
	} else if(currentJeux.joueur2 === null){
		currentJeux.joueur2 = socket;
		console.log("socket -> joueur 2");
	}
}

// déroulement d'une partie
function eventJeu(currentJeux) {
	currentJeux.joueur1.emit('debutJeu');
	currentJeux.joueur2.emit('debutJeu');
	console.log("début du jeu");
	currentJeux.joueur1.on('Bouge', function(data) {
		currentJeux.joueur2.emit('BougerSeul', data);
	});
	currentJeux.joueur2.on('Bouge', function(data) {
		currentJeux.joueur1.emit('BougerSeul', data);
	});
	currentJeux.joueur1.on('PaletChange', function(data) {
		currentJeux.joueur2.emit('ChangerPalet', data);
	});
	currentJeux.joueur2.on('PaletChange', function(data) {
		currentJeux.joueur1.emit('ChangerPalet', data);
	});
	currentJeux.joueur1.on('disconnect', function() {
		currentJeux.joueur1 = null;
		currentJeux.joueur2.emit('departAdversaire');
	});
	currentJeux.joueur2.on('disconnect', function() {
		currentJeux.joueur2 = null;
		currentJeux.joueur1.emit('departAdversaire');
	});
}

function connection(socket){
	console.log("1 connection");
	association(socket);
	console.log("nombre de jeu en cours : " + jeuList.length);
	if(jeuList.length > 0 && jeuList[jeuList.length-1].isReady()) {
		console.log("jeu ok");
		eventJeu(jeuList[jeuList.length-1]);
	}
}

function deconnection(socket) {
	var deleteIndex = -1;
	for(var i=0;i<jeuList.length;i++) {
		if(jeuList[i].joueur1 === socket) {
			jeuList[i].joueur1 = null;
			jeuList[i].joueur2.emit("departAdversaire");
		}

		if(jeuList[i].joueur2 === socket) {
			jeuList[i].joueur2 = null;
			jeuList[i].joueur1.emit("departAdversaire");
		}

		if(jeuList[i].joueur1 === null && jeuList[i].joueur2 === null) {
			deleteIndex = i;
		}
	}
	if(deleteIndex > -1)
		jeuList.splice(deleteIndex, 1);
}

io.sockets.on('connection', function(socket) {
	connection(socket);
});


