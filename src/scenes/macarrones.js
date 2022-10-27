import FondoMove from '../characters/FondoMove.js'; //importamos las distintas casas del fondo
import Car from '../characters/Car.js';//importamos a los Coches
import Van from '../characters/Van.js';
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
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
	}

	create(){
		super.create();
		new Car(this, 600, 100); //creamos a nuestro personaje, nuestra Car
		new Van(this,500,100);
		//creamos los arboles del fondo y ponemos su posición en pantalla
		let arb=Phaser.Math.Between(0, 7);
		new FondoMove(this, 950,0, arb );
		new FondoMove(this, 950,200, arb); 
		new FondoMove(this, 950,400, arb);
		new FondoMove(this, 950,600, arb);
		new FondoMove(this, 60,-100, arb );
		new FondoMove(this, 60,100, arb); 
		new FondoMove(this, 60,300, arb);
		new FondoMove(this, 60,500, arb);
	}
}