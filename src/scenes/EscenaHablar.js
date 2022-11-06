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
	
	}
	
	/**
	*/
	
	create() {
		
		
		let a=0;
        let array=[
		 'Hola soy tuitero, ¿Qué tal?',
		 'Que ricos los macarrones con tomate',
		 'Gracias por todo'
        ];
		array.length=3;
		let posx=300,posy=300;

		let array2=[this.textButton(posx,posy,array[0],array,0)];
		
		
		//array2[0].setVisible(true);

      	
	}

	
  textButton(x, y, message,array,a,selected=false){
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

            text.setVisible(false);
			if(a<array.length) {
				a++;
				this.textButton(x,y,array[a],a);

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