import Textos from "../components/Textos.js"
import Macarrones from "./Niveles/macarrones.js";
import Aceite from './Niveles/Aceite.js';
import Arsenico from './Niveles/Arsenico.js';
import Croquetas from './Niveles/Croquetas.js';
import Manzanilla from './Niveles/Manzanilla.js';

export default class EscenaHablar extends Phaser.Scene{
    constructor(scenekey){
		super({key: "EscenaHablar"});
        
		

	}
    init(datos){
        this.stay= datos.stay;
        this.scenekey=datos.name;
       console.log(this.scenekey);
        
    }
    
	preload(){
		
	this.load.image("Wengecara", 'assets/wengeCara.png');
    this.load.image("Rosi",'assets/rosalia.png');
    this.load.image("Presi","assets/presi.png");
    this.load.image("PatryRuncha","assets/PatryRuncha.png");
    this.load.image("cajita","assets/cajastexto/guardate.png");
    this.load.image("fondo_soleado","assets/Daytime_Background_1024x800.png");
    this.load.image("fondo_noche","assets/dark background.png");
    this.load.image("jefa_wenge","assets/jefa_de_Wenge.png");
    this.load.image("Sheila","assets/Sheila.png");
    this.load.image("Twitero","assets/twitero.png");

   
   
		
	}


    create(){
        //ponemos el fondo que toca
        if(this.scenekey=="tomatico"
        ||this.scenekey=="Arsenico"||this.scenekey=="tomatico_fin"||this.scenekey=="Manzanilla"
        ||this.scenekey=="Manzanilla_fin"){
            this.add.image(1,1,"fondo_soleado").setScale(1,1).setOrigin(0,0);
        }
        else if(this.scenekey=="Aceite"||this.scenekey=="Aciete_fin"||this.scenekey=="Croquetas"
        ||this.scenekey=="Croquetas_fin"){
            this.add.image(0,0,"fondo_noche").setScale(2,2);
        }
        //personajes y fotos
       
        this.add.image(800,300,'Wengecara').setScale(0.8,0.8);
        if(this.scenekey=="tomatico"||this.scenekey=="Aceite"||this.scenekey=="Croquetas"
        ||this.scenekey=="Manzanilla"){
            
            this.add.image(300,300,'jefa_wenge').setScale(0.8,0.8);
        }
      
        if(this.scenekey=="Arsenico"){
            this.add.image(300,270,'PatryRuncha').setScale(1,1);
        }
        if(this.scenekey=="Aceite_fin"){
            this.add.image(300,270,"Rosi").setScale(1,1);
        }
        if(this.scenekey=="tomatico_fin"){
            this.add.image(300,300,"Twitero").setScale(0.6,0.6);
        }
        if(this.scenekey=="Croquetas_fin"){
            this.add.image(300,300,"Sheila").setScale(1,0.8);
        }


        if(this.scenekey=="Arsenico_fin"||this.scenekey=="Manzanilla_fin"){
            this.add.image(300,270,"Presi").setScale(1,1);
        }
      
        this.cajita= this.add.image(340,830,"cajita").setScale(1.7,1.3);
       this.DisplayText(0);
        
    }

    DisplayText(number){
       
        
        this.textButton(100,600,Textos[this.scenekey][0],0);
    }




    textButton(x, y, message,a){
       
       
		let text = this.add.text(x, y, message);

		//text.setOrigin(0.5,0.0);
		//text.setAlign('center');
        text.setTint(0x000000);
		text.setInteractive();

        
      
		text.on('pointerdown', ()=>{
            text.scene.tweens.add(
                {
                    targets: text,
                    scaleX: 0.9,
                    scaleY: 0.9,
                    duration: 150,
                    yoyo: true
                }
            );
            this.cajita.scene.tweens.add(
                {
                    targets: this.cajita,
                    scaleX: 0.9,
                    scaleY: 0.9,
                    duration: 100,
                    yoyo: true
                }
            );

			if(a<Textos.longitud-1){

                a++;
                text.setText(Textos[this.scenekey][a]);
                
            }
            else{
               if(this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"||this.scenekey=="Arsenico_fin"||
                 this.scenekey=="Croquetas_fin"||this.scenekey=="Manzanilla_fin"){
                    this.scene.start("MapNiveles",{stay:this.stay})
			
                }
                else this.scene.start(this.scenekey,{stay:this.stay});

            }



		})
    }

}
		