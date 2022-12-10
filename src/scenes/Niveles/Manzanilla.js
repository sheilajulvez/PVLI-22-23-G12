
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

	preload(){
		super.preload();
		this.Inicia(this);
		this.money.SetScene(this);
		this.load.spritesheet('Car', 'assets/BlueCar.png', {frameWidth:200 , frameHeight:280});
		this.load.spritesheet('Van', 'assets/WhiteCar.png', {frameWidth:166 , frameHeight:	233	});

		this.load.image('noche', 'assets/noche.png');

		//creas la mascara
		this.load.image('mask', 'assets/mask.png');
	}
	init(datos){
        this.stay = datos.stay;
		this.money=datos.dinero;
		this.player_b=datos.wenge;
		
        
    }
	create(){
		this.money.ShowMoney();
		super.create();
		this.timeDelta=0;
		this.car=new Car(this,0,-1000);
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
		this.player.dash=this.player_b.dash;
		this.player.velocity=this.player_b.velocity;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this);
		this.physics.add.existing(this.car);

		let arrayCoches=[];
		
		for(let i=0; i<5;i++)
		{
			arrayCoches.push(this.car);
		}
		
		this.poolCar=new Pool(this,5,arrayCoches);	
		this.van=new Van(this,0,-1000);
		this.physics.add.existing(this.van);

		



				
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan.push(this.van);
		}
		this.poolVan=new Pool(this,5,arrayVan);
		
		//this.physics.add.existing(this.player);// lo haces objeto físico

		this.physics.add.collider(this.player, this.car);
		if(this.physics.collide(this.player, this.car)) {
    		console.log("Hay colisión");}



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
        /* vision mask -  cada luz */
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