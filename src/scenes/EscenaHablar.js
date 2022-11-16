
import Textos from "../characters/Textos.js"
import Macarrones from "./macarrones.js";


export default class EscenaHablar extends Phaser.Scene{
    constructor(scenekey){
		super({key: "EscenaHablar"});
        
		

	}
    init(datos){
        
        this.scenekey=datos.name;
       
        
    }
    
	preload(){
		
	this.load.image("Wengecara", 'assets/wengeCara.png');
    this.load.image("Rosi",'assets/rosalia.png');
    this.load.image("Presi","assets/presi.png");
    this.load.image("PatryRuncha","assets/PatryRuncha.png");
    //this.load.Sprite("cajita","assets/cajastexto/guardate.png")
   
   
		
	}


    create(){
        this.add.image(800,300,'Wengecara').setScale(0.8,0.8);
        if(this.scenekey=="macarrones"){
            
            this.add.image(300,300,'Rosi').setScale(1,1);
        }
       // let cajita = new Phaser.GameObjects.Sprite(this.scene, 0, -50,"cajita");
        //cajita.setScale(w, h);
        //cajita.setOrigin(0.5, 0.5);
       this.DisplayText(0);
        
    }

    DisplayText(number){
       
        
        this.textButton(300,600,Textos[this.scenekey][0],0);
    }




    textButton(x, y, message,a){
       
       
		let text = this.add.text(x, y, message);
		text.setOrigin(0.3,0.3);
		text.setAlign('center');
		text.setInteractive();
		text.on('pointerdown', ()=>{
			if(a<Textos.longitud){

                a++;
                text.setText(Textos[this.scenekey][a]);
            }
            else{
               
                this.scene.start('macarrones');

            }



		})
    }




}