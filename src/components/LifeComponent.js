//creamos un componente de vida, por si se quisiera reutilizar
export default class LifeComponent {

	constructor(scene,x,y,life){
		this.scene = scene;
		this.lifes=life;
		this.sprt=[];
		this.cont=0;
		this.puedeRestar=true;
		//for(var i=0; i<this.lifes; i++){
		//	this.sprt.push(this.scene.add.image(950- (55*i),50,'Life'));
		//}
		this.scene.add.existing(this); //lo añades a la escene
		this.hitSound = this.scene.sound.add('hitSound');
	}
	//devuelve un "boleano" que indica si todavía quedan vidas en el juego 
	RestaVida() {
		if(this.puedeRestar)
		{
			this.cont=0;
		console.log(this.lifes);
		this.hitSound.play();
		this.lifes=this.lifes -1;
		console.log(this.sprt[this.sprt.length- 1]);
		this.sprt[this.sprt.length- 1].destroy();
		this.sprt.pop();
		this.puedeRestar=false
		}
		
	}
	AddVida(){
		this.lifes++;

	}
	SetScene(scene){
		this.scene=scene;
		this.scene.add.existing(this); 
		for(var i=0; i<this.sprt.length; i++){
			this.sprt[this.sprt.length- 1].destroy();
			this.sprt.pop();
		}
		for(var i=0; i<this.lifes; i++){
			this.sprt.push(this.scene.add.image(950- (55*i),50,'Life'));
		}
	}
	free(){
		for(var i=0; i<this.sprt.length; i++){
			this.sprt[this.sprt.length- 1].destroy();
			this.sprt.pop();
		}
	}
	Update()
	{
	if(!this.puedeRestar)
	{
		console.log(this.cont);
		this.cont++;
	}	
	if(this.cont>=100)
	{
		this.puedeRestar=true;
	}
		
	}
}


