//creamos un componente de vida, por si se quisiera reutilizar
export default class LifeComponent {

	constructor(scene,x,y,life){
		this.scene = scene;
		this.lifes=life;
		this.sprt=[];
		for(var i=0; i<this.lifes; i++){
			this.sprt.push(this.scene.add.image(950- (55*i),50,'Life'));
		}
		this.scene.add.existing(this); //lo añades a la escene
	
	}
	preload(){
		//this.load.image("Life","../assets/vidas.png");
	}
	//devuelve un "boleano" que indica si todavía quedan vidas en el juego 
	RestaVida() {
		this.lifes=this.lifes -1;
		this.sprt[this.sprt.length- 1].destroy();
		this.sprt.pop();
	}
	AddVida(){
		this.lifes++;

	}
	Update(){
		
		
	}
}


