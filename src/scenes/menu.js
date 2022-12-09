
import Button from '../components/Buttom.js';
import Economy from "../components/Economy.js"
import Wenge from '../characters/Wenge.js'; //importamos al caracter de Wenge
export default class menu extends Phaser.Scene{
	constructor(){
		super({key:'menu'});
		this.Botones =[ ];
	}
	preload(){
		this.load.image("fondoMenu","assets/menu_fondo2.jpg");
		this.load.image("next_level","assets/next_level.jpg");
		this.load.image('quit_buttom',"assets/exit1.jpg");
		this.load.spritesheet('Wenge', 'assets/wengeSprite.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Wenge_motomami', 'assets/tienda/wengeSprite_motomami.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Wenge_daltonismo', 'assets/tienda/wengeSprite_daltonica.png', {frameWidth: 633, frameHeight:394});
		this.load.spritesheet('Wenge_nuevacoleccion', 'assets/tienda/wengeSprite_nuevacoleccion.png', {frameWidth: 633, frameHeight:394});
		this.load.image('Life', 'assets/vidas.png');
		this.load.audio('dash', 'assets/sounds/fium.mp3');
		this.load.audio('skate1','assets/sounds/skate1.mp3');
		this.load.audio('skate2','assets/sounds/skate2.mp3');
		this.load.audio('skate3','assets/sounds/skate3.mp3');

	}
	create(){
		this.add.image(500,350,'fondoMenu');
		this.money=new Economy(this);
		this.player=new Wenge(this, 800, 800,"idle_Wenge"); //creamos a nuestro personaje, nuestra Wenge
		this.Botones.push(new Button(this, 400,200, 'next_level', 'MapNiveles',null, 0,0,this.player,this.money)) 
		
        this.Botones.push(new Button(this, 400,600, 'quit_buttom', 'inicio',null, 0,0)) 
        this.player.life.free();
	}
}