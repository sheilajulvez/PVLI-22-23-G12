import Textos from "../components/Textos.js"
import Macarrones from "./Niveles/macarrones.js";
import Aceite from './Niveles/Aceite.js';
import Arsenico from './Niveles/Arsenico.js';
import Croquetas from './Niveles/Croquetas.js';
import Manzanilla from './Niveles/Manzanilla.js';

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class EscenaHablar extends Phaser.Scene{
    constructor(scenekey){
		super({key: "EscenaHablar"});
      

	}
    init(datos){
        this.stay= datos.stay;
        this.scenekey=datos.name;
        this.money=datos.dinero;
        this.player=datos.wenge;
        this.arrayHablar=[];
        console.log("escena hablar "+this.money);
        console.log("escena hablar "+this.player);
       
        
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
    this.load.image("Texto_Wenge","assets/cajastexto/texto_wenge.png");
    this.load.audio("click", 'assets/sounds/click.mp3');
    this.load.audio("talking1",'assets/sounds/talking1.mp3');
    this.load.audio("talking2",'assets/sounds/talking2.mp3');
    this.load.audio("talking3",'assets/sounds/talking3.mp3');
    this.load.audio("talking4",'assets/sounds/talking4.mp3');
    this.load.audio("talking5",'assets/sounds/talking5.mp3');
    this.load.audio("talking6",'assets/sounds/talking6.mp3');
    this.load.audio("talking7",'assets/sounds/talking7.mp3');
   
    if(this.stay>1){
        this.money.SetScene(this);
        this.money.ShowMoney();
       
    }
   
   
		
	}


    create(){
        //ponemos el fondo que toca
        this.clickSound= this.sound.add("click");
        

        for(let i=1;i<8;i++)
        {
            this.arrayHablar.push(this.sound.add("talking"+i));
        }
        


        if(this.scenekey=="tomatico"
        ||this.scenekey=="Arsenico"||this.scenekey=="tomatico_fin"||this.scenekey=="Manzanilla"
        ||this.scenekey=="Manzanilla_fin"){
            this.add.image(1,1,"fondo_soleado").setScale(1,1).setOrigin(0,0);
        }
        else if(this.scenekey=="Aceite"||this.scenekey=="Aceite_fin"||this.scenekey=="Croquetas"
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
       
       this.nombre=this.scenekey+"_a";
       this.nombre2=this.scenekey+"_b";
       this.comprueba=this.scenekey+"_comprueba_a";
       this.comprueba2=this.scenekey+"_comprueba_b";
       
      
        this.texto_largo={
            
            a:0,
            txt:Textos[this.scenekey],
            identificador:this.scenekey,
           
            b:this.textButton(100,600,Textos[this.scenekey][0],this.scenekey),
        };
        if(this.scenekey=="Arsenico_fin"||this.scenekey=="Manzanilla_fin"||this.scenekey=="Croquetas_fin"
        ||this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"){
            this.add.image(890,850,"Texto_Wenge");
            this.opcion_a={
            
                a:0,
                txt:Textos[this.nombre],
                identificador:this.nombre,
               
                b:this.textButton(650,580,Textos[this.nombre][0],this.nombre),
            };
            this.opcion_b={
                
                a:0,
                txt:Textos[this.nombre2],
                identificador:this.nombre2,
    
                b:this.textButton(790,600,Textos[this.nombre2][0],this.nombre2),
            };
           
         
           
        }
        else{
            this.cajita.setInteractive();
            this.cajita.on("pointerdown",()=>{
                let rand=random(0,6);
                this.arrayHablar[rand].play();
                this.siguiente_texto();
                if(this.texto_largo.a==Textos.longitud){
                    if(this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"||this.scenekey=="Arsenico_fin"||
                      this.scenekey=="Croquetas_fin"||this.scenekey=="Manzanilla_fin"){
                         this.scene.start("MapNiveles",{stay:this.stay,dinero:this.money,wenge:this.player},)
                 
                     }
                     else this.scene.start(this.scenekey,{stay:this.stay,dinero:this.money,wenge:this.player});}
     
            })
        }
        if(this.scenekey!="tomatico"){
            this.money.SetScene(this);
            this.money.ShowMoney();
            console.log("nananananan");}
     //  this.ShowMoney();
 
        
    }

 
    siguiente_texto(){
        if(this.scenekey=="Arsenico_fin"||this.scenekey=="Manzanilla_fin"||this.scenekey=="Croquetas_fin"
        ||this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"){
            this.opcion_a.a++;
            for(let i=1;i<8;i++)
            {
                this.arrayHablar[i].stop();             //no se donde ponerlo, tiene que ser que al pinchar la ultima vez salte esto
            }
            this.opcion_a.b.setText(this.opcion_a.txt[ this.opcion_a.a]);
            this.opcion_b.a++;
            this.opcion_b.b.setText(this.opcion_b.txt[ this.opcion_b.a]);
        }
      
        this.texto_largo.a++;
        this.texto_largo.b.setText(this.texto_largo.txt[ this.texto_largo.a]);


    }
    textButton(x, y, message,name){
       
       
		let text = this.add.text(x, y, message);
       
		
		//text.setOrigin(0.5,0.0);
		//text.setAlign('center');
        text.setTint(0x000000);
        if(name!=this.scenekey){
            text.setInteractive();
            text.on('pointerdown', ()=>{
              let rand=random(1,7);
              this.arrayHablar[rand].play();
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
                
            
                 if(name==this.nombre){
                    if(Textos[this.comprueba][this.opcion_a.a]){
                        this.money.AddMoney(50);
                        this.money.SetText();
                       
                    }
                   
                 }
                 else if(name==this.nombre2){
                    if(Textos[this.comprueba2][this.opcion_b.a]){
                       this.money.AddMoney(50);
                       this.money.SetText();
                    }
                   
                 }
                 this.siguiente_texto();
                 if(this.texto_largo.a==Textos.longitud){
                   if(this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"||this.scenekey=="Arsenico_fin"||
                     this.scenekey=="Croquetas_fin"||this.scenekey=="Manzanilla_fin"){

                       
                        for(let i=1;i<8;i++)
                        {
                            this.arrayHablar[i].stop();             //no se donde ponerlo, tiene que ser que al pinchar la ultima vez salte esto
                        }
                        console.log("antes de niveles"+this.money+" player"+this.player);
                        this.scene.start("MapNiveles",{stay:this.stay,dinero:this.money,wenge:this.player},)
                
                    }
                    else
                    {
                       
                        this.scene.start(this.scenekey,{stay:this.stay,dinero:this.money,wenge:this.player});
                    }
    
                }
               
    
              
            })
        }
		

        
      
		
        return text;

    }

}
		