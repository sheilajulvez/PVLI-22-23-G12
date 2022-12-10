/*
  Escena que carga todos los archivos necesarios para el juego
 */
export default class Inicio extends Phaser.Scene {

	constructor() {
	  super({ key: 'inicio' });
	}
	
	preload() {
	/*
	  creaccion de la barra de carga
	 */
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0xefbb43, 0.8);
		progressBox.fillRect(340, 270, 320, 50);
		this.load.on('progress', function (value) {
		percentText.setText(parseInt(value * 100) + '%');
		progressBar.clear();
		progressBar.fillRect(350, 280, 300 * value, 35);
	  });
  
	  //IMAGENES
	  	this.load.setPath('assets/');
	  	//fondo menu
		this.load.image("fondoIni","ini.png");
		//boton de play
		this.load.image("start_button","Play.png");
		//wenge 
		this.load.spritesheet('Wenge', 'wengeSprite.png', {frameWidth: 633, frameHeight:394});
		//imagen de vida
		this.load.image('Life', 'vidas.png');
		//carretera
		this.load.spritesheet('road', 'carretera.png', {frameWidth: 700, frameHeight:490});
		//arboles
		this.load.spritesheet('FondoMove', 'arbol.png', {frameWidth:128 , frameHeight:	120	});	
		//moto
		this.load.spritesheet('Bike','Moto.png',{frameWidth:166 , frameHeight:490});
		//coche
		this.load.spritesheet('Car', 'BlueCar.png', {frameWidth:200 , frameHeight:280});
		//Van
		this.load.spritesheet('Van', 'WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
		//ambulacia
		this.load.spritesheet('Ambulance','ambulance.png',{frameWidth:166 , frameHeight:	233	});
		//aviso
		this.load.image('danger','danger.png');
		//explosiones
		this.load.spritesheet('Explosion','explosion.png',{frameWidth:650, frameHeight:	600});
		//creas la mascara
		this.load.image('mask', 'mask.png');
		this.load.image('noche', 'noche.png');

	  //TIENDA
		this.load.setPath('assets/tienda/');
		//wenge en la tienda
		this.load.spritesheet('Wenge_motomami', 'wengeSprite_motomami.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Wenge_daltonismo', 'wengeSprite_daltonica.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Wenge_nuevacoleccion', 'wengeSprite_nuevacoleccion.png', {frameWidth: 633, frameHeight:394});
		
	  //AUDIO
		this.load.setPath('assets/sounds/');
		this.load.audio('dash', 'fium.mp3');
		this.load.audio('skate1','skate1.mp3');
		this.load.audio('skate2','skate2.mp3');
		this.load.audio('skate3','skate3.mp3');
		this.load.audio("click", 'click.mp3');
		this.load.audio('musiquita','videoplayback.mp3');
		this.load.audio('pitido1','pitido1.mp3');
		this.load.audio('explosionSound','explosion.mp3');

	



		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2 - 75,
			y: height / 2 - 50,
			text: 'Cargando',
			style: {
			  font: '20px monospace',
			  fill: '#ffffff'
			}
		  });
  
	  var percentText = this.make.text({
		x: width / 2,
		y: height / 2 - 5,
		text: '0%',
		style: {
		  font: '18px monospace',
		  fill: '#ffffff'
		}
	  });
	  percentText.setOrigin(0.5, 0);
  
  
	}
  
  
	createAnims() {

	  //Wenge
	  this.anims.create({
		key: 'StrongEnemyIzq',
		frames: this.anims.generateFrameNumbers('StrongEnemyIzq', { start: 0, end: 8 }),
		frameRate: 10,
		repeat: -1
	  });
  
  
	}
	/*
	Creaccion de las animaciones y carga del menu
	 */
	create() {
	  this.createAnims();
	  this.scene.start('menu');
	}
  }