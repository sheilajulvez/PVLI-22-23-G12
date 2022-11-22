//creamos un componente de vida, por si se quisiera reutilizar
export default class LifeComponent {

	constructor(scene,live){
		this.scenen= scene;
		this.lives=live;
	}

	create(){
		//crea tantos objetos como vidas haya
		//debería añadir la imagen y cargarla 
	}
	//devuelve un "boleano" que indica si todavía quedan vidas en el juego 
	RestaVida() {
		this.lives=this.lives--;
		if (this.live == 0) {
			//se termina el juego
		  	//this.Scene.endGame();
		  return false;
		}
		//si todavia quedan vidas
		else return true;
	  }

}