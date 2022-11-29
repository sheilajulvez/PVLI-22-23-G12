import Car from '../../characters/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Van.js';
import Pool  from '../../characters/Pool.js';
import explosion from '../../characters/explosion.js';
import LifeComponent from '../../components/LifeComponent.js';
import{GameOver} from '../GameOver.js';

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){

		super('tomatico');
		this.vanSpawn=0;
		this.collisionCar=false;
		this.collisionVan=false;
		
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
		this.load.spritesheet('Explosion','assets/explosion.png',{frameWidth:311 , frameHeight:	512	});


		
	}

	create(){
		super.create();
		this.timeDelta=0;
		let arrayCoches=[];

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
		//this.physics.add.overlap()
	}
	CarisOut(vehicles)
	{
		this.poolCar.release(vehicles);
	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	
	collision(dt)
	{
		if(this.physics.overlap(this.player, this.poolCar.getPhaserGroup())) 
		{
			this.events.on('Vida', Actualiza);
    		console.log("CAR");
		}
		else if(this.physics.overlap(this.player, this.poolVan.getPhaserGroup()))
		{
			this.events.on('Vida', Actualiza);
			console.log("VAN");
		}
		if(this.physics.overlap(this.poolVan.getPhaserGroup(), this.poolCar.getPhaserGroup()))
		{
			/*this.explosion=new explosion(this,110,110);
			var delete1=+dt;
			if(delete1>3000)
			{
				delete this.explosion;
			}*/
			if(this.poolVan.getPhaserGroup().body.up && this.poolCar.getPhaserGroup().body.down){
				createExplosion(
					this.poolVan.getPhaserGroup().body.center.x,
					this.poolCar.getPhaserGroup().body.top);


			}
			else if(this.poolVan.getPhaserGroup().body.down && this.poolCar.getPhaserGroup().body.up){
				createExplosion(
					this.poolCar.getPhaserGroup().body.center.x,
					this.poolVan.getPhaserGroup().body.top);

			}
			
		}
	}
	createExplosion(x,y){
		var explosion=new explosion(this,x,y);

	}


	init(datos)
	{
        this.stay = datos.stay; 
    }
	update(t,dt)
	{
		
		super.update();
		this.collision(dt);
		this.timeDelta= this.timeDelta+dt;
		if(this.Barra.fin()){
			console.log("esto entra?")
			this.scene.start("EscenaHablar",{name:"tomatico_fin",stay:this.stay} )
		}
		if(this.timeDelta>2000)
		{
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
				console.log('pos='+pos)
				console.log(this.vanSpawn);
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