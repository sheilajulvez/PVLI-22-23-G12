import LifeComponent from './../components/LifeComponent.js';	//importamos el life_component
//creamos un random
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Wenge extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser de Objeto tipo Sprite

	constructor(scene, x, y,anim) {
		super(scene, x, y, 'Wenge');	//heredamos
		this.scene.add.existing(this); 	//lo añades a la escene
		this.scene.physics.add.existing(this);	// lo haces objeto físico
		this.body.setSize(200,220);	//el tamaño del cuerpo
		this.body.setOffset(360,140);	//su poicion en pantalla
		this.coolDown=0;	//tiempo de recarga para utilizar el dash
		this.skateSound=[];
		this.timeDelta=500;	//tiempo
		this.anim=anim;	//animacion
		this.life= new LifeComponent(this.scene, 100,100,3);	//vida de Wenge
		this.dash=false;	//power-up de dash, en un principio falso, hasta que no lo compres no lo tienes
		this.outfits=[["Wenge_motomami",false],["Wenge_daltonismo",false],["Wenge_nuevacoleccion",false]];	//outfits que puedes tener
		this.outfits.lenght=3;			//longitud del array de outfits
		this.play(this.anim);	//reproduce la animacion
		this.alive=true;	//si al menos tiene una vida

		//configuracion de sonido
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
		
		this.velocity=500;//velocidad de wenge
		this.setScale(0.35,0.35);	//tamaño en el juego
		this.d = this.scene.input.keyboard.addKey('D'); // registramos la tecla D como input
		this.a = this.scene.input.keyboard.addKey('A'); // registramos la tecla A como input
		this.q = this.scene.input.keyboard.addKey('Q'); // registramos la tecla A como input
		this.e = this.scene.input.keyboard.addKey('E'); // registramos la tecla A como input
	}
	//metodo para establecer el dash, se llama si lo compras en la tienda
	SetDash(){
		this.dash=true;
	}

	//aumenta la velocidad de wenge
	AddVelocity(){
		this.velocity+=200;
	}

	//control de animacion 
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
		this.collision();
		this.timeDelta+=1;	
		if(this.coolDown>=0) 
		{
			this.coolDown= this.coolDown-1;	//si el cooldown empieza a 200 vas restandole, y cuando llega a 0 puedes volcer a utilizarlo
		}
		if(this.timeDelta>=600)	//si el tiempo es mayor que 600
		{
			this.timeDelta=0;	//lo pones de nuevo a 0 tu variable de tiempo
			let rand=random(0,2);
			this.skateSound[rand].play();	//y reproduces un sonido
		}
		
		if((this.x<800 && this.x>100))//si esta entre los limites de la carretera
		{
			if(this.d.isDown)	//si pulsa D
			{
				this.body.setVelocityX(this.velocity);	//te mueves a la derecha
				//si pulsa q o e y el cooldown es menor que 0, puedes realizar el movimiento dash
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
			else if(this.a.isDown)//si pulsa A
			{
				
				this.body.setVelocityX(-1*this.velocity); //te mueves a la izquierda
				//si pulsa q o e y el cooldown es menor que 0, puedes realizar el movimiento dash
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
			//si pulsa q o e y el cooldown es menor que 0, puedes realizar el movimiento dash
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
			//si no pulsas nada velocidad a 0, wenge no se mueve
			else{
				this.body.setVelocityX(0);	
			}
		}
		//si estas en el limite izquierdo solo puedes ir a la derecha pulsando d
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
		//si estas en el limite derecho solo puedes ir a la izquierda pulsando a
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