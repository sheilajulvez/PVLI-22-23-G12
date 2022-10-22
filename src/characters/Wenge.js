export default class Wenge extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Wenge');

		this.scene.add.existing(this);

		this.scene.anims.create({ //animación
			key: 'idle_Wenge', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Wenge', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:37 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 60, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
		});

		
		this.play('idle_Wenge'); //activa la animavcion

		this.setScale(1,1);
		this.d = this.scene.input.keyboard.addKey('D'); // registramos la tecla D como input
		this.a = this.scene.input.keyboard.addKey('A'); // registramos la tecla A como input
	}
	
   
	preUpdate(t, dt){
		super.preUpdate(t, dt);

		//movimiento de WENGE
        if(this.d.isDown)
        {
            this.x+=(4*dt)/100;
        }
		if(this.a.isDown)
        {
            this.x-=(4*dt)/100;
        }
        
	}

}