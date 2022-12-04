import Car from '../../characters/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Van.js';
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


export default class Croquetas extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){

		super('Croquetas');
		this.vanSpawn=0;
		
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.money.SetScene(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
		//imagen para la máscara
		//this.load.image('mask', '');
		//añadimos las luces
		
	}
	init(datos){
        this.stay = datos.stay;
		this.money=datos.dinero;
		
	
        
    }
	create(){
		super.create();
		this.timeDelta=0;
		this.money.ShowMoney();
		let arrayCoches=[];
		this.player=new Wenge(this, 400, 600,"Wenge_motomami"); 

		for(let i=0; i<5;i++)
		{
			let car=new Car(this,0,-1000);
			arrayCoches.push(car);
			
		}
		

		//console.log(arrayCoches.length);
		
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

		this.physics.add.collider(this.poolCar.getPhaserGroup(), this.poolVan.getPhaserGroup());
		

		

		
		
	}
	CarisOut(vehicles)
	{
		this.poolCar.release(vehicles);
	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	
	collision()
	{
		if(this.physics.overlap(this.poolCar.getPhaserGroup(), this.poolVan.getPhaserGroup())){
			console.log("SOLAPAMIENTO");
		}
		if(this.physics.collide(this.player, this.poolCar.getPhaserGroup())) {
    		console.log("Hay colisión");}
	}
	
	update(t,dt)
	{
		
		super.update();
		this.collision();
		
		this.timeDelta= this.timeDelta+dt;
		if(this.Barra.fin()){
			this.money.AddMoney(200);
			this.scene.start("EscenaHablar",{name:"Croquetas_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
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
				//console.log('pos='+pos)
				//console.log(this.vanSpawn);
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
}