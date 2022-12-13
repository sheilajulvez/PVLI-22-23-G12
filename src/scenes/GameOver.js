import button from "../components/Buttom.js"
export default class GameOver extends Phaser.Scene{
	constructor(){
		super({key:'gameover'});
		this.Botones =[ ];
	}
	preload(){
		
	}
	create(){
		this.add.image(500,350,'GameOverImage');
		this.button=new button(this,300,600,"quit_buttom","MapNiveles",this.nivel,this.stay,this.stay,this.wenge,this.money)
	}	
	init(datos)
	{
		
		this.nivel=datos.name;
        this.stay = datos.stay; 
		this.money=datos.dinero;
		this.wenge=datos.wenge;
		this.wenge.life.AddVida();
		this.wenge.life.AddVida();
		this.wenge.life.AddVida();
		
    }	
}