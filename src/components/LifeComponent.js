//creamos un componente de vida, por si se quisiera reutilizar
export default class LifeComponent {

	constructor(scene,x,y,life){
		this.scene= scene;
		this.lifes=life;
		this.scene.add.existing(this); //lo añades a la escene
	}
	preload(){
		this.load.image("Life","assets/vidas.png");
	}
		
	create(){
		for(let i=0;i<this.lives;i++){
		this.add.image(500+ (10*i),350,'Life');}
	}
	//devuelve un "boleano" que indica si todavía quedan vidas en el juego 
	RestaVida() {
		this.lives=this.lives--;
		if (this.live == 0) {
			//se termina el juego
		  return false;
		  	//this.Scene.endGame();
		}
		//si todavia quedan vidas
		else return true;
		this.event.emit("Vida");
	}
	AddVida(){
		this.lives++;
		this.event.emit("Vida");

	}
	Actualiza(){

	}
}


