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
        
    }
    
	preload(){
		
	
   
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
       console.log(this.comprueba2)
      
        this.texto_largo={
            
            a:0,
            txt:Textos[this.scenekey],
            identificador:this.scenekey,
           
            b:this.textButton(100,600,Textos[this.scenekey][0],this.scenekey),
        };
        if(this.scenekey=="Arsenico_fin"||this.scenekey=="Manzanilla_fin"||this.scenekey=="Croquetas_fin"
        ||this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"){
            
           
            this.add.image(900,925,"texto_wenge_2").setScale(3,3);
            this.add.image(900,900,"texto_wenge_1").setScale(4,4);
            this.opcion2=this.add.image(680,565,"texto_wenge_3").setInteractive().setScale(0.6,0.6)
            this.opcion1= this.add.image(820,630,"texto_wenge_3").setInteractive().setScale(0.6,0.6)
            this.opcion_a={
            
                a:0,
                txt:Textos[this.nombre],
                identificador:this.nombre,
               
                b:this.textButton(600,550,Textos[this.nombre][0],this.nombre),
            };
            this.opcion_b={
                
                a:0,
                txt:Textos[this.nombre2],
                identificador:this.nombre2,
    
                b:this.textButton(760,630,Textos[this.nombre2][0],this.nombre2),
            };
            this.opcion1.on("pointerdown",()=>{
                let rand=random(0,6);
                this.arrayHablar[rand].play();
                console.log("entraaa");
                this.opcion1.scene.tweens.add(
                    {
                        targets: this.opcion1,
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
                console.log(Textos[this.comprueba][this.opcion_a.a]);
                if(Textos[this.comprueba][this.opcion_a.a]){
                    this.money.AddMoney(50);
                    this.money.SetText();
                   
                }
                this.Siguiente();
            })
            this.opcion2.on("pointerdown",()=>{
                let rand=random(0,6);
                this.arrayHablar[rand].play();
                this.opcion2.scene.tweens.add(
                    {
                        targets: this.opcion2,
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
                if(Textos[this.comprueba2][this.opcion_b.a]){
                    this.money.AddMoney(50);
                    this.money.SetText();
                 }
                 this.Siguiente();
            }
            )

             
  
            


console.log(this.opcion_b.a);
console.log(Textos[this.comprueba2]);


           
        }
        else{
            this.cajita.setInteractive();
            this.cajita.on("pointerdown",()=>{
                let rand=random(0,6);
                this.arrayHablar[rand].play();
                this.Siguiente();
              
            })
        }
        if(this.scenekey!="tomatico"){
            this.money.SetScene(this);
            this.money.ShowMoney();
            console.log("nananananan");}
     //  this.ShowMoney();
 
        
    }


    Siguiente(){
        this.siguiente_texto();
        if(this.texto_largo.a==Textos.longitud){
            if(this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"||
              this.scenekey=="Croquetas_fin"||this.scenekey=="Manzanilla_fin"){
                 this.scene.start("MapNiveles",{stay:this.stay,dinero:this.money,wenge:this.player},)
         
             }
             if(this.scenekey=="Arsenico_fin"){
                this.scene.start("Escena_final");
             }
             else this.scene.start(this.scenekey,{stay:this.stay,dinero:this.money,wenge:this.player});}

    }

 
    siguiente_texto(){
        if(this.scenekey=="Arsenico_fin"||this.scenekey=="Manzanilla_fin"||this.scenekey=="Croquetas_fin"
        ||this.scenekey=="tomatico_fin"||this.scenekey=="Aceite_fin"){
            this.opcion_a.a++;
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
		

        
      
		
        return text;

    }

}
		