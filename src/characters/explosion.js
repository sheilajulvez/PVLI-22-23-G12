export default class Explosion extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Explosion');
		scene.add.existing(this); //lo añades a la escene
		scene.physics.add.existing(this);// lo haces objeto físico
		this.play('idle_Explosion'); //activa la animavcion
		this.setScale(0.35,0.35);
	}
	colision(){
		if(this.scene.physics.overlap(this.scene.player, this)) 
		{
			this.scene.player.life.RestaVida();
		}
	}

	
	preupdate(dt)
	{
		this.colision();
		this.timePassed=+dt;
		if(this.timePassed>3000)
		{
			delete this;
		}	
	}
	


	

}