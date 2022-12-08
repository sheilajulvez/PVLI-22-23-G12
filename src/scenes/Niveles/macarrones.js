import Car from '../../characters/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Van.js';
import Pool  from '../../characters/Pool.js';
import Explosion from '../../characters/explosion.js';
import Economy from "../../components/Economy.js"
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge
import Danger from '../../characters/Danger.js';
import Ambulance from '../../characters/Ambulance.js';
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){

		super('tomatico');
		this.ambulanceCont=0;
		this.money=new Economy(this);
		this.exp=false;
		
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});	
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
		this.load.spritesheet('Ambulance','assets/ambulance.png',{frameWidth:166 , frameHeight:	233	})
		this.load.spritesheet('Explosion','assets/explosion.png',{frameWidth:650, frameHeight:	600});
		this.load.image('danger','assets/danger.png');
		this.load.audio('musiquita','assets/sounds/videoplayback.mp3');
		this.load.audio('pitido1','assets/sounds/pitido1.mp3');
		this.load.audio('explosionSound','assets/sounds/explosion.mp3');
	}

	create(){
		super.create();
		this.timeDelta=0;
		let arrayCoches=[];

		//this.ambulance=new Ambulance(this,300,0);

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
		
		// this.musiquita = this.sound.add("musiquita",config);
		// this.musiquita.play();
		this.pitido1 = this.sound.add('pitido1',config1);
		//this.grit2 = this.sound.add('grito');	
		this.player=new Wenge(this, 400, 600,"idle_Wenge"); //creamos a nuestro personaje, nuestra Wenge
		
		for(let i=0; i<5;i++)
		{
			arrayCoches[i]=(new Car(this,0,-500+i*100));
		}
		this.poolCar=new Pool(this,5,arrayCoches);	
		this.physics.add.overlap(this.player, this.poolCar.getPhaserGroup());
		
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan[i]=(new Van(this,0,-1000 - i*100));
		}
		this.poolVan=new Pool(this,5,arrayVan);
		this.physics.add.overlap(this.player,this.poolVan.getPhaserGroup());
			
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolCar.getPhaserGroup(),(obj1,obj2)=>{console.log("coche coche"); this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ console.log("coche furgo");this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ console.log("furgo furgi");this.Explosiones(obj1,obj2)});


		//this.money.ShowMoney();
	}
	CarisOut(vehicles)
	{
		this.poolCar.release(vehicles);
	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	
	
	Explosiones(obj1,obj2){
	
		this.createExplosion(obj1.body.center.x,obj2.body.center.y);
		this.explosionSound.play();
		/*if(this.poolVan.getPhaserGroup().body.up && this.poolCar.getPhaserGroup().body.down){
				createExplosion(
					this.poolVan.getPhaserGroup().body.center.x,
					this.poolCar.getPhaserGroup().body.top);


			}
			else if(this.poolVan.getPhaserGroup().body.down && this.poolCar.getPhaserGroup().body.up){
				createExplosion(
					this.poolCar.getPhaserGroup().body.center.x,
					this.poolVan.getPhaserGroup().body.top);

			}*/
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
			
		//  this.musiquita.stop();
			this.scene.start("EscenaHablar",{name:"tomatico_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.timeDelta>2000)
		{
			if(this.exp){this.explosion.destroy();}
		
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

			//COCHE
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
					
					this.poolCar.spawn(vehicleX,0,'idle_BlueCar');

				
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