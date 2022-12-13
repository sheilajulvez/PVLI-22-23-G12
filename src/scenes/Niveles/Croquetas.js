import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Vehiculos/Van.js';
import Pool  from '../../characters/Pool.js';
import Explosion from '../../characters/explosion.js';
import Economy from "../../components/Economy.js"
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge
import Danger from '../../characters/Danger.js';
import Ambulance from '../../characters/Vehiculos/Ambulance.js';

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


export default class Croquetas extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('Croquetas');	
	}
	init(datos){
        this.stay = datos.stay;
		this.money=datos.dinero;
		this.player_b=datos.wenge;
    }
	create(){
		super.create();
		this.timeDelta=0;
		this.Inicia(this);
		this.money.SetScene(this);	
		let arrayCoches=[];
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
		this.player.velocity=this.player_b.velocity;
		this.player.dash=this.player_b.dash;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this,'l_croqueta');
		for(let i=0; i<5;i++)
		{
			let car=new Car(this,0,-1000);
			arrayCoches.push(car);
			
		}
		

		//console.log(arrayCoches.length);
		
		this.poolCar=new Pool(this,arrayCoches);	
		this.physics.add.collider(this.player, this.poolCar.getPhaserGroup());
		
		this.music=this.sound.add('musica3');
		this.music.play();
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			let van=new Van(this,0,-1000);
			arrayVan.push(van);
		}
		this.poolVan=new Pool(this,arrayVan);
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
		if (this.player.life.lifes <= 0){
			this.music.stop();
			this.player.alive=false;
			this.scene.start("gameover",{name:"tomatico",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		this.timeDelta= this.timeDelta+dt;
		if(this.Barra.fin()){
			this.money.AddMoney(200);
			this.music.stop();
			this.scene.start("EscenaHablar",{name:"Croquetas_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.timeDelta>2000)
		{
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

	this.newdanger(this,vehicleX);
	this.ambulance=this.newambulance(this,vehicleX);
}
	    if (rand===0)				//respawm car
		{
			this.ambulanceCont=this.ambulanceCont+1;
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
			this.ambulanceCont=this.ambulanceCont+1;
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