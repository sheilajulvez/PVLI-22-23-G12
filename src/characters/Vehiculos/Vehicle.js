
export default class Vehicle extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Vehicle');
		this.scene.add.existing(this);				//añadimos el objeto a la escena
		this.scene.physics.add.existing(this);		//el objeto tiene cualidades físicas
		this.destroyNow=false;						//booleano que controlará cuando debemos "destruir" el objeto. 
		this.setScale(1,1);							//cambiamos la escala
	}

	move(velocity)									//cambiamos la velocidad en el eje Y del vehículo
	{
		this.body.setVelocityY(velocity);
	}
	collision()										//función que detecta las colisiones y gestiona el hacerle daño a Wenge 
	{
		if(this.scene.physics.overlap(this.scene.player, this)) 
		{
			this.scene.player.life.RestaVida();
    		this.destroyNow=true;
		}

	}
	respawn()										//función que gestiona el respawn de los vehículos
	{
		if(this.y>540)
		{
			if(this.body.checkCollision.none)
				this.body.checkCollision.none=true;
		}	
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
		this.collision();
        this.respawn();
	}
}