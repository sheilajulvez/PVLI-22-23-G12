







import Generical from '../../scenes/generical.js';
import Van from '../../characters/Van.js';
import Pool  from '../../characters/Pool.js';
import Explosion from '../../characters/explosion.js';
import Economy from "../../components/Economy.js"
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge
import Danger from '../../characters/Danger.js';
import Ambulance from '../../characters/Ambulance.js';
import { Moto } from '../../characters/Motos.js';




function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Aceite extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){

		super('Aceite');
		this.ambulanceCont=0;
		this.money=new Economy(this);
		this.exp=false;
		
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.load.spritesheet('Bike','assets/Moto.jpg',{frameWidth:166 , frameHeight:490});
		this.load.spritesheet('Ambulance','assets/ambulance.png',{frameWidth:166 , frameHeight:	233	})
		this.load.spritesheet('Explosion','assets/explosion.png',{frameWidth:650, frameHeight:	600});
		this.load.image('danger','assets/danger.png');
		this.load.audio('musiquita','assets/sounds/videoplayback.mp3');
		this.load.audio('pitido1','assets/sounds/pitido1.mp3');
		this.load.audio('explosionSound','assets/sounds/explosion.mp3');
	}
	init(datos){
        this.stay = datos.stay;
		this.money=datos.dinero;
		this.player_b=datos.wenge;
 
    }
	create(){
		
		super.create();
		this.timeDelta=0;
		const config1 =
		{
			mute: false,
 			 volume: 0.1,
 		 	 rate: 1,
			 detune: 0,
 			 seek: 0,
 			 loop: false,
 			 delay: 0,
		}
		const config2 =
		{
			 mute: false,
 			 volume: 0.1,
 		 	 rate: 1,
			 detune: 0,
 			 seek: 0,
 			 loop: false,
 			 delay: 0,
		}
		this.explosionSound = this.sound.add('explosionSound',config2);

		this.pitido1 = this.sound.add('pitido1',config1);
		this.player=new Wenge(this, 400, 600,"idle_Wenge"); //creamos a nuestro personaje, nuestra Wenge


		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan[i]=(new Van(this,0,-1000 - i*100));
		}
		this.poolVan=new Pool(this,5,arrayVan);
		this.physics.add.overlap(this.player,this.poolVan.getPhaserGroup());

		let arrayBike=[];
		for(let i=0;i<3;i++)
		{
			arrayBike[i]=(new Moto(this,0,-1000+i*100));
		}
		this.poolBike=new Pool(this,3,arrayBike);
		this.physics.add.collider(this.player, this.poolBike.getPhaserGroup());	

			
		this.physics.add.overlap(this.poolBike.getPhaserGroup(),this.poolBike.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolBike.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{this.Explosiones(obj1,obj2)});

	}

	
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	BikeisOut(vehicles)
	{
		this.poolBike.release(vehicles);
	}
	Explosiones(obj1,obj2){
	
		this.createExplosion(obj1.body.center.x,obj2.body.center.y);
		this.explosionSound.play();
		obj1.destroy();
		obj2.destroy();
			
	}
	createExplosion(x,y){
		
		this.explosion=new Explosion(this,x,y);
		this.exp=true;


   }
   pitido()
   {
	   this.pitido1.play();
   }
   init(datos)
   {
	   this.stay = datos.stay; 
   }
	update(t,dt)
	{
		super.update();
		if (this.player.life.lifes == 0) this.scene.start("gameover");
		this.timeDelta= this.timeDelta+dt;
	
		if(this.Barra.fin()){
			this.money.AddMoney(200);
			this.scene.start("EscenaHablar",{name:"Aceite_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}



		if(this.timeDelta>2000)
		{
			if(this.exp){this.explosion,destroy(); this.exp=false;}
			
			var rand=random(0,1);
			
			//AMBULANCIA
			if(this.ambulanceCont===5)
			{   let pos=random(0,5);
				let vehicleX=0;
				this.ambulanceCont=0;
				this.timeDelta=0;
				switch(pos)
				{
				 	case 0:
					 	vehicleX=210;
					 	break;
				  	case 1:
					 	vehicleX=350;
					 	break;
				 	 case 2:
				   	vehicleX=480;
					 	break;
					case 3:
						vehicleX=610;
						break;
					case 4:
					vehicleX=740;
						break;
					case 5:
					vehicleX=870;
						break;
					
			}

			new Danger(this,vehicleX-100,0).setOrigin(0,0).setScale(0.5,0.7);
			this.ambulance=new Ambulance(this,vehicleX-10,-335);
		}
		if (rand===0)
			{
					this.ambulanceCont=this.ambulanceCont+1;
					let pos=random(0,5);
					this.timeDelta=0;
					let vehicleX=0;
						switch(pos)
						{
							case 0:
								vehicleX=210;
								break;
							case 1:
								vehicleX=350;
								break;
							case 2:
								vehicleX=480;
								break;
							case 3:
								vehicleX=610;
								break;
							case 4:
								vehicleX=740;
								break;
							case 5:
								vehicleX=870;
								break;
								
						}
					
					this.poolCar.spawn(vehicleX,0,'idle_bike');

				
			}
			//FURGONETA 
			else if(rand==1)
			{
				this.ambulanceCont=this.ambulanceCont+1;
				let pos=random(0,1);
				this.timeDelta=0;
				let vehicleX=0;
				switch(pos)
					{
						case 0:
							vehicleX=350;
							break;
						case 1:
							vehicleX=740;
							break;
					}
					
				this.poolVan.spawn(vehicleX,0,'idle_WhiteCar');
				
				
			}
			
		}
			this.player.life.Update();
	}

	GameOver(){
			this.scene.start('gameover');
		}

}
 
