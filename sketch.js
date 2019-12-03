//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raio = diametro / 2;
//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
//placar do jogo
let pontosOponente = 0;
let meusPontos = 0;
//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
	trilha = loadSound("trilha.mp3");
	ponto = loadSound("ponto.mp3");
	raquetada = loadSound("raquetada.mp3");
}

function setup() {
	createCanvas(600, 400);
	trilha.loop();
}

function draw() {
	background(0);
	mostraBolinha();
	movimentaBolinha();
	verificaColisaoBorda();
	mostraRaquete(xRaquete, yRaquete);
	movimentaRaquete();
	verificaColisaoRaquete();
	mostraRaquete(xRaqueteOponente, yRaqueteOponente);
	movimentaRaqueteOponente();	
	verificaColisaoRaqueteOponente();
	mostraPlacar();
	marcaPontos();
}

function mostraBolinha() {
	ellipse(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
	xBolinha += velocidadeXBolinha;
	yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
	if(xBolinha + raio > width || xBolinha - raio < 0) {
		velocidadeXBolinha *= -1;
	}

	if(yBolinha + raio > height || yBolinha - raio < 0) {
		velocidadeYBolinha *= -1;
	}
}

function mostraRaquete(x, y) {
	rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete() {
	if(keyIsDown(UP_ARROW)) {
		yRaquete -= 10;
	}
	if(keyIsDown(DOWN_ARROW)) {
		yRaquete += 10;
	}
}

function verificaColisaoRaquete() {
	if(xBolinha - raio < xRaquete + raqueteComprimento
		 && yBolinha - raio < yRaquete + raqueteAltura 
		 && yBolinha + raio > yRaquete) {
			 velocidadeXBolinha *= -1;
			 raquetada.play();
		 }
}

function movimentaRaqueteOponente() {
	velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
	yRaqueteOponente += velocidadeYOponente;
}

function verificaColisaoRaqueteOponente() {
	if(xBolinha + raio > xRaqueteOponente + raqueteComprimento
		 && yBolinha - raio < yRaqueteOponente + raqueteAltura 
		 && yBolinha + raio > yRaqueteOponente) {
			 velocidadeXBolinha *= -1;
			 raquetada.play();
		 }
}

function mostraPlacar() {
	stroke(255);
	textAlign(CENTER);
	textSize(16);
	fill(10, 20, 40);
	rect(180, 10, 40, 20);
	fill(255);
	text(meusPontos, 200, 26);
	fill(10, 20, 40);
	rect(380, 10, 40, 20);
	fill(255);
	text(pontosOponente, 400, 26);
}

function marcaPontos() {
	if(xBolinha > 590) {
		meusPontos += 1;
		ponto.play();
	}
	if(xBolinha < 10) {
		pontosOponente += 1;
		ponto.play();
	}
}
