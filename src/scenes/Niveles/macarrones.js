import Car from '../../characters/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Van.js';
import { Moto } from '../../characters/Motos.js';
import Pool  from '../../characters/Pool.js';


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

var vanSpawn=0;
export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){

		super('tomatico');
		
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
		this.load.spritesheet('Bike','assets/Moto.jpg',{frameWidth:166 , frameHeight:490});
	}

	create(){
		super.create();
		this.timeDelta=0;
		
		let arrayCoches=[];
		
		for(let i=0; i<5;i++)
		{
			let car=new Car(this,0,-1000);
			arrayCoches.push(car);
			
		}
		

		console.log(arrayCoches.length);
		
		this.poolCar=new Pool(this,5,arrayCoches);	
		this.physics.add.collider(this.player, this.poolCar.getPhaserGroup());
		
		

		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			let van=new Van(this,0,-1000);
			arrayVan.push(van);
		}
		this.poolVan=new Pool(this,5,arrayVan);
		this.physics.add.collider(this.player,this.poolVan.getPhaserGroup());



		
		
		let arrayBike=[];
		for(let i=0;i<3;i++)
		{
			let bike=new Moto(this,0,-1000);
			arrayBike.push(bike);
		}
		this.poolBike=new Pool(this,3,arrayBike);
		
		
		this.physics.add.collider(this.player, this.poolBike.getPhaserGroup());

		

		
		
	}
	CarisOut(vehicles)
	{
		this.poolCar.release(vehicles);
	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	BikeisOut(vehicles)
	{
		this.poolBike.release(vehicles);
	}
	collision()
	{
		if(this.physics.collide(this.player, this.car)||this.physics.collide(this.player, this.van)) {
    		console.log("Hay colisión");}
	}
	update(t,dt)
	{
		
		super.update(t,dt);
		this.collision();
		this.timeDelta= this.timeDelta+dt;
		
		if(this.timeDelta>2000)
		{
	    var rand=0;
	    if (rand===0)				//respawm car
		{
			
			    let pos=random(0,5);
				vanSpawn++;
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
				console.log(vanSpawn);
				this.poolCar.spawn(vehicleX,0,'idle_BlueCar');

			
		}
		else if(rand===1)			//respawn bike
		{
			let pos=random(0,1);
			vanSpawn++;
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
				console.log(vanSpawn);
				this.poolBike.spawn(vehicleX,0,'idle_bike');
		}
		
		}
		
		
	    if(vanSpawn===4)
		{
			let pos=random(0,1);
			vanSpawn=0;
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