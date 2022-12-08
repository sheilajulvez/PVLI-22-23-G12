export default class Danger extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'danger');
		this.deleteTime=2000;
		this.scene.add.existing(this);
	}

	preUpdate(t,dt)
	{
		
		this.deleteTime-=dt;
		if(this.deleteTime<=0)
		{
		 this.destroy();
		}
	}
}