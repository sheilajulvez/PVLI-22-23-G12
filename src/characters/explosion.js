//Explosion que se produce al chocar dos vehiculos
export default class Explosion extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Explosion');
		scene.add.existing(this); 	//lo añades a la escene
		this.play('idle_Explosion'); 	//activa la animacion
		this.setScale(0.35,0.35);	//escala la imagen
		scene.physics.add.existing(this);	// lo haces objeto físico
	}

	//metodo colision 
	colision(){
		if(this.scene.physics.overlap(this.scene.player, this)) //si colisiona la explosion con el personaje
		{
			this.scene.player.life.RestaVida();	//restale una vida
		}
	}

	
	preupdate(dt)
	{
		this.colision();	//lamas al metodo colision
		this.timePassed=+dt;	//creas una variable para gestionar el tiempo que va a estar la explosion en la pantalla
		if(this.timePassed>3000)	//si este tiempo es mayor que 3000
		{
			delete this;	//elimina la explosion
		}	
	}
	


	

}