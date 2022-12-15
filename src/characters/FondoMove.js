//para que el fondo este en constante movimiento
export default class FondoMove extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'FondoMove',Math.floor(Math.random() *20));
		this.scene.add.existing(this);	//lo añades a la escena
		this.setScale(1,1);	//tamaño en el juego
	}
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		//movimiento de los arboles
		this.y+=(20*dt)/100;	//posicion en el eje y de los arboles se actualiza constantemente	
		if(this.y>800)	//si esta posicion es mayor que 800
		{
			this.y=0;		//ponla a 0 de nuevo
		}
		this.y += 2;
	}
}

