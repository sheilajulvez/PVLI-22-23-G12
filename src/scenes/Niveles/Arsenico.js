//importamos todas las clases necesarias el nivel
import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Vehiculos/Van.js';
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge
import Moto from '../../characters/Vehiculos/Moto.js'
import Ambulance from '../../characters/Vehiculos/Ambulance.js';
import Danger from '../../characters/Danger.js';
//creaccion dee la funcion randoom
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//clase nivel 5
export default class Arsenico extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		//creamos el nombre con el que llamar a la escena
		super('Arsenico');
	}
//metodo que se ejecuta al crear la escena
	init(datos){
		//valor del nivel en el que estás
        this.stay = datos.stay;
		//cantidad de dinero que tienes
		this.money=datos.dinero;
		//wenge (para asignar las imagenes, valores... propios de wenge)
		this.player_b=datos.wenge;
    }

	create(){
		//create del padre
		super.create();
		//inicializamos el tiempo a 0 para la barra
		this.timeDelta=0;
		this.Inicia(this);
		//configuración del sonido
		const config =
		{
			 mute: false,
 			 volume: 0.01,
 		 	 rate: 1,
			 detune: 0,
 			 seek: 0,
 			 loop: false,
 			 delay: 0,
		}
		//sonnido de explosion 
		this.explosionSound = this.sound.add('explosionSound',config);
		this.music = this.sound.add("musica4",config);
		this.music.play();
		this.ambulance=new Ambulance(this,4000,0);
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
		//lo añadimos a la pool de coches
		this.poolCar=new Pool(this,arrayCoches);
		this.explosionSound = this.sound.add('explosionSound',config);
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan[i]=(new Van(this,0,1000 + i*200));
		}
		//lo añadimos a la pool de van 
		this.poolVan=new Pool(this,arrayVan);

		this.arrayBike=[];
		for(let i=0;i<4;i++)
		{
			this.arrayBike[i]=(new Moto(this,0,-1000-i*100,"idle_Moto"));
			this.arrayBike[i+1]=(new Moto(this,0,-1000-(i+10)*100,"idle_Moto_verde"));
			this.arrayBike[i+2]=(new Moto(this,0,-1000-(i+20)*100,"idle_Moto_roja"));
			this.arrayBike[i+3]=(new Moto(this,0,-1000-(i+30)*100,"idle_Moto_amarilla"));
			i=i+3;
		}
		this.poolBike=new Pool(this,this.arrayBike);
		this.physics.add.overlap(this.poolBike.getPhaserGroup(),this.poolBike.getPhaserGroup(),(obj1,obj2)=>{ this.Explosiones(obj1,obj2)});

		//colisiones coche-coche
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolCar.getPhaserGroup(),(obj1,obj2)=>
		{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			 this.poolCar.release(obj1);
			 this.poolCar.release(obj2);
		});
		//colisiones coche-moto
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolBike.getPhaserGroup(),(obj1,obj2)=>
		{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			 this.poolCar.release(obj1);
			 this.poolBike.release(obj2);
		});
		//colisiones coche-van
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			this.poolCar.release(obj1);
			this.poolVan.release(obj2);

		});
		//colisiones van-van
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			this.poolVan.release(obj1);
			this.poolVan.release(obj2);
			
		});
		//colisiones van-moto
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolBike.getPhaserGroup(),(obj1,obj2)=>{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			this.poolVan.release(obj1);
			this.poolBike.release(obj2);
			
		});	
		//colisiones ambulancia-coche
		this.physics.add.overlap(this.ambulance,this.poolCar.getPhaserGroup(),(obj1,obj2)=>
		{
			
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			 this.poolCar.release(obj2);
		});
		//colisiones ambulancia-van
		this.physics.add.overlap(this.ambulance,this.poolVan.getPhaserGroup(),(obj1,obj2)=>
		{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			 this.poolVan.release(obj2);
		});
		//colisiones ambulance-moto
		this.physics.add.overlap(this.ambulance,this.poolBike.getPhaserGroup(),(obj1,obj2)=>
		{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			 this.poolBike.release(obj2);
		});
	}
	//cuando sale un coche de la pantalla
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
		//update del padre
		super.update();
		this.timeDelta= this.timeDelta+dt;
		//si no te quedan vidas
		if (this.player.life.lifes <= 0){
			this.music.stop();
			this.player.alive=false;
			this.scene.start("gameover",{name:"tomatico",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		//si te has pasado el nivel
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
			this.ambulance.setX(vehicleX);
			this.ambulance.setY(-335);
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
		//update del padre
		this.player.life.Update();
	}
}