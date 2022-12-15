import FondoMove from '../characters/FondoMove.js'; 			//importamos las distintas ARBOLES del fondo
import Barra from '../characters/Bar.js';						//importamos la clase bar que indicará por donde va el nivel BARRA;
import road from '../scenes/road.js'; 							//CARRETERA
import Economy from "../components/Economy.js"
import Ambulance from '../characters/Vehiculos/Ambulance.js';
import Explosion from "../characters/explosion.js";
import Danger from '../characters/Danger.js';

//CREAMOS FONDO, ARBOLES Y BARRA
export default class Generical extends Phaser.Scene {			 //creamos la escena exportada/extendida de Phaser
	constructor(nameScene){
		super({key: nameScene});	
		this.ambulanceCont=0;									//contador de aparación de la ambulancia
		this.money=new Economy(this);							//creamos nuestro script del dinero
		this.exp=false;											//booleano para saber si ha habido o no explosión 
	}
	Inicia(scene){									
		this.relatedScene=scene;					
	}
	
	update() {
		this.Barra.aumenta(10);										//aumenta la barra dependiendo del parámetro que reciba
		this.player.update();										//llamamos al update del player
	}

	create(){
		//añadimos los graficos para la barra
		this.add.image(500,350,'fondo');
		
		//grupo de tipo fondoMove
		new road(this,500,400);										//creamos la carretera, la cual es un sprite con una animación
		this.Arboles=this.add.group();
		for (let i = 0; i < 4; i++) {
		this.Arboles.add (new FondoMove(this, 20,200*i));			//creamos los árboles tanto de la izquierda ocmo la derecha
		}
		for (let i = 0; i < 4; i++) {
			this.Arboles.add (new FondoMove(this, 950,200*i));
		}
		

		this.Barra = new Barra(this, 10, 10);						//creamos la barra de progreso 
		
	}
	Explosiones(obj1,obj2){
		this.createExplosion(obj1.body.center.x,obj2.body.center.y);										//creamos la explosión tomando como lugar de referencia los dos vehículos que chocan
		if(this.explosionSound!=null|| this.explosionSound!=undefined) 	this.explosionSound.play();			//nos aseguramos de que la explosión no es nula
	
	}	
	createExplosion(x,y)
	{
		this.explosion=new Explosion(this,x,y);																//creamos la explosión
		this.exp=true;
    }	
    newdanger(scene,vehicleX){																				//método para crear la señal de peligro
		new Danger(scene,vehicleX-100,0).setOrigin(0,0).setScale(0.5,0.7);
    }
}