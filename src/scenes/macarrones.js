import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge
import Car from '../characters/Car.js';//importamos a los Coches 
//import wenge

export default class Macarrones extends Phaser.Scene { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super({key: 'tomatico'}) 
	}

	init(){ // inicializar, se ejecuta cada vez que reiniciamos o iniciamos por primera vez
		this.life=0;
	}

	preload(){
		// Cargamos el Spritesheet								//indicamos el alto y alto de todas las imágenes dentro del Spritesheet
		this.load.image("fondo","assets/Road.png");
		this.load.spritesheet('Wenge', 'assets/wengeSprite.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		// Cargamos el Atlas (el atlas está compuesto por un archivo de imagen y un JSON que describe lo que contiene)
		//this.load.atlas('seaAnimals', 'assets/Sea/seacreatures.png', 'assets/Sea/seacreatures.json')


	}

	create(){


		//var s=this.add.sprite(0, 0, 'fondo').setOrigin(0,0);
		//s.setScale(4.3,3.1);
		this.add.image(500,350,'fondo');
		new Wenge(this, 400, 600); //creamos a nuestro personaje, nuestra Wenge
		new Car(this, 600, 100); //creamos a nuestro personaje, nuestra Car
		this.lifetext=this.add.text (900,650,'LIFE: 0', {
			fontsize: '20px',
			fill:'#fff',
			fontFamily:'verdana,arial, sans-serif'


		});
		//new SeaAnimals(this, 200, 200);
	}
}