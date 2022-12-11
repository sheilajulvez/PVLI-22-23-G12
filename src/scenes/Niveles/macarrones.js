import Generical from '../../scenes/generical.js';
import Wenge from '../../characters/Wenge.js'
import Pool  from '../../characters/Pool.js';
import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Van from '../../characters/Vehiculos/Van.js';
import Moto from '../../characters/Vehiculos/Moto.js'


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('tomatico');
	}

	create(){
		super.create();
		this.timeDelta=0;
		this.Inicia(this);

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
		this.player=new Wenge(this, 400, 600,this.player_b.anim); //creamos a nuestro personaje, nuestra Wenge
		this.player.dash=this.player_b.dash;
		this.player.velocity=this.player_b.velocity;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this);

		let arrayCoches=[];
			
		for(let i=0; i<5;i++)
		{
			arrayCoches[i]=(new Car(this,0,-1000-i*100));
		}
		this.poolCar=new Pool(this,arrayCoches);

		
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan[i]=(new Van(this,0,-1000 - i*100));
		}
		this.poolVan=new Pool(this,arrayVan);

		let arrayMoto=[];
		for(let i=0;i<5;i++){
			arrayMoto[i]=(new Moto(this,0,-500+i*100));
		}
		this.poolMoto=new Pool(this,arrayMoto);

			
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolCar.getPhaserGroup(),(obj1,obj2)=>{console.log("coche coche"); this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ console.log("coche furgo");this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ console.log("furgo furgi");this.Explosiones(obj1,obj2)});


	}
	CarisOut(vehicles)
	{
		this.poolCar.release(vehicles);
	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}

	pitido()
	{
		this.pitido1.play();
	}
	init(datos)
	{
        this.stay = datos.stay; 
		this.money=datos.dinero;
		this.player_b=datos.wenge;
		
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

			this.newdanger(this,vehicleX);
			this.ambulance=this.newambulance(this,vehicleX);
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
					
					//this.poolCar.spawn(vehicleX,0,'idle_BlueCar');
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