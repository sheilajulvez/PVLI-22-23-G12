
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
			
			this.load.image("fondo_shop","assets/tienda/tienda.png");
			this.load.image("salida_button","assets/tienda/salida_button.png");
			this.load.image("velocity_button","assets/tienda/velocity_button.png");
			this.load.image("motomami","assets/tienda/motomami_button.png");
			this.load.image("daltonismo","assets/tienda/daltonismo_button.png");
			this.load.image("nueva_coleccion","assets/tienda/nueva_coleccion_button.png");
			this.load.image("velocity","assets/tienda/velocity_button.png");
			this.load.image("extra_life","assets/tienda/life_button.png");
			this.load.image("dash_image","assets/tienda/dash_button.png");
			this.load.audio("music","assets/sounds/videoplayback.mp3");
		}
		create()
		{
			this.music=this.sound.add("music");
			this.music.play();
			this.add.image(0,0,"fondo_shop").setOrigin(0,0).setScale(0.5,0.7);
			//this.add.image("velocity_button",300,300);
			//this.add.sprite("velocity_button",600,600);
			let a=this.add.image(200,200,"salida_button").setInteractive();
			a.on("pointerdown",()=>{
				this.scene.start("MapNiveles",{stay:this.stay,dinero:this.money,wenge:this.wenge})
			});
			this.nueva_coleccion=new outfits_button(100,600,this,this.money,"nueva_coleccion",this.wenge);
			this.motomami=new outfits_button(250,600,this,this.money,"motomami",this.wenge);
			this.daltonismo=new outfits_button(400,600,this,this.money,"daltonismo",this.wenge);
			this.extre_life=new Extra_life(550,600,this,this.money,"extra_life",this.wenge);
			this.velocity=new velocity_button(700,600,this,this.money,"velocity",this.wenge);
			this.dash=new Dash_button(850,600,this,this.money,"dash_image",this.wenge);
			//this.extra_life_button.preload();
	
			this.nueva_coleccion.create();
			this.motomami.create();
			this.daltonismo.create();
			this.extre_life.create();
			this.velocity.create();
			this.dash.create();
		}    
	}