import StartButton from '../components/StartButtom.js';


export default class inicio extends Phaser.Scene{
	constructor(){
		super({key:'inicio'});
		this.StartButton=new StartButton(this);

	}
	preload(){
		this.load.image("fondo","assets/inicio.jpg");
		this.StartButton.preload();


	}
	create(){
		this.add.image(500,350,'fondo');
		this.StartButton.create();
	}






}