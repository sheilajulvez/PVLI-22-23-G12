import LifeComponent from './../components/LifeComponent.js';
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Wenge extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y,anim) {
		super(scene, x, y, 'Wenge');
		this.scene.add.existing(this); //lo añades a la escene
		this.scene.physics.add.existing(this);// lo haces objeto físico
		this.body.setSize(200,220);
		this.body.setOffset(360,140);
		this.coolDown=0;
		this.skateSound=[];
		this.timeDelta=500;
		this.anim=anim;
		this.life= new LifeComponent(this.scene, 100,100,3);
		this.dash=false;
		this.outfits=[["Wenge_motomami",false],["Wenge_daltonismo",false],["Wenge_nuevacoleccion",false]];
		this.outfits.lenght=3;

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

		
				// this.tweenLeft = this.scene.tweens.add({
				// 	targets: [ this ],
				// 	x: this.x-160,
				// 	duration: 200,
				// 	ease: 'Sine.easeInOut',
				// 	flipX: true,
				// 	yoyo: false,
				// 	repeat: 0,
				// 	delay: 10
				// });
				// this.tweenRight = this.scene.tweens.add({
				// 	targets: [ this ],
				// 	x: this.x+160,
				// 	duration: 200,
				// 	ease: 'Sine.easeInOut',
				// 	flipX: true,
				// 	yoyo: false,
				// 	repeat: 0,
				// 	delay: 10
				// });
				console.log(this.anim);
		this.play(this.anim);
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
		const config =
		{
			mute: false,
 			 volume: 0.1,
 		 	 rate: 1,
			 detune: 0,
 			 seek: 0,
 			 loop: false,
 			 delay: 0,
		}
		for(let i=1;i<4;i++)
        {
            this.skateSound.push(this.scene.sound.add("skate"+i,config));
        }
		this.dashSound=this.scene.sound.add('dash',config);
		this.velocity=500;
		this.setScale(0.35,0.35);
		this.d = this.scene.input.keyboard.addKey('D'); // registramos la tecla D como input
		this.a = this.scene.input.keyboard.addKey('A'); // registramos la tecla A como input
		this.q = this.scene.input.keyboard.addKey('Q'); // registramos la tecla A como input
		this.e = this.scene.input.keyboard.addKey('E'); // registramos la tecla A como input
	}
	SetDash(){
		this.dash=true;
	}
	AddVelocity(){
		console.log("suma vel");
		this.velocity+=200;
	}
	SetAnim(name){
		let a=0;
		let found=false;
		while(a<this.outfits.lenght&&!(found)){
            if(this.outfits[a][0]==name){
				console.log(this.outfits[a][0]);
				console.log(name);
				this.outfits[a][1]=true;
                found=true;
            }
            else ++a;
        }
		console.log(this.outfits.lenght);
		console.log(this.outfits[a][1])
		this.anim=name;
	}
	update(){
		//super.preUpdate(t, dt);
		this.timeDelta+=1;
		if(this.coolDown>=0)
		{
			this.coolDown= this.coolDown-1;
		}
		if(this.timeDelta>=600)
		{
			this.timeDelta=0;
			let rand=random(0,2);
			this.skateSound[rand].play();
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
				if(this.q.isDown && this.coolDown<=0 && this.x>266&&this.dash)
				{
					this.coolDown=200;
					this.dashSound.play();
					
				 this.scene.tweens.add({
					targets: [ this ],
					x: this.x-160,
					duration: 200,
					ease: 'Sine.easeInOut',
					flipX: true,
					yoyo: false,
					repeat: 0,
					delay: 10
				});
				}
				else if(this.e.isDown && this.coolDown<=0 && this.x<634&&this.dash)
				{
					this.coolDown=200;
					this.dashSound.play();
					this.scene.tweens.add({
						targets: [ this ],
						x: this.x+160,
						duration: 200,
						ease: 'Sine.easeInOut',
						flipX: true,
						yoyo: false,
						repeat: 0,
						delay: 10
					});
				}
				
			}
			else if(this.a.isDown)
			{
				//this.x-=(50*dt)/100;
				this.body.setVelocityX(-1*this.velocity);
				if(this.q.isDown && this.coolDown<=0 && this.x>266&&this.dash)
				{
					this.coolDown=200;
					this.dashSound.play();
					
				 this.scene.tweens.add({
					targets: [ this ],
					x: this.x-160,
					duration: 200,
					ease: 'Sine.easeInOut',
					flipX: true,
					yoyo: false,
					repeat: 0,
					delay: 10
				});
				}
				else if(this.e.isDown && this.coolDown<=0 && this.x<634 &&this.dash)
				{
					this.coolDown=200;
					this.dashSound.play();
					this.scene.tweens.add({
						targets: [ this ],
						x: this.x+160,
						duration: 200,
						ease: 'Sine.easeInOut',
						flipX: true,
						yoyo: false,
						repeat: 0,
						delay: 10
					});
				}
			}
			else if(this.q.isDown && this.coolDown<=0 && this.x>266&&this.dash)
			{
				this.coolDown=200;
				this.dashSound.play();
				this.scene.tweens.add({
					targets: [ this ],
					x: this.x-160,
					duration: 200,
					ease: 'Sine.easeInOut',
					flipX: true,
					yoyo: false,
					repeat: 0,
					delay: 10
				});
			}
			else if(this.e.isDown && this.coolDown<=0 && this.x<634&&this.dash)
			{
				this.coolDown=200;
				this.dashSound.play();
				this.scene.tweens.add({
					targets: [ this ],
					x: this.x+160,
					duration: 200,
					ease: 'Sine.easeInOut',
					flipX: true,
					yoyo: false,
					repeat: 0,
					delay: 10
				});
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