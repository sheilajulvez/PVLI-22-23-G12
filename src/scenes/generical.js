import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge
export default class Generical extends Phaser.Scene { //creamos la escena exportada/extendida de Phaser
	constructor(nameScene){
		super({key: nameScene}); 
	}

	init(){ // inicializar, se ejecuta cada vez que reiniciamos o iniciamos por primera vez
		this.life=0;
	}

	preload(){
		// Cargamos el Spritesheet					
		this.load.image('fondo','assets/Road.jpg');
        this.load.spritesheet('Wenge', 'assets/wengeSprite.png', {frameWidth: 633, frameHeight:394});
	
	
	}

	create(){
		this.add.image(500,350,'fondo');
			this.lifetext=this.add.text (900,650,'LIFE: 3', {
			fontsize: '20px',
			fill:'#fff',
			fontFamily:'verdana,arial, sans-serif'
		});
        new Wenge(this, 400, 600); //creamos a nuestro personaje, nuestra Wenge
		
	}
}