import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge
import FondoMove from '../characters/FondoMove.js'; //importamos las distintas casas del fondo

export default class Generical extends Phaser.Scene { //creamos la escena exportada/extendida de Phaser
	constructor(nameScene){
		super({key: nameScene}); 
	}

	init(){ // inicializar, se ejecuta cada vez que reiniciamos o iniciamos por primera vez
		this.life=0;
	}	  
	 update(time, delta) {    
		  let x = Math.random() * this.game.config.width 
		  let y = 0
		  this.pool.spawn(x, y);
	  }



	preload(){
		// Cargamos el Spritesheet					
		this.load.image('fondo','assets/Road.jpg');
        this.load.spritesheet('Wenge', 'assets/wengeSprite.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('FondoMove', 'assets/arbol.png', {frameWidth:	128 , frameHeight:	120	});
	
	}

	create(){
		this.add.image(500,350,'fondo');
			this.lifetext=this.add.text (900,650,'LIFE: 3', {
			fontsize: '20px',
			fill:'#fff',
			fontFamily:'verdana,arial, sans-serif'
		});
		let arbol = [];
		for (let i = 0; i < 100; i++) {
		arbol.push(new FondoMove(this, 0,0));
		}
		 new Pool(this, FondoMove);
        new Wenge(this, 400, 600); //creamos a nuestro personaje, nuestra Wenge
		new FondoMove(this, 950,200, 1); 
	}
}