export default class Escena_final extends Phaser.Scene{
    constructor(scenekey){
        super({key:"Escena_final"});

    }
    create(){
        let text=this.add.image(500,300,"pregunta");
        let si=this.add.image(300,400,"SI").setInteractive();
        let no=this.add.image(600,400,"NO").setInteractive();
        si.on("pointerdown",()=>{
            si.setVisible(false);
            no.setVisible(false);
            text.setVisible(false);
            let a=this.add.image(500,3000,"si_se_la_das").setScale(1,1);
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
            let a=this.add.image(500,3000,"no_se_la_das").setScale(1,1);
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