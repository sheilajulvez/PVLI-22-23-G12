
import Button from '../components/Buttom.js';
export default class Pause extends Phaser.Scene{
	constructor(){
		super({key:'pause'});
		this.Botones =[ ];
	}
	preload(){
		this.load.image("Pause","assets/gameOver.png" );
	}
	create(){
	let button = this.add.image(500,350,'Pause');
        //button interactive
        //button.on("",()=>{
        //this.continue.resume();
        //this.scene.stop();
      //  });
	}		
    init(datos){
        this.continue = data.scene;
    }
}


// en la escena que quieres pausar es meter en un condicional al pulsar una tecla o un button
//this.scene.launch("pause,{scene: this.scene}");
//this.scene.pause();