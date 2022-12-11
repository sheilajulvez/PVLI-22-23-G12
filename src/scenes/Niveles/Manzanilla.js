
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
		
		// this.musiquita = this.sound.add("musiquita",config);
		// this.musiquita.play();
		this.pitido1 = this.sound.add('pitido1',config1);
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
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
		this.noche = this.add.image(0,0, 1000,700, 'noche');

		//container para todas las luces
		this.lights_mask = this.make.container(0, 0);
      /*  vision mask -  cada luz */
        const vision_mask = this.make.sprite({
            x: 400,
            y: 300,
            key: 'mask',
            add: false
        });

        // campfire mask
        const campfire_mask = this.make.sprite({
            x: 900,
            y: 300,
            key: 'mask',
            add: false,
        });
        /* vision mask -  cada luz FIN */

        // adding the images to the container
        this.lights_mask.add( [ vision_mask, campfire_mask ] );

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
		else if(rand===1)
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
			console.log("respawn");
			this.poolVan.spawn(vehicleX,0,'idle_WhiteCar');
		}
		}

		
		
	}
}