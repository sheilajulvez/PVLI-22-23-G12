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
		this.play(this.anim);
		this.alive=true;
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

	collision()
	{
		if(this.scene.physics.overlap(this, this.scene.explosion)) 
		{
			this.scene.player.life.RestaVida();	
		}
	}
	AddVelocity(){
		this.velocity+=200;
	}
	SetAnim(name){
		let a=0;
		let found=false;
		while(a<this.outfits.lenght&&!(found)){
            if(this.outfits[a][0]==name){
				this.outfits[a][1]=true;
                found=true;
            }
            else ++a;
        }
		this.anim=name;
	}
	update(){
		//super.preUpdate(t, dt);
		this.collision();
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