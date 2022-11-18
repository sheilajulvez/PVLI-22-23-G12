
import Car from '../../characters/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Van.js';
import Pool  from '../../characters/Pool.js';

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Aceite extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){

		super('Aceite');
		
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
	}

	create(){
		super.create();
		this.timeDelta=0;
		this.car=new Car(this,0,-1000);
		this.physics.add.existing(this.car);

		let arrayCoches=[];
		
		for(let i=0; i<5;i++)
		{
			arrayCoches.push(this.car);
		}
		
		this.poolCar=new Pool(this,5,arrayCoches);	
		this.van=new Van(this,0,-1000);
		this.physics.add.existing(this.van);


				
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan.push(this.van);
		}
		this.poolVan=new Pool(this,5,arrayVan);
		
		//this.physics.add.existing(this.player);// lo haces objeto físico



		this.physics.add.collider(this.player, this.car);
		if(this.physics.collide(this.player, this.car)) {
    		console.log("Hay colisión");}
		
		
	}
	CarisOut(vehicles)
	{
		this.poolCar.release(vehicles);
	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	update(t,dt)
	{
		
		super.update(t,dt);
		this.timeDelta= this.timeDelta+dt;
		if(this.Barra.fin()){
			this.scene.start("EscenaHablar",{name:"Aceite_fin"} )
		}
		
		if(this.timeDelta>4000)
		{
	    var rand=random(0,1);
	    if (rand===0)
		{
			
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
		else if(rand===1)
		{
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
			console.log("respawn");
			this.poolVan.spawn(vehicleX,0,'idle_WhiteCar');
		}
		}

		
		
	}
}