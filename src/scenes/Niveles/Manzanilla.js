import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Vehiculos/Van.js';
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge

//funcion random para los coches
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//escena
export default class Manzanilla extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('Manzanilla');
	}
	
	create(){
		//create de generical
		super.create();
		this.timeDelta=0;
		this.Inicia(this);
		this.money.SetScene(this);

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

		//añades los sonidos
		this.explosionSound = this.sound.add('explosionSound',config1);
		this.music= this.sound.add('musica1',config1);
		this.music.play();
		this.pitido1 = this.sound.add('pitido1',config1);

		//configuracion de los valores de wenge
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
		this.player.dash=this.player_b.dash;
		this.player.velocity=this.player_b.velocity;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this,'l_manzanilla');

		//creacion de los coches de tipo car
		this.arrayCoches=[];
		for(let i=0; i<5;i++)
		{
			this.arrayCoches[i]=(new Car(this,0,-1000-i*100));
		}
		this.poolCar=new Pool(this,this.arrayCoches);

		//creacion de los coches de tipo van	
		this.arrayVan=[];
		for(let i=0; i<5;i++)
		{
			this.arrayVan[i]=(new Van(this,0,-1000 - i*100));
		}
		this.poolVan=new Pool(this,this.arrayVan);

		//colision entre pool de tipo coche y tipo coche
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolCar.getPhaserGroup(),(obj1,obj2)=>
		{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			 this.poolCar.release(obj1);
			 this.poolCar.release(obj2);
		});
		//colision entre pool de tipo coche y tipo van
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			this.poolCar.release(obj1);
			this.poolVan.release(obj2);

		});
		//colision entre pool de tipo van y tipo van
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{
			if (obj1.body.checkCollision.none == false) this.Explosiones(obj1,obj2)
			this.poolVan.release(obj1);
			this.poolVan.release(obj2);
			});

		//creación de la textura de renderizado para efecto de noche
		const rt = this.make.renderTexture({
			width:1000,
			height:700,
		}, true)

		// mascara en negro y con opacidad 0.4
		rt.fill(0x000000, 0.4)
		//container para todas las luces
		this.lights_mask = this.make.container(0, 0);
      /*  vision mask -  cada luz */
       this.carmask0 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false,
        });
		this.carmask1 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false,
        });
		this.carmask2 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false,
        });
		this.carmask3 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false,
        });
		this.carmask4 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false,
        });

        // campfire mask
        this.vanmask0 = this.make.sprite({
            x: 900,
            y: 300,
            key: 'mask',
            add: false,
        });this.vanmask1 = this.make.sprite({
            x: 900,
            y: 300,
            key: 'mask',
            add: false,
        });this.vanmask2 = this.make.sprite({
            x: 900,
            y: 300,
            key: 'mask',
            add: false,
        });this.vanmask3 = this.make.sprite({
            x: 900,
            y: 300,
            key: 'mask',
            add: false,
        });this.vanmask4 = this.make.sprite({
            x: 900,
            y: 300,
            key: 'mask',
            add: false,
        });
       // vision mask -  cada luz FIN 

        // añadir las imagenes al container
        this.lights_mask.add( [ this.carmask0,this.carmask1,this.carmask2,this.carmask3,this.carmask4,
			this.vanmask0,this.vanmask1,this.vanmask2,this.vanmask3,this.vanmask4] );
		//ocultamos el container
        this.lights_mask.setVisible(false);

        // añadimos las imagenes a la mascara rt
        rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.lights_mask );
        rt.mask.invertAlpha = true

	}
	CarisOut(vehicles)
	{
		this.poolCar.release(vehicles);
	}
	VanisOut(vehicles)
	{
		this.poolVan.release(vehicles);
	}
	init(datos){
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
			this.scene.start("EscenaHablar",{name:"Manzanilla_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		if(this.timeDelta>4000)
		{
			if(this.exp){this.explosion.destroy();}
			var rand=random(0,1);
			if (rand===0)
			{	
				let pos=random(0,5);
				this.timeDelta=0;
				let vehicleX=0;
				switch(pos){
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
			else if(rand===1){
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
		//asignacion de las mascaras a cada coche
		this.carmask0.y =this.arrayCoches[0].y+60;
		this.carmask0.x =this.arrayCoches[0].x-40;
		this.carmask1.y =this.arrayCoches[1].y+60;
		this.carmask1.x =this.arrayCoches[1].x-40;
		this.carmask2.y =this.arrayCoches[2].y+60;
		this.carmask2.x =this.arrayCoches[2].x-40;
		this.carmask3.y =this.arrayCoches[3].y+60;
		this.carmask3.x =this.arrayCoches[3].x-40;
		this.carmask4.y =this.arrayCoches[4].y+60;
		this.carmask4.x =this.arrayCoches[4].x-40;

		this.vanmask0.y =this.arrayVan[0].y+60;
		this.vanmask0.x =this.arrayVan[0].x-40;
		this.vanmask1.y =this.arrayVan[1].y+60;
		this.vanmask1.x =this.arrayVan[1].x-40;
		this.vanmask2.y =this.arrayVan[2].y+60;
		this.vanmask2.x =this.arrayVan[2].x-40;
		this.vanmask3.y =this.arrayVan[3].y+60;
		this.vanmask3.x =this.arrayVan[3].x-40;
		this.vanmask4.y =this.arrayVan[4].y+60;
		this.vanmask4.x =this.arrayVan[4].x-40;
		this.player.life.Update();
	}

}