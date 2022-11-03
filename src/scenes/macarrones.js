
import Car from '../characters/Car.js';//importamos a los Coches
import Generical from '../scenes/generical.js';
import Van from '../characters/Van.js';

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
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
	}

	create(){
		super.create();
		new Car(this, 600, 100); //creamos a nuestro personaje, nuestra Car
		new Van(this,500,100);
		//creamos los arboles del fondo y ponemos su posición en pantalla
		let arb=Phaser.Math.Between(0, 7);
	}
}