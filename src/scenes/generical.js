import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge
import FondoMove from '../characters/FondoMove.js'; //importamos las distintas casas del fondo
import Barra from '../characters/Bar.js';//importamos la clase bar que indicará por donde va el nivel;
import road from '../scenes/road.js';
import Pool from '../characters/Pool.js';

export default class Generical extends Phaser.Scene { //creamos la escena exportada/extendida de Phaser
	constructor(nameScene){

		super({key: nameScene});

		

	}
	Inicia(scene){
		this.relatedScene=scene;

	}
	init(){ // inicializar, se ejecuta cada vez que reiniciamos o iniciamos por primera vez
		this.life=0;
	}
	update(time, delta) {
		  let x = Math.random() * this.game.config.width
		  let y = 0
			if(this.Barra.aumenta(time/1000)){
				this.relatedScene.scene.start('EscenaHablar');
			}
			//this.Barra.draw();
			this.player.update();
	  }
	
	preload(){
		this.load.spritesheet('road', 'assets/carretera.png', {frameWidth: 700, frameHeight:490});
        this.load.spritesheet('Wenge', 'assets/wengeSprite.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('FondoMove', 'assets/arbol.png', {frameWidth:	128 , frameHeight:	120	});

	}

	create(){
	
		//añadimos los graficos para la barra
		this.add.image(500,350,'fondo');
			this.lifetext=this.add.text (900,650,'LIFE: 3', {
			fontsize: '20px',
			fill:'#fff',
			fontFamily:'verdana,arial, sans-serif'
		});
		let arbol = [];

		//grupo de tipo fondoMove
		new road(this,500,400);
		this.Arboles=this.add.group();
		for (let i = 0; i < 4; i++) {
		this.Arboles.add (new FondoMove(this, 20,200*i));
		}
		for (let i = 0; i < 4; i++) {
			this.Arboles.add (new FondoMove(this, 950,200*i));
			}
     
		
		this.player=new Wenge(this, 400, 600); //creamos a nuestro personaje, nuestra Wenge
		this.add.existing(this.player); //lo añades a la escene
		this.physics.add.existing(this.player);// lo haces objeto físico
		this.Barra = new Barra(this, 10, 10);
	}
}