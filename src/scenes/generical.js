
import FondoMove from '../characters/FondoMove.js'; //importamos las distintas ARBOLES del fondo
import Barra from '../characters/Bar.js';//importamos la clase bar que indicará por donde va el nivel BARRA;
import road from '../scenes/road.js'; //CARRETERA


//CREAMOS FONDO, ARBOLES Y BARRA
export default class Generical extends Phaser.Scene { //creamos la escena exportada/extendida de Phaser
	constructor(nameScene){
		super({key: nameScene});
	}
	Inicia(scene){
		this.relatedScene=scene;
	}
	
	update() {
		
		let x = Math.random() * this.game.config.width
		let y = 0
		this.Barra.aumenta(10);
		this.player.update();
	}
	
	preload(){
		//carretera
		this.load.spritesheet('road', 'assets/carretera.png', {frameWidth: 700, frameHeight:490});
		//arboles
		this.load.spritesheet('FondoMove', 'assets/arbol.png', {frameWidth:	128 , frameHeight:	120	});	

	}

	create(){
	
		const config =
		{
			mute: false,
 			volume: 0.1,
 		 	rate: 1,
			detune: 0,
 			seek: 0,
 			loop: false,
 			delay: 0,
		}

		//añadimos los graficos para la barra
		this.add.image(500,350,'fondo');
		
		//grupo de tipo fondoMove
		new road(this,500,400);
		this.Arboles=this.add.group();
		for (let i = 0; i < 4; i++) {
		this.Arboles.add (new FondoMove(this, 20,200*i));
		}
		for (let i = 0; i < 4; i++) {
			this.Arboles.add (new FondoMove(this, 950,200*i));
		}
		//this.player.body.updateBounds();
		this.Barra = new Barra(this, 10, 10);
		
	}
}