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
		this.load.spritesheet('Ambulance','ambulance.png',{frameWidth:160 , frameHeight:	233	});
		//aviso
		this.load.image('danger','danger.png');
		//explosiones
		this.load.spritesheet('Explosion','explosion.png',{frameWidth:650, frameHeight:	600});
		// dialogos
		this.load.image("Wengecara", 'wengeCara.png');
		//rosi 
		this.load.image("Rosi",'rosalia.png');
		this.load.image("Presi","presi.png");
		this.load.image("PatryRuncha","PatryRuncha.png");
		
		this.load.image("cajita","cajastexto/guardate.png");
		this.load.image("fondo_soleado","Daytime_Background_1024x800.png");
		this.load.image("fondo_noche","dark background.png");
		this.load.image("jefa_wenge","jefa_de_Wenge.png");
		this.load.image("Sheila","Sheila.png");
		this.load.image("Twitero","twitero.png");
		this.load.image("Texto_Wenge","cajastexto/texto_wenge.png");
		
		//creas la mascara
		this.load.image('mask', 'mask.png');
		this.load.image('noche', 'noche.png');
		//ESCENA FINAL
		this.load.setPath('assets/escena_fin/');
		this.load.image("pregunta","darle_la_manzanilla.png");
        this.load.image("SI","SI.png");
        this.load.image("NO","NO.png");
        this.load.image("si_se_la_das","creitos_si.png");
        this.load.image("no_se_la_das","creaditos_no.png");

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
		this.load.audio('hitSound','hitSound.mp3');
	  	this.load.audio('musica1','cancion1.mp3');
		this.load.audio('musica2','cancion2.mp3');
		this.load.audio('musica3','cancion3.mp3');
		this.load.audio('musica4','cancion4.mp3');
		this.load.audio('musica5','cancion5.mp3');
		this.load.audio("click", 'click.mp3');
		this.load.audio("talking1",'talking1.mp3');
		this.load.audio("talking2",'talking2.mp3');
		this.load.audio("talking3",'talking3.mp3');
		this.load.audio("talking4",'talking4.mp3');
		this.load.audio("talking5",'talking5.mp3');
		this.load.audio("talking6",'talking6.mp3');
		this.load.audio("talking7",'talking7.mp3');


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
	  this.anims.create({ //animación
		key: 'idle_Wenge', //identificador de la animación
		frames: this.anims.generateFrameNumbers('Wenge', 
		{
			start:0, // primera imagen del Spritesheet que se ejecuta en la animación
			end:37 // última imagen del Spritesheet que se ejecuta en la animación
		}), 
		frameRate: 60, // imágenes/frames por segundo
		repeat: -1 //para que sea bucle
		})
		this.anims.create({
			key: 'Wenge_motomami', //identificador de la animación
			frames: this.anims.generateFrameNumbers('Wenge_motomami', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:37 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 60, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
		})
		this.anims.create({
			key: 'Wenge_daltonismo', //identificador de la animación
			frames: this.anims.generateFrameNumbers('Wenge_daltonismo', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:37 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 60, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
		})
		this.anims.create({
			key: 'Wenge_nuevacoleccion', //identificador de la animación
			frames: this.anims.generateFrameNumbers('Wenge_nuevacoleccion', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:37 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 60, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
		})
		this.anims.create({ //animación
			key: 'idle_Explosion', //identificador de la animación
			frames: this.anims.generateFrameNumbers('Explosion', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:3 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 4, // imágenes/frames por segundo
			repeat: 0 //para que sea bucle
		});
		this.anims.create({ //animación
			key: 'idle_WhiteCar', //identificador de la animación
			frames: this.anims.generateFrameNumbers('Van',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
            
		});
		this.anims.create({ //animación
			key: 'idle_BlueCar', //identificador de la animación
			frames: this.anims.generateFrameNumbers('Car',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle

		});
		this.anims.create({ //animación
			key: 'idle_Ambulance', //identificador de la animación
			frames: this.anims.generateFrameNumbers('Ambulance',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
            
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