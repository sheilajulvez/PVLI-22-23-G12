import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge
import Car from '../characters/Car.js';//importamos a los Coches
import Generical from '../scenes/generical.js';

export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super({key: 'tomatico'}) 
	}

	preload(){
		super.preload();
		this.load.spritesheet('Wenge', 'assets/wengeSprite.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		
	}

	create(){
		super.create();
		new Wenge(this, 400, 600); //creamos a nuestro personaje, nuestra Wenge
		new Car(this, 600, 100); //creamos a nuestro personaje, nuestra Car
	}
}