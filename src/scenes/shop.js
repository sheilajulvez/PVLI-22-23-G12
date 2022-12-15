//añadimos los scripst necesarios
	import Extra_life from "../components/Extra_life_button.js"
	import Dash_button from "../components/Dash_button.js"
	import outfits_button from "../components/outfits_button.js";
	import velocity_button from	"../components/velocity_button.js"

	export default class Shop extends Phaser.Scene{
		constructor(scenekey){
			super({key: "shop"});
	
		}
		//metodo que se ejecuta al cargar la shop
		init(datos){
			this.money=datos.dinero;
			this.wenge=datos.wenge;
			this.stay=datos.stay;
		}
		create(){
			//configuracion del sonido
			const config=
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
			//añadimos la imagen de fondo
			this.add.image(0,0,"fondo_shop").setOrigin(0,0).setScale(0.5,0.7);
			this.add.image(-35,0,"cuadrado_tienda").setScale(0.36,0.53).setOrigin(0,0);
			//boton de salida
			let a=this.add.image(100,100,"salida_button").setInteractive().setScale(1.5,1.5);
			a.on("pointerdown",()=>{
				this.music.stop();
				this.scene.start("MapNiveles",{stay:this.stay,dinero:this.money,wenge:this.wenge})
			});
			this.nueva_coleccion=new outfits_button(115,450,this,this.money,"nueva_coleccion",this.wenge,"Wenge_nuevacoleccion");
			//Wenge_nuevacoleccion  Wenge_motomami    Wenge_daltonismo

			this.add.image(75,300,"nuevacoleccion_explicacion").setScale(0.5,0.5);;
			
			this.motomami=new outfits_button(270,450,this,this.money,"motomami",this.wenge,
			"Wenge_motomami");
			this.add.image(225,300,"motomami_explanation").setScale(0.5,0.5);;
			this.daltonismo=new outfits_button(430,450,this,this.money,"daltonismo",this.wenge, "Wenge_daltonismo");

			this.add.image(375,300,"daltonismo_explicacion").setScale(0.5,0.5);;
			this.extre_life=new Extra_life(575,450,this,this.money,"extra_life",this.wenge);
			this.add.image(525,300,"extra_life_explanation").setScale(0.5,0.5);;
			if(this.wenge.velocity<=500){
				
				this.velocity=new velocity_button(730,450,this,this.money,"velocity",this.wenge);
			}
			this.add.image(680,300,"velocity_explanation").setScale(0.5,0.5);
			if(this.wenge.dash==false){
				this.dash=new Dash_button(885,450,this,this.money,"dash_image",this.wenge);
			}
			
			this.add.image(835,300,"dash_explicacion").setScale(0.5,0.5);
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