
import FondoMove from '../characters/FondoMove.js'; //importamos las distintas ARBOLES del fondo
import Barra from '../characters/Bar.js';//importamos la clase bar que indicará por donde va el nivel BARRA;
import road from '../scenes/road.js'; //CARRETERA
import Economy from "../components/Economy.js"
import Ambulance from '../characters/Vehiculos/Ambulance.js';
import Danger from '../characters/Danger.js';

//CREAMOS FONDO, ARBOLES Y BARRA
export default class Generical extends Phaser.Scene { //creamos la escena exportada/extendida de Phaser
	constructor(nameScene){
		super({key: nameScene});
		this.ambulanceCont=0;
		this.money=new Economy(this);
		this.exp=false;
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
	Explosiones(obj1,obj2){
	
		this.createExplosion(obj1.body.center.x,obj2.body.center.y);
		this.explosionSound.play();
		obj1.destroy();
		obj2.destroy();
			
	}
	createExplosion(x,y){
		
		this.explosion=new Explosion(this,x,y);
		this.exp=true;
    }
    newdanger(scene,vehicleX){
		new Danger(scene,vehicleX-100,0).setOrigin(0,0).setScale(0.5,0.7);
    }
	newambulance(scene,vehicleX){
		new Ambulance(scene,vehicleX-10,-335);
	}
}