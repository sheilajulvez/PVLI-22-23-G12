
export default class Generical extends Phaser.Scene { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super({key: 'generic'}) 
	}

	init(){ // inicializar, se ejecuta cada vez que reiniciamos o iniciamos por primera vez
		this.life=0;
	}

	preload(){
		// Cargamos el Spritesheet					
		this.load.image("fondo","assets/Road.png");
		
	}

	create(){
		this.add.image(500,350,'fondo');
			this.lifetext=this.add.text (900,650,'LIFE: 3', {
			fontsize: '20px',
			fill:'#fff',
			fontFamily:'verdana,arial, sans-serif'
		});
		
	}
}