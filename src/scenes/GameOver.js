//importamos los scripts
import button from "../components/Buttom.js"
export default class GameOver extends Phaser.Scene{
	constructor(){
		super({key:'gameover'});
		this.Botones =[ ];
	}
	create(){
		//creamos la imagen y el boton de vuelta al inicio
		this.add.image(500,350,'GameOverImage');
		this.button=new button(this,300,600,"quit_buttom","MapNiveles",this.nivel,this.stay,this.stay,this.wenge,this.money)
	}	
	//metodo que se llama al iniciar la escena
	init(datos)
	{
		this.nivel=datos.name;
        this.stay = 0; 
		this.money=datos.dinero;
		this.wenge=datos.wenge;
		this.wenge.life.AddVida();
		this.wenge.life.AddVida();
		this.wenge.life.AddVida();
		
    }	
}