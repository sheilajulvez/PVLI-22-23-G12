/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
 export default class EscenaHablar extends Phaser.Scene {
	/**
	 * Escena de texto cargado con fuentes del navegador.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'EscenaHablar' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 * En este caso solo el fonde
	 */
	preload(){
		this.load.image("Rosalia","assets/Rosalia.png");
		this.load.image("Wengeface","assets/wengeCara.png")
	}
	
	/**
	*/
	
	create() {
		
		this.add.image(300,350,'Rosalia');
		this.add.image(800,270,'Wengeface').setScale(1,1);
		let a=0;
        let array=[
		 '1-Hola soy tuitero, ¿Qué tal?',
		 '2-Que ricos los macarrones con tomate',
		 '3-Gracias por todo'
        ];
		let posx=300,posy=600;

		let array2=[this.textButton(posx,posy,array[0],array,0)];
		
		
		//array2[0].setVisible(true);

      	
	}

	
  textButton(x, y, message, array,a,selected=false){
		let text = this.add.text(x, y, message);
		text.setOrigin(0.5,0.5);
		text.setAlign('center');
		text.setVisible(true);
		text.setFont('Arial Black');
		text.setFontSize(40);
		
		//Color del reborde de la letra y grosor si estamos en la escena con ese tipo de texto.
		if(selected){
			text.setStroke('#FF00FF', 4)
			text.setFill('#43d6FF');
			text.setShadow(10, 10, 'rgba(0,0,0,0.5)', 1);
		}

		text.setInteractive();
		text.on('pointerdown', ()=>{

            //text.setVisible(false);
			if(a<array.length) {
				a++;
				text.setText(array[a]);

			}
			
		})
       
		/*
		Si movemos la cámara es necesario hacer setScrollFactor para evitar que el texto se mueva con ella
		Puedes probarlo descomentando las siguientes líneas:
		*/
		
		// this.cameras.main.pan(300, 300);
		// text.setScrollFactor(0,0)
	}

}