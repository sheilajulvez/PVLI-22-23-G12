import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Vehiculos/Van.js';
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge
import Danger from '../../characters/Danger.js';
import Ambulance from '../../characters/Vehiculos/Ambulance.js';
//random para los coches
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

//clase del nivel 4
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
		//create del padre
		super.create();
		//iniciar el tiempo
		this.timeDelta=0;
		this.Inicia(this);
		this.money.SetScene(this);	
		this.ambulance=new Ambulance(this,4000,0);
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
		this.player.velocity=this.player_b.velocity;
		this.player.dash=this.player_b.dash;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this,'l_croqueta');

		let arrayCoches=[];
		for(let i=0; i<5;i++)
		{
			arrayCoches[i]=(new Car(this,0,-1000-i*200));
	
		}
		this.poolCar=new Pool(this,arrayCoches);

		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan[i]=(new Van(this,0,1000 + i*200));
		}
		this.poolVan=new Pool(this,arrayVan);
		const config =
		{
			 mute: false,
 			 volume: 0.1,
 		 	 rate: 1,
			 detune: 0,
 			 seek: 0,
 			 loop: false,
 			 delay: 0,
		}
		this.explosionSound = this.sound.add('explosionSound',config);
		this.music=this.sound.add('musica3',config);
		this.music.play();
		
		//colisiones	
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolCar.getPhaserGroup(),(obj1,obj2)=>
		{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			 this.poolCar.release(obj1);
			 this.poolCar.release(obj2);
		});
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			this.poolCar.release(obj1);
			this.poolVan.release(obj2);

		});
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			this.poolVan.release(obj1);
			this.poolVan.release(obj2);
			
		});
		
			
			this.physics.add.overlap(this.ambulance,this.poolCar.getPhaserGroup(),(obj1,obj2)=>
			{
				
				if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
				 this.poolCar.release(obj2);
			});
			this.physics.add.overlap(this.ambulance,this.poolVan.getPhaserGroup(),(obj1,obj2)=>
			{
				if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
				 this.poolVan.release(obj2);
			});
		
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
		super.update();
		this.timeDelta= this.timeDelta+dt;
		if (this.player.life.lifes <= 0){
			this.music.stop();
			this.player.alive=false;
			this.scene.start("gameover",{name:"tomatico",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.Barra.fin()){
			this.music.stop();
			this.scene.start("EscenaHablar",{name:"Croquetas_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.timeDelta>1000)
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

			this.newdanger(this,vehicleX);
			this.ambulance.setX(vehicleX);
			this.ambulance.setY(-335);
			
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
				this.poolCar.spawn(vehicleX,0,'idle_BlueCar');
		}
		else //respawn van
		{
			console.log("aaaa00");
			this.ambulanceCont=this.ambulanceCont+1;
			this.timeDelta=0;
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
	 }
}