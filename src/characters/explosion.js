export default class Explosion extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Explosion');
		scene.add.existing(this); //lo añades a la escene
		scene.physics.add.existing(this);// lo haces objeto físico
		this.play('idle_Explosion'); //activa la animavcion
		this.destroyNow=false;
		console.log(this.destroyNow);
		this.setScale(0.35,0.35);
	}

	
	preupdate(dt)
	{
		
		console.log(this.destroyNow);
		super.preupdate(dt);
		this.timePassed=+dt;
		if(this.timePassed>3000 || this.destroyNow)
		{
			delete this;
		}
		
	}
	


	

}