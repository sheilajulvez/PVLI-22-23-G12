export default class Escena_final extends Phaser.Scene{
    constructor(scenekey){
        super({key:"Escena_final"});
       console.log("Escena_final"); 

    }
    preload(){   

        this.load.image("pregunta","assets/escena_fin/darle_la_manzanilla.png");
        this.load.image("SI","assets/escena_fin/SI.png");
        this.load.image("NO","assets/escena_fin/NO.png");
        this.load.image("si_se_la_das","assets/escena_fin/creitos_si.png");
        this.load.image("no_se_la_das","assets/escena_fin/creaditos_no.png");
    }
    create(){
        let text=this.add.image(500,300,"pregunta");
        let si=this.add.image(300,400,"SI").setInteractive();
        let no=this.add.image(600,400,"NO").setInteractive();
        si.on("pointerdown",()=>{
            si.setVisible(false);
            no.setVisible(false);
            text.setVisible(false);
            let a=this.add.image(500,2000,"si_se_la_das").setScale(1.2,1.2);
             this.tweens.add({
                targets: [ a ],
                y: -1500,
                duration: 100999,
        
                repeat: false
            }); 
        });
        no.on("pointerdown",()=>{
            si.setVisible(false);
            no.setVisible(false);
            text.setVisible(false);
            let a=this.add.image(500,2000,"no_se_la_das").setScale(1.2,1.2);
            this.tweens.add({
               targets: [ a ],
               y: -1500,
               duration: 100999,
               // ease: 'Sine.easeInOut',
               // flipX: true,
               // yoyo: true,
               repeat: false
           }); 
        })
        si.on("pointerover",()=>{
            this.tweens.add(
                {
                    targets: this,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    duration: 100,
                    yoyo: true,
                }
            );

        })
        no.on("pointerover",()=>{   
            this.tweens.add(
                {
                    targets: this,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    duration: 100,
                    yoyo: true,
                }
            );

        })

    }
    
}