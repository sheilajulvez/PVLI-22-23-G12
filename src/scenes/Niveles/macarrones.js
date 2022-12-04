import Car from '../../characters/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Van.js';
import Pool  from '../../characters/Pool.js';
import Explosion from '../../characters/explosion.js';
import LifeComponent from '../../components/LifeComponent.js';
import Economy from "../../components/Economy.js"
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){

		super('tomatico');
		this.vanSpawn=0;
		this.collisionCar=false;
		this.collisionVan=false;
		this.gritoB=false;
		this.gritoReset=5000;
		this.money=new Economy(this);
		
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
		this.load.spritesheet('Explosion','assets/explosion.png',{frameWidth:311 , frameHeight:	512	});
		this.load.audio('musiquita','assets/sounds/videoplayback.mp3');
		this.load.audio('pitido1','assets/sounds/pitido1.mp3');
	}

	create(){
		super.create();
		this.timeDelta=0;
		let arrayCoches=[];


		const config1 =
		{
			mute: false,
 			 volume: 0.1,
 		 	 rate: 1,
			 detune: 0,
 			 seek: 0,
 			 loop: true,
 			 delay: 0,
		}


		this.money.ShowMoney();
		// this.musiquita = this.sound.add("musiquita",config);
		// this.musiquita.play();
		this.pitido1 = this.sound.add('pitido1',config1);
		//this.grit2 = this.sound.add('grito');	
		this.player=new Wenge(this, 400, 600); //creamos a nuestro personaje, nuestra Wenge
		console.log("macarrones: "+this.player);
		console.log("macarrones: "+this.money);
		for(let i=0; i<5;i++)
		{
			let car=new Car(this,0,-500);
			arrayCoches.push(car);
			
		}
		this.poolCar=new Pool(this,5,arrayCoches);	
		this.physics.add.overlap(this.player, this.poolCar.getPhaserGroup());
		
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			let van=new Van(this,0,-1000);
			arrayVan.push(van);
		}
		this.poolVan=new Pool(this,5,arrayVan);
		this.physics.add.overlap(this.player,this.poolVan.getPhaserGroup());
			
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolCar.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});
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

	}
	grito()
	{
		if(this.gritoB===true && this.gritoReset>10000)
		{
			console.log("GRITA");
			this.gritoReset=0;
			this.gritoB=false;
			this.pitido1.play();
			
		}
		else if(this.gritoReset>2500)
		{
			this.pitido1.stop();
		}
	}


	init(datos)
	{
        this.stay = datos.stay; 
    }
	update(t,dt)
	{
		
		super.update();
		 this.grito();
		 this.gritoReset+= dt;
		this.timeDelta= this.timeDelta+dt;
		if(this.Barra.fin()){
			
		//  this.musiquita.stop();
			this.scene.start("EscenaHablar",{name:"tomatico_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.timeDelta>2000)
		{
			this.explosion.destroy();
	    var rand=random(0,1);
	    if (rand===0)				//respawm car
		{
			
			    let pos=random(0,5);
				this.vanSpawn++;
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
		else 			//respawn bike
		{
			this.vanSpawn++;
			this.timeDelta=0;
			if(this.vanSpawn>=2)
			{
			let pos=random(0,1);
			this.vanSpawn=0;
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
		
		}
	    
	 }
	 GameOver(){
		this.scene.start('gameover');
	 }
}