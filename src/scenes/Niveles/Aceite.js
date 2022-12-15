//importamos todas las clases necesarias el nivel
import Generical from '../../scenes/generical.js';
import Moto from '../../characters/Vehiculos/Moto.js'
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge
//funcion que genera un random comprendido entre el mínimo y el máximo indicado
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//escena del tercer nivel
export default class Aceite extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		//creamos el nombre con el que llamar a la escena
		super('Aceite');
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
		this.Inicia(this);
		//inicializamos el tiempo a 0 para la barra
		this.timeDelta=0;
		//configuracion del sonido
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
		//sonnido de explosion 
		this.explosionSound = this.sound.add('explosionSound',config1);
		this.music= this.sound.add('musica5',config1);
		this.music.play();
		this.pitido1 = this.sound.add('pitido1',config1);
		//configuracion de wenge
		this.player=new Wenge(this, 400, 600,this.player_b.anim);
		this.player.dash=this.player_b.dash;
		this.player.velocity=this.player_b.velocity;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this,'l_aceite');	
		//cramos un array con las motos, que despues añadiremos a la pool
		this.arrayBike=[];
			this.arrayBike[0]=(new Moto(this,0,-1000+0,"idle_Moto"));
			this.arrayBike[1]=(new Moto(this,0,-1000+100,"idle_Moto_verde"));
			this.arrayBike[2]=(new Moto(this,0,-1000+200,"idle_Moto_roja"));
			this.arrayBike[3]=(new Moto(this,0,-1000+300,"idle_Moto_amarilla"));
		//añadimos la pool
		this.poolBike=new Pool(this,this.arrayBike);
		//creamos las colisiones entre los objetos (ambos tienen que pertenecer a la misma pool)
		this.physics.add.overlap(this.poolBike.getPhaserGroup(),this.poolBike.getPhaserGroup(),(obj1,obj2)=>{
			//si su body esta activado, se crea una explosion
			 if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			 this.poolBike.release(obj1);
			 this.poolBike.release(obj2);
		});
		//creación de la textura de renderizado para efecto de noche
		const rt = this.make.renderTexture({
			width:1000,
			height:700,
		}, true)

		// mascara en negro y con opacidad 0.7
		rt.fill(0x000000, 0.7)
		//container para todas las luces
		this.lights_mask = this.make.container(0, 0);
		/*  vision mask -  cada luz */
		this.moto0 = this.make.sprite({
			x: 400,
			y: 300,
			key: 'mask',
			add: false,
		});
		this.moto1 = this.make.sprite({
			x: 400,
			y: 300,
			key: 'mask',
			add: false,
		});
		this.moto2 = this.make.sprite({
			x: 400,
			y: 300,
			key: 'mask',
			add: false,
		});
		this.moto3 = this.make.sprite({
			x: 400,
			y: 300,
			key: 'mask',
			add: false,
		});
		// añadir las imagenes al container
		this.lights_mask.add( [ this.moto0,this.moto1,this.moto2,this.moto3] );
		//ocultamos el container
		this.lights_mask.setVisible(false);

		// añadimos las imagenes a la mascara rt
		rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.lights_mask );
		rt.mask.invertAlpha = true
	}
	//Cuando un coche sale del canvas, se devuelve a la pool
	BikeisOut(vehicles)	{
		this.poolBike.release(vehicles);
	}
	//
	update(t,dt)
	{
		//update del padre 
		super.update();
		//contador que acumula dt
		this.timeDelta= this.timeDelta+dt;
		//si tus vidas son 0
		if (this.player.life.lifes <= 0){
			//paras la música
			this.music.stop();
			this.player.alive=false;
			//instancias el game over
			this.scene.start("gameover",{name:"tomatico",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		//si la barra llega a su fin significa que te has pasado el nivel
		if(this.Barra.fin()){
			//paras la musica del juego
			this.music.stop();
			//añades el dinero
			this.money.AddMoney(200);
			//cargas la escena hablar 
			this.scene.start("EscenaHablar",{name:"Aceite_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		//si el contador llega a ese numero, se creará un coche nuevo
		if(this.timeDelta>1000)
		{
			//compruebas si hay explosion
			if(this.exp){this.explosion.destroy();}
			//creas un random para la posicion
			let pos=random(0,5);
			this.timeDelta=0;
			let vehicleX=0;
			//cambias la posicion en funcion del random
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
			//instancias la moto
			this.poolBike.spawn(vehicleX,0,"outita");
			
		}
		//asignacion de la posicion a las motos
		this.moto0.y =this.arrayBike[0].y+90;
		this.moto0.x =this.arrayBike[0].x;
		this.moto1.y =this.arrayBike[1].y+90;
		this.moto1.x =this.arrayBike[1].x
		this.moto2.y =this.arrayBike[2].y+90;
		this.moto2.x =this.arrayBike[2].x
		this.moto3.y =this.arrayBike[3].y+90;
		this.moto3.x =this.arrayBike[3].x
		//actualizacion de las vidas del jugador
		this.player.life.Update();
	}

}
 
