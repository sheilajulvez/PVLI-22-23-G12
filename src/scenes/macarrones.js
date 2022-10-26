import FondoMove from '../characters/FondoMove.js'; //importamos las distintas casas del fondo
import Car from '../characters/Car.js';//importamos a los Coches
import Generical from '../scenes/generical.js';
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
	
}
export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('tomatico') 
	}

	preload(){
		super.preload();
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('FondoMove', 'assets/arbol.png', {frameWidth:	128 , frameHeight:	120	});
	}

	create(){
		super.create();
		new Car(this, 600, 100); //creamos a nuestro personaje, nuestra Car
		//creamos los arboles del fondo y ponemos su posición en pantalla
		let arb=Phaser.Math.Between(0, 7);
		new FondoMove(this, 1000,0, arb );
		 arb=Phaser.Math.Between(0, 7);
		new FondoMove(this, 1000,200, arb);
		 arb=random(0,7);
		new FondoMove(this, 1000,400, arb);
		 arb=random(0,7);
		new FondoMove(this, 1000,600, arb);
	}
}