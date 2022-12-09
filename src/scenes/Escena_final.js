export default class Escena_final extends Phaser.Scene{
    constructor(scenekey){
        super({key:"Escena_final"});
       console.log("Escena_final"); 

    }
    preload(){   

        this.load.image("pregunta","assets/escena_fin/darle_la_manzanilla.png");
        this.load.image("SI","assets/escena_fin/SI.png");
        this.load.image("NO","assets/escena_fin/NO.png");
        this.load.image("si_se_la_das","assets/escena_fin/si_se_la_das.png");
        this.load.image("no_se_la_das","assets/escena_fin/no_se_la_das.png");
    }
    create(){
        let text=this.add.image(500,300,"pregunta");
        let si=this.add.image(300,400,"SI").setInteractive();
        let no=this.add.image(600,400,"NO").setInteractive();
        si.on("pointerdown",()=>{
            si.setVisible(false);
            no.setVisible(false);
            text.setVisible(false);
            let a=this.add.image(500,800,"si_se_la_das").setScale(0.3,0.3);
             this.tweens.add({
                targets: [ a ],
                y: -1000,
                duration: 100000,
                // ease: 'Sine.easeInOut',
                // flipX: true,
                // yoyo: true,
                repeat: 1
            }); 
        });
        no.on("pointerdown",()=>{
            si.setVisible(false);
            no.setVisible(false);
            text.setVisible(false);
            let a=this.add.image(500,800,"si_se_la_das").setScale(0.3,0.3);
            this.tweens.add({
               targets: [ a ],
               y: -1000,
               duration: 100000,
               // ease: 'Sine.easeInOut',
               // flipX: true,
               // yoyo: true,
               repeat: 1
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