//escena final,despues de pasarte todos los niveles
export default class Escena_final extends Phaser.Scene{
    constructor(scenekey){
        super({key:"Escena_final"});

    }
    create(){
        //configuracion del sonido
        const config =
		{
			 mute: false,
 			 volume: 0.1,
 		 	 rate: 1,
			 detune: 0,
 			 seek: 0,
 			 loop: false,
 			 delay: 0,
		}
		this.music = this.sound.add('musica7',config);
       //creas dos botones que te permiten elegir que final quieres hacer
        let text=this.add.image(500,300,"pregunta");
        let si=this.add.image(300,400,"SI").setInteractive();
        let no=this.add.image(600,400,"NO").setInteractive();
        si.on("pointerdown",()=>{
            si.setVisible(false);
            no.setVisible(false);
            text.setVisible(false);
            this.music.play();
            let a=this.add.image(500,3000,"si_se_la_das").setScale(1,1);
             this.tweens.add({
                targets: [ a ],
                y: -2000,
                duration: 209999,
        
                repeat: false
            }); 
        });
        no.on("pointerdown",()=>{
            si.setVisible(false);
            no.setVisible(false);
            text.setVisible(false);
            this.music.play();
            let a=this.add.image(500,3000,"no_se_la_das").setScale(1,1);
            this.tweens.add({
               targets: [ a ],
               y: -2000,
               duration: 209999,
               // ease: 'Sine.easeInOut',
               // flipX: true,
               // yoyo: true,
               repeat: false
           }); 
        })
        //creas el tween de la imagen decision si
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
        //creas el tween de la imagen decision no
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