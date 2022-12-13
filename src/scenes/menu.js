
import Button from '../components/Buttom.js';
import Economy from "../components/Economy.js"
import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge

export default class menu extends Phaser.Scene{
	constructor(){
		super({key:'menu'});
		this.Botones =[ ];
	}
	create(){
		this.add.image(500,350,'fondoIni');
		this.money=new Economy(this);
		this.player=new Wenge(this, 800, 800,"idle_Wenge"); //creamos a nuestro personaje, nuestra Wenge
		this.Botones.push(new Button(this, 550,500, 'start_button', 'MapNiveles',null, 0,0,this.player,this.money)) 
        this.player.life.free();
	}
}