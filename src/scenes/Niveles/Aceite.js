
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Vehiculos/Van.js';
import Ambulance from '../../characters/Vehiculos/Ambulance.js';
import Moto from '../../characters/Vehiculos/Moto.js'
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge



function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Aceite extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('Aceite');
	}

	init(datos){
        this.stay = datos.stay;
		this.money=datos.dinero;
		this.player_b=datos.wenge;
    }
	create(){
		super.create();
		this.Inicia(this);
		this.timeDelta=0;
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
		this.music= this.sound.add('musica5',config1);
		this.music.play();
		this.pitido1 = this.sound.add('pitido1',config1);
		this.player=new Wenge(this, 400, 600,this.player_b.anim); //creamos a nuestro personaje, nuestra Wenge
		this.player.dash=this.player_b.dash;
		this.player.velocity=this.player_b.velocity;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this,'l_aceite');

		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan[i]=(new Van(this,0,-1000 - i*100));
		}
		this.poolVan=new Pool(this,arrayVan);
	

		let arrayBike=[];
		for(let i=0;i<3;i++)
		{
			arrayBike[i]=(new Moto(this,0,-1000+i*100));
		}
		this.poolBike=new Pool(this,arrayBike);

		this.physics.add.overlap(this.poolBike.getPhaserGroup(),this.poolBike.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolBike.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{this.Explosiones(obj1,obj2)});

	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	BikeisOut(vehicles)
	{
		this.poolBike.release(vehicles);
	}
	
  	 pitido()
   	{
	   //this.pitido1.play();
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
		//if (this.player.life.lifes == 0) this.scene.start("gameover");
		if (this.player.life.lifes <= 0){
			
			this.player.alive=false;
			this.scene.start("gameover",{name:"tomatico",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		this.timeDelta= this.timeDelta+dt;
	
		if(this.Barra.fin()){
			this.music.stop();
			this.money.AddMoney(200);
			this.scene.start("EscenaHablar",{name:"Aceite_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
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
			this.ambulance=new Ambulance(this,vehicleX-10,-335);
			
		}
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
					
					this.poolBike.spawn(vehicleX,0,'idle_bike');

				
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
 
