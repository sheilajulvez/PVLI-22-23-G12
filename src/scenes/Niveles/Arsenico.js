
import Car from '../../characters/Vehiculos/Car.js';//importamos a los Coches
import Generical from '../../scenes/generical.js';
import Van from '../../characters/Vehiculos/Van.js';
import Pool  from '../../characters/Pool.js';
import Wenge from '../../characters/Wenge.js'; //importamos al caracter de Wenge

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

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
		super.create();
		this.Inicia(this);
		this.money.SetScene(this);
		this.timeDelta=0;
		this.car=new Car(this,0,-1000);
		this.player=new Wenge(this, 400, 600,this.player_b.anim); 
		this.player.velocity=this.player_b.velocity;
		this.player.dash=this.player_b.dash;
		this.player.outfits=this.player_b.outfits;
		this.player.life=this.player_b.life;
		this.player.life.SetScene(this,'l_veneno');
		this.physics.add.existing(this.car);

		let arrayCoches=[];
		
		for(let i=0; i<5;i++)
		{
			arrayCoches.push(this.car);
		}
		
		this.poolCar=new Pool(this,arrayCoches);	
		this.van=new Van(this,0,-1000);
		this.physics.add.existing(this.van);

		

		this.music=this.sound.add('musica4');
		this.music.play();
				
		let arrayVan=[];
		for(let i=0; i<5;i++)
		{
			arrayVan.push(this.van);
		}
		this.poolVan=new Pool(this,arrayVan);
		this.physics.add.collider(this.player, this.car);
		if(this.physics.collide(this.player, this.car)) {
    		console.log("Hay colisión");}
		
		
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
			this.money.AddMoney(200);
			this.music.stop();
			this.scene.start("EscenaHablar",{name:"Arsenico_fin",stay:this.stay,dinero:this.money,wenge:this.player} )
		}
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