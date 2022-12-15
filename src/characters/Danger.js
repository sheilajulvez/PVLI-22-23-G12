//Peligro de la Ambulancia
export default class Danger extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'danger');
		this.deleteTime=2000;	//tiempo que permanece en la pantalla
		this.scene.add.existing(this);	//lo añades a la escena
	}

	preUpdate(t,dt)
	{
		this.deleteTime-=dt;	//restas del tiempo de permanencia de la pantalla el tiempo que va pasando
		if(this.deleteTime<=0)	//si llegas a 0, o meno que, destruyelo
		{
		 this.destroy();
		}
	}
}