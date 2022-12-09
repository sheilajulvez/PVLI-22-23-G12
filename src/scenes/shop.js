
	import Extra_life from "../components/Extra_life_button.js"
	import Dash_button from "../components/Dash_button.js"
	import outfits_button from "../components/outfits_button.js";
	import velocity_button from	"../components/velocity_button.js"

	export default class Shop extends Phaser.Scene{
		constructor(scenekey){
			super({key: "shop"});
		 	 console.log("aqui?");
	
		}
		init(datos){
			this.money=datos.dinero;
			this.wenge=datos.wenge;
			this.stay=datos.stay;
		}
		preload(){
			this.load.image("cuadrado_tienda","assets/tienda/TIENDA_BONITO.png")
			this.load.image("fondo_shop","assets/tienda/tienda.png");
			this.load.image("salida_button","assets/tienda/salida_button.png");
		//	this.load.image("velocity_button","assets/tienda/velocity_button.png");
			this.load.image("velocity_explanation","assets/tienda/velocity_explicacion.png");
			this.load.image("motomami","assets/tienda/motomami_button.png");
			this.load.image("motomami_explanation","assets/tienda/motomami_outfit_explicacion.png");
			this.load.image("daltonismo","assets/tienda/daltonismo_button.png");
			this.load.image("daltonismo_explicacion","assets/tienda/daltonismo_outfit_explicacion.png");
			this.load.image("nueva_coleccion","assets/tienda/nueva_coleccion_button.png");
			this.load.image("nuevacoleccion_explicacion","assets/tienda/nuevacoleccion_outfit_explicacion.png");
			this.load.image("velocity","assets/tienda/velocity_button.png");
			this.load.image("extra_life","assets/tienda/life_button.png");
			this.load.image("extra_life_explanation","assets/tienda/life_explicacion.png");
			this.load.image("dash_image","assets/tienda/dash_button.png");
			this.load.image("dash_explicacion","assets/tienda/dash_explicacion.png");
			this.load.audio("music","assets/sounds/shopMusic1.mp3");
			this.load.audio("buy","assets/sounds/buy.mp3");
			
		}
		create()
		{const config=
			{
				mute: false,
				volume: 0.1,
		 	 rate: 1,
			    detune: 0,
				seek: 0,
				loop: true,
				delay: 0,
			}
		
			
			this.music=this.sound.add("music",config);
			this.music.play();
			this.add.image(0,0,"fondo_shop").setOrigin(0,0).setScale(0.5,0.7);
			//this.add.image("velocity_button",300,300);
			//this.add.sprite("velocity_button",600,600);
			this.add.image(-50,120,"cuadrado_tienda").setScale(0.36,0.53).setOrigin(0,0);
			let a=this.add.image(100,225,"salida_button").setInteractive().setScale(1.5,1.5);
			a.on("pointerdown",()=>{
				this.music.stop();
				this.scene.start("MapNiveles",{stay:this.stay,dinero:this.money,wenge:this.wenge})
			});
			this.nueva_coleccion=new outfits_button(100,600,this,this.money,"nueva_coleccion",this.wenge,"Wenge_nuevacoleccion");
			//Wenge_nuevacoleccion  Wenge_motomami    Wenge_daltonismo

			this.add.image(50,450,"nuevacoleccion_explicacion").setScale(0.5,0.5);;
			
			this.motomami=new outfits_button(250,600,this,this.money,"motomami",this.wenge,
			"Wenge_motomami");
			this.add.image(200,450,"motomami_explanation").setScale(0.5,0.5);;
			this.daltonismo=new outfits_button(400,600,this,this.money,"daltonismo",this.wenge, "Wenge_daltonismo");

			this.add.image(350,450,"daltonismo_explicacion").setScale(0.5,0.5);;
			this.extre_life=new Extra_life(550,600,this,this.money,"extra_life",this.wenge);
			this.add.image(500,450,"extra_life_explanation").setScale(0.5,0.5);;
			if(this.wenge.velocity<=500){
				
				this.velocity=new velocity_button(700,600,this,this.money,"velocity",this.wenge);
			}
			this.add.image(650,450,"velocity_explanation").setScale(0.5,0.5);
			if(this.wenge.dash==false){
				console.log(this.wenge.dash);
				this.dash=new Dash_button(850,600,this,this.money,"dash_image",this.wenge);
			}
			
			this.add.image(800,450,"dash_explicacion").setScale(0.5,0.5);
			//this.extra_life_button.preload();
			//this.ShowMoney();
			this.nueva_coleccion.create();
			this.motomami.create();
			this.daltonismo.create();
			this.extre_life.create();
			if(this.wenge.velocity<=500)
			this.velocity.create();
			if(this.wenge.dash==false)
			this.dash.create();
			this.money.SetScene(this);
			this.money.ShowMoney();


		}   
		
	
		


	}