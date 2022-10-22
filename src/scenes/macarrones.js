import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge
//import SeaAnimals from '../characters/seaanimals.js'
//import wenge

export default class Macarrones extends Phaser.Scene { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super({key: 'tomatico'}) 
	}

	preload(){
		// Cargamos el Spritesheet								//indicamos el alto y alto de todas las imágenes dentro del Spritesheet
		this.load.spritesheet('Wenge', 'assets/wengeSprite.png', {frameWidth: 633, frameHeight:394});

		// Cargamos el Atlas (el atlas está compuesto por un archivo de imagen y un JSON que describe lo que contiene)
		//this.load.atlas('seaAnimals', 'assets/Sea/seacreatures.png', 'assets/Sea/seacreatures.json')
	}

	create(){
		new Wenge(this, 400, 100); //creamos a nuestro personaje, nuestra Wenge
		//new SeaAnimals(this, 200, 200);
	}
}