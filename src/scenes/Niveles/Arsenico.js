
import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Vehiculos/Van.js';
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge
import Moto from '../../characters/Vehiculos/Moto.js'
//creaccion dee la funcion randoom
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//clase nivel 5
export default class Arsenico extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('Arsenico');
	}
	init(datos){
        this.stay = datos.stay;
		this.money=datos.dinero;
		this.player_b=datos.wenge;
    }

	create(){
		//create del padre
		super.create();
		this.timeDelta=0;
		this.Inicia(this);
		//configuración del sonido
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
		this.music = this.sound.add("musica2",config);
		this.music.play();
		//Creacion del personaje y asignacion de variables
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
		this.player.dash=this.player_b.dash;
		this.player.velocity=this.player_b.velocity;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this,'l_veneno');

		//creacion del las pool
		let arrayCoches=[];
		for(let i=0; i<5;i++)
		{
			arrayCoches[i]=(new Car(this,0,-1000-i*200));
		}
		this.poolCar=new Pool(this,arrayCoches);

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

		this.music=this.sound.add('musica4');
		this.music.play();
				
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan[i]=(new Van(this,0,1000 + i*200));
		}
		this.poolVan=new Pool(this,arrayVan);

		this.arrayBike=[];
		for(let i=0;i<4;i++)
		{
			this.arrayBike[i]=(new Moto(this,0,-1000+i*100,"idle_Moto"));
			this.arrayBike[i+1]=(new Moto(this,0,-1000+(i+1)*100,"idle_Moto_verde"));
			this.arrayBike[i+2]=(new Moto(this,0,-1000+(i+2)*100,"idle_Moto_roja"));
			this.arrayBike[i+3]=(new Moto(this,0,-1000+(i+3)*100,"idle_Moto_amarilla"));
			i=i+3;
		}
		this.poolBike=new Pool(this,this.arrayBike);
		this.physics.add.overlap(this.poolBike.getPhaserGroup(),this.poolBike.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});

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
			this.scene.start("EscenaHablar",{name:"Arsenico_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.timeDelta>2000)
		{
			if(this.exp){this.explosion.destroy();}
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
			var rand=random(0,2);
			//rando coche
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
						
					this.poolCar.spawn(vehicleX,0,'idle_BlueCar');

				
			}
			//furgoneta
			else if(rand===1)
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
			else if(rand ===2){
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
			
			this.poolBike.spawn(vehicleX,0,"outita");
			}
		}
		this.player.life.Update();
	}
}