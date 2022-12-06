
import Car from '../../characters/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Van.js';
import { Moto } from '../../characters/Motos.js';
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Aceite extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){

		super('Aceite');
		this.vanSpawn=0;
		
	}

	preload(){
		super.preload();
		this.Inicia(this);
		this.money.SetScene(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});
		this.load.spritesheet('Bike','assets/Moto.jpg',{frameWidth:166 , frameHeight:490});
	}
	init(datos){
        this.stay = datos.stay;
		this.money=datos.dinero;
		this.player_b=datos.wenge;
	
        
		
       
    }
	create(){
		super.create();
		this.timeDelta=0;
		this.money.ShowMoney();
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
		this.player.velocity=this.player_b.velocity;
		this.player.dash=this.player_b.dash;
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			let van=new Van(this,0,-1000);
			arrayVan.push(van);
		}
		this.poolVan=new Pool(this,5,arrayVan);
		this.physics.add.collider(this.player,this.poolVan.getPhaserGroup());
		//this.player=new Wenge(this, 400, 600,"Wenge_motomami"); 


		
		
		let arrayBike=[];
		for(let i=0;i<3;i++)
		{
			let bike=new Moto(this,0,-1000);
			arrayBike.push(bike);
		}
		this.poolBike=new Pool(this,3,arrayBike);
		this.physics.add.collider(this.player, this.poolBike.getPhaserGroup());	
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
		
	}
	update(t,dt)
	{
		
		super.update();
		this.collision();
		this.timeDelta= this.timeDelta+dt;
		if(this.Barra.fin()){
			this.money.AddMoney(200);
			this.scene.start("EscenaHablar",{name:"Aceite_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.timeDelta>2000)
		{
	   				//respawm car
		let pos=random(0,1);
			this.vanSpawn++;
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
				console.log(this.vanSpawn);
				this.poolBike.spawn(vehicleX,0,'idle_bike');	

			
		
		
	    if(this.vanSpawn===4)
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