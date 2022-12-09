
import Button from '../components/Buttom.js';
import Economy from "../components/Economy.js"
import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge

export default class menu extends Phaser.Scene{
	constructor(){
		super({key:'menu'});
		this.Botones =[ ];
	}
	preload(){
		//menu
		this.load.image("fondoIni","assets/ini.png");
		this.load.image("start_button","assets/Play.png");
		//creacion de wenge
		this.load.spritesheet('Wenge', 'assets/wengeSprite.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Wenge_motomami', 'assets/tienda/wengeSprite_motomami.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Wenge_daltonismo', 'assets/tienda/wengeSprite_daltonica.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Wenge_nuevacoleccion', 'assets/tienda/wengeSprite_nuevacoleccion.png', {frameWidth: 633, frameHeight:394});
		this.load.image('Life', 'assets/vidas.png');
		this.load.audio('dash', 'assets/sounds/fium.mp3');
		this.load.audio('skate1','assets/sounds/skate1.mp3');
		this.load.audio('skate2','assets/sounds/skate2.mp3');
		this.load.audio('skate3','assets/sounds/skate3.mp3');
		this.load.audio("click", 'assets/sounds/click.mp3');

	}
	create(){
		this.add.image(500,350,'fondoIni');
		this.money=new Economy(this);
		this.player=new Wenge(this, 800, 800,"idle_Wenge"); //creamos a nuestro personaje, nuestra Wenge
		this.Botones.push(new Button(this, 550,500, 'start_button', 'MapNiveles',null, 0,0,this.player,this.money)) 
        this.player.life.free();
	}
}