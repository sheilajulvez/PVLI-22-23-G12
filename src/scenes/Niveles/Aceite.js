
import Generical from '../../scenes/generical.js';
import Moto from '../../characters/Vehiculos/Moto.js'
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge
//random para los coches
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//escena del tercer nivel
export default class Aceite extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('Aceite');
	}

	init(datos){
		//inicializacion de datos
        this.stay = datos.stay;
		this.money=datos.dinero;
		this.player_b=datos.wenge;
    }
	create(){
		//create del padre
		super.create();
		this.Inicia(this);
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
	BikeisOut(vehicles)	{
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
		this.timeDelta= this.timeDelta+dt;
		if (this.player.life.lifes <= 0){
			this.player.alive=false;
			this.scene.start("gameover",{name:"tomatico",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		
	
		if(this.Barra.fin()){
			this.music.stop();
			this.money.AddMoney(200);
			this.scene.start("EscenaHablar",{name:"Aceite_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}

		if(this.timeDelta>4000)
		{
			if(this.exp){this.explosion.destroy();}
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
		//asignacion de la posicion a las motos
		this.moto0.y =this.arrayBike[0].y+90;
		this.moto0.x =this.arrayBike[0].x;
		this.moto1.y =this.arrayBike[1].y+90;
		this.moto1.x =this.arrayBike[1].x
		this.moto2.y =this.arrayBike[2].y+90;
		this.moto2.x =this.arrayBike[2].x
		this.moto3.y =this.arrayBike[3].y+90;
		this.moto3.x =this.arrayBike[3].x

			this.player.life.Update();
	}

}
 
