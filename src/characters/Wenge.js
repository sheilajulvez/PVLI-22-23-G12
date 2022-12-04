


export default class Wenge extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y,anim) {
		super(scene, x, y, 'Wenge');
		this.scene.add.existing(this); //lo añades a la escene
		this.scene.physics.add.existing(this);// lo haces objeto físico
		this.body.setSize(200,220);
		this.body.setOffset(360,140);
		this.anim=anim;
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

		this.scene.anims.create({
			key: 'Wenge_motomami', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Wenge_motomami', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:37 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 60, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
		})
		console.log(anim);
		if(anim=="Wenge_motomami"){
			
			this.play("Wenge_motomami");
		}
		else this.play('idle_Wenge'); //activa la animavcion
		this.velocity=500;
		this.setScale(0.35,0.35);
		this.d = this.scene.input.keyboard.addKey('D'); // registramos la tecla D como input
		this.a = this.scene.input.keyboard.addKey('A'); // registramos la tecla A como input
	}

	AddVelocity(){
		console.log("suma vel");
		this.velocity+=200;
	}
	SetAnim(name){
		this.anim=name;
	}
	update(t, dt){
		//super.preUpdate(t, dt);

		//movimiento de WENGE
		//
		// no se podria poner cuando esto no colisionara con las paredes como 
		if((this.x<800 && this.x>100))//
		{
			if(this.d.isDown)
			{
				//this.x+=(50*dt)/100;
				this.body.setVelocityX(this.velocity);
				
				
			}
			else if(this.a.isDown)
			{
				//this.x-=(50*dt)/100;
				this.body.setVelocityX(-1*this.velocity);

			}
			else{
				this.body.setVelocityX(0);
				
			}
		}
		else if(this.x<=100)
		{
			if(this.d.isDown)
			{
				//this.x+=(50*dt)/100;
				this.body.setVelocityX(this.velocity);
			}
			else {
				this.body.setVelocityX(0);
			}
		}
		else if(this.x>=800)
		{
			if(this.a.isDown)
			{
				//this.x-=(50*dt)/100;
				this.body.setVelocityX(-1*this.velocity);
			}
			else{
				this.body.setVelocityX(0);
			}
			
		}
        
        
	}


	

}