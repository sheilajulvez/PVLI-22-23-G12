
import Car from '../characters/Car.js';//importamos a los Coches
import Generical from '../scenes/generical.js';
import Van from '../characters/Van.js';
import Pool  from '../characters/Pool.js';


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('tomatico') 
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
		

		let arrayCoches=[];
		for(let i=0; i<5;i++)
		{
			arrayCoches.push(new Car(this,0,-1000));
		}
		this.pool=new Pool(this,5,arrayCoches);		
		

		let van=new Van(this,500,100);
	}
	isOut(vehicles)
	{
		this.pool.release(vehicles);
	}
	update(t,dt)
	{
		super.update(t,dt);
		this.timeDelta= this.timeDelta+dt;
		if(this.timeDelta>1000)
		{   let pos=random(0,5);
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
			this.pool.spawn(vehicleX,0,'idle_BlueCar');
		}
	}
}