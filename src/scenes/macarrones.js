import FondoMove from '../characters/FondoMove.js'; //importamos las distintas casas del fondo
import Car from '../characters/Car.js';//importamos a los Coches
import Generical from '../scenes/generical.js';

export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super({key: 'tomatico'}) 
	}

	preload(){
		super.preload();
		
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('FondoMove', 'assets/arbol.png', {frameWidth:	256 , frameHeight:	240	});
		
	}

	create(){
		super.create();
		new Car(this, 600, 100); //creamos a nuestro personaje, nuestra Car
	}
}