export default class Wenge extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Wenge');
		//this.player = this.add.sprite(x, y, 'Wenge');
		

		//this.player=this.physics.add.existing(this);
		this.scene.add.existing(this);
		//this.physics.add.existing(this);

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

		this.setScale(0.35,0.35);
		this.d = this.scene.input.keyboard.addKey('D'); // registramos la tecla D como input
		this.a = this.scene.input.keyboard.addKey('A'); // registramos la tecla A como input
	}
	
   
	preUpdate(t, dt){
		super.preUpdate(t, dt);


		//movimiento de WENGE
		//
		// no se podria poner cuando esto no colisionara con las paredes como !this.body.setCollideWorldBounds()
		if(this.x<800 && this.x>100)
		{
			if(this.d.isDown)
			{
				//this.x+=(50*dt)/100;
				this.body.setVelocity(1,0);
			}
			if(this.a.isDown)
			{
				//this.x-=(50*dt)/100;
				this.body.setVelocity(-1,0);
			}
		}
		else if(this.x<=100)
		{
			if(this.d.isDown)
			{
				//this.x+=(50*dt)/100;
				this.body.setVelocity(1,0);
			}
		}
		else if(this.x>=800)
		{
			if(this.a.isDown)
			{
				//this.x-=(50*dt)/100;
				this.body.setVelocity(-1,0);
			}
		}
        
        
	}

}