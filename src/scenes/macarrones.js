
import Car from '../characters/Car.js';//importamos a los Coches
import Generical from '../scenes/generical.js';
import Van from '../characters/Van.js';


export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('tomatico') 
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
	}

	create(){
		super.create();
		let vehicles=this.add.group();

		let car=new Car(this, 600, 100); //creamos a nuestro personaje, nuestra Car
		vehicles.add(car);
		

		let van=new Van(this,500,100);
		vehicles.add(van);
		
	}
}