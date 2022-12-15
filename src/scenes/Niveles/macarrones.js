import Generical from '../../scenes/generical.js';
import Wenge from '../../characters/Wenge.js'
import Pool  from '../../characters/Pool.js';
import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Van from '../../characters/Vehiculos/Van.js';
//creaccion dee la funcion randoom
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//clase macarrones
export default class Macarrones extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('tomatico');
	}

	create(){
		//create del padre
		super.create();
		//inicias el tiempo (en relación al respawn de los vehículos) a 0
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
		
		//Creamos a nuestro peronaje y asingamos las variables necesarias
		this.player=new Wenge(this, 400, 600,this.player_b.anim);
		this.player.dash=this.player_b.dash;
		this.player.velocity=this.player_b.velocity;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this,'l_macarrones');

		//creacion del las pool
		let arrayCoches=[]
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
	//cuando sale un chche
	CarisOut(vehicles)
	{
		this.poolCar.release(vehicles);
	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	//metodo que se ejecuta al cargar la escena
	init(datos)
	{
        this.stay = datos.stay; 
		this.money=datos.dinero;
		this.player_b=datos.wenge;
		
    }
	//bucle del juego
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
			this.scene.start("EscenaHablar",{name:"tomatico_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.timeDelta>2000)
		{
			if(this.exp){this.explosion.destroy();}
	   	 	var rand=random(0,1);

			//COCHE
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
			//FURGONETA 
			else if(rand==1)
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
					
				this.poolVan.spawn(vehicleX,0,'idle_WhiteCar');
			}
		}
		//update de wenge
		this.player.life.Update();
	}
}