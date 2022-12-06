


export default class Wenge extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y,anim) {
		super(scene, x, y, 'Wenge');
		this.scene.add.existing(this); //lo añades a la escene
		this.scene.physics.add.existing(this);// lo haces objeto físico
		this.body.setSize(200,220);
		this.body.setOffset(360,140);
		this.coolDown=0;
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
		this.scene.anims.create({
			key: 'Wenge_daltonismo', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Wenge_daltonismo', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:37 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 60, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
		})
		this.scene.anims.create({
			key: 'Wenge_nuevacoleccion', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Wenge_nuevacoleccion', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:37 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 60, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
		})
		this.play(anim);
		//if(anim=="Wenge_motomami"){
			
		//	this.play("Wenge_motomami");
		//}
		//else if(anim=="Wenge_nuevacoleccion"){
		//	this.play("Wenge_nuevacoleccion")
		//}
		//else if(anim=="Wenge_daltonismo"){
		//	this.play("Wenge_daltonismo");
		//}
		//else this.play('idle_Wenge'); //activa la animavcion
		this.dashSound=this.scene.sound.add('dash');
		this.velocity=500;
		this.setScale(0.35,0.35);
		this.d = this.scene.input.keyboard.addKey('D'); // registramos la tecla D como input
		this.a = this.scene.input.keyboard.addKey('A'); // registramos la tecla A como input
		this.q = this.scene.input.keyboard.addKey('Q'); // registramos la tecla A como input
		this.e = this.scene.input.keyboard.addKey('E'); // registramos la tecla A como input
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
		if(this.coolDown>=0)
		{
			this.coolDown= this.coolDown-1;
		}
		//movimiento de WENGE
		//
		// no se podria poner cuando esto no colisionara con las paredes como 
		if((this.x<800 && this.x>100))//
		{
			if(this.d.isDown)
			{
				//this.x+=(50*dt)/100;
				this.body.setVelocityX(this.velocity);
				if(this.q.isDown && this.coolDown<=0 && this.x>266)
				{
					this.coolDown=200;
					this.dashSound.play();
					this.body.setVelocityX(-1*this.velocity*20);
				}
				else if(this.e.isDown && this.coolDown<=0 && this.x<634)
				{
					this.coolDown=200;
					this.dashSound.play();
					this.body.setVelocityX(this.velocity*30);
				}
				
			}
			else if(this.a.isDown)
			{
				//this.x-=(50*dt)/100;
				this.body.setVelocityX(-1*this.velocity);
				if(this.q.isDown && this.coolDown<=0 && this.x>266)
				{
					this.coolDown=200;
					this.dashSound.play();
					this.body.setVelocityX(-1*this.velocity*20);
				}
				else if(this.e.isDown && this.coolDown<=0 && this.x<634)
				{
					this.coolDown=200;
					this.dashSound.play();
					this.body.setVelocityX(this.velocity*30);
				}
			}
			else if(this.q.isDown && this.coolDown<=0 && this.x>266)
			{
					this.coolDown=200;
					this.dashSound.play();
					this.body.setVelocityX(-1*this.velocity*20);
			}
			else if(this.e.isDown && this.coolDown<=0 && this.x<634)
			{
					this.coolDown=200;
					this.dashSound.play();
					this.body.setVelocityX(this.velocity*30);
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