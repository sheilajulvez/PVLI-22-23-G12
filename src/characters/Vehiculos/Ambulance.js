import Car from './Car.js';//importamos a los Coches
export default class Ambulance extends Car { //exportamos la clase extendida de Phaser
     
	constructor(scene, x, y) {
		super(scene, x, y, 'Ambulance');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		
		this.body.setSize(80,150);
		this.body.setOffset(10,20);
		this.play('idle_Ambulance'); //activa la animavcion
		this.setScale(1,1);
	}
	

	collision()
	{
		if(this.scene.physics.overlap(this.scene.player, this)) 
		{
			this.scene.player.life.RestaVida();
		}
		else if(this.scene.physics.overlap(this.scene.poolCar.getPhaserGroup(), this)) 
		{
			console.log("DESTRUYE COCHE Y CREA EXPLOSION");
		}
		else if(this.scene.physics.overlap(this.scene.poolCar.getPhaserGroup(), this))
		{
			console.log("DESTRUYE VAN Y CREA EXPLOSION");
		}
	}
	

	preUpdate(t, dt){
        super.preUpdate(t,dt);

		//movimiento de los coches
		this.collision();
        //this.move(dt,dir);
	}

}
