
import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Vehiculos/Van.js';
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Manzanilla extends Generical { //creamos la escena exportada/extendida de Phaser
	constructor(){
		super('Manzanilla');
	}
	
	create(){
		super.create();
		this.timeDelta=0;
		this.Inicia(this);
		this.money.SetScene(this);
		this.money.ShowMoney();
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
		
		this.music= this.sound.add('musica1',config1);
		this.music.play();
		this.pitido1 = this.sound.add('pitido1',config1);
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
		this.player.dash=this.player_b.dash;
		this.player.velocity=this.player_b.velocity;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this);
		this.arrayCoches=[];
		
		for(let i=0; i<5;i++)
		{
			this.arrayCoches[i]=(new Car(this,0,-1000-i*100));
		}
		this.poolCar=new Pool(this,this.arrayCoches);
			
		this.arrayVan=[];
		for(let i=0; i<5;i++)
		{
			this.arrayVan[i]=(new Van(this,0,-1000 - i*100));
		}
		this.poolVan=new Pool(this,this.arrayVan);
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolCar.getPhaserGroup(),(obj1,obj2)=>{console.log("coche coche"); this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolCar.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ console.log("coche furgo");this.Explosiones(obj1,obj2)});
		this.physics.add.overlap(this.poolVan.getPhaserGroup(),this.poolVan.getPhaserGroup(),(obj1,obj2)=>{ console.log("furgo furgi");this.Explosiones(obj1,obj2)});

	

			//creación de la textura de renderizado para efecto de noche
		const rt = this.make.renderTexture({
			width:1000,
			height:700,
		}, true)

		// fill it with black
		rt.fill(0x000000, 0.7)
		//container para todas las luces
		this.lights_mask = this.make.container(0, 0);
      /*  vision mask -  cada luz */
        this.carmask0 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false
        });
		this.carmask1 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false
        });
		this.carmask2 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false
        });
		this.carmask3 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false
        });
		this.carmask4 = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false
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
        /* vision mask -  cada luz FIN */

        // adding the images to the container
        this.lights_mask.add( [ this.carmask0,this.carmask1,this.carmask2,this.carmask3,this.carmask4,
			this.vanmask0,this.vanmask1,this.vanmask2,this.vanmask3,this.vanmask4] );

        // now this is the important line I did not expect:
        // the lights container was being drawn into the scene (even though I used "make" and not "add")
        this.lights_mask.setVisible(false);

        // adding the lights mask to the render texture
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
		if(this.Barra.fin()){
			this.music.stop();
			this.money.AddMoney(200);
			this.scene.start("EscenaHablar",{name:"Manzanilla_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
		this.timeDelta= this.timeDelta+dt;
		if(this.timeDelta>4000)
		{
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
				console.log("respawn");
				this.poolVan.spawn(vehicleX,0,'idle_WhiteCar');
			}
		}
			this.carmask0.y =this.arrayCoches[0].y+60;
			this.carmask0.x =this.arrayCoches[0].x-40;
			this.carmask1.y =this.arrayCoches[1].y+60;
			this.carmask1.x =this.arrayCoches[1].x-40;
			this.carmask2.y =this.arrayCoches.y+60;
			this.carmask2.x =this.arrayCoches.x-40;
			this.carmask3.y =this.arrayCoches.y+60;
			this.carmask3.x =this.arrayCoches.x-40;
			this.carmask4.y =this.arrayCoches.y+60;
			this.carmask4.x =this.arrayCoches.x-40;

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
	GameOver(){
		this.scene.start('gameover');
	}

}