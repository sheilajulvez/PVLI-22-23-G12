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
        
        this.scenekey=datos.name;
       console.log(this.scenekey);
        
    }
    
	preload(){
		
	this.load.image("Wengecara", 'assets/wengeCara.png');
    this.load.image("Rosi",'assets/rosalia.png');
    this.load.image("Presi","assets/presi.png");
    this.load.image("PatryRuncha","assets/PatryRuncha.png");
    this.load.image("cajita","assets/cajastexto/guardate.png");

   
   
		
	}


    create(){
        this.add.image(340,830,"cajita").setScale(1.7,1.3);
        this.add.image(800,300,'Wengecara').setScale(0.8,0.8);
        if(this.scenekey=="tomatico"){
            
            this.add.image(300,300,'Rosi').setScale(1,1);
        }
        if(this.scenekey=="Arsenico"){
            this.add.image(300,300,'PatryRuncha').setScale(1,1);
        }
        if(this.scenekey=="Arsenico_fin"){
            this.add.image(300,300,"Presi");
        }
        
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
			if(a<Textos.longitud-1){

                a++;
                text.setText(Textos[this.scenekey][a]);
                
            }
            else{
               if(this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"||this.scenekey=="Arsenico_fin"||
                 this.scenekey=="Croquetas_fin"||this.scenekey=="Manzanilla_fin"){
                    this.scene.start("MapNiveles");
                }
                else this.scene.start(this.scenekey);

            }



		})
    }

}
		