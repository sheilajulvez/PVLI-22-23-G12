export default class FondoMove extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'FondoMove',Math.floor(Math.random() *20));
		this.scene.add.existing(this);
		//tamaño en el juego
		this.setScale(1,1);
	}
	preUpdate(t, dt){
		super.preUpdate(t, dt);

		//movimiento de las casas
		this.y+=(20*dt)/100;		
		if(this.y>800)
		{
			this.y=0;		
		}
		this.y += 2;

         
	}
}

