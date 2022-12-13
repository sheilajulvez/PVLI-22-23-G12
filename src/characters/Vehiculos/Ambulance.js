import Vehicle from "./Vehicle.js";
export default class Ambulance extends Vehicle { 
     
	constructor(scene, x, y) {
		super(scene, x, y, 'Ambulance');	
		this.body.setSize(80,150);
		this.body.setOffset(10,20);
		this.play('idle_Ambulance'); 
	}
	

	collision()
	{
		if(this.scene.physics.overlap(this.scene.player, this)) 
		{
			this.scene.player.life.RestaVida();
		}
	}
	
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		super.move(400);
		if (this.y>800 ) 		//en todos los que tengan poool
		{		
			this.destroyNow=true;
		}
	
		if(this.destroyNow==true)
		{
			this.body.checkCollision.none=true;
			this.destroy();
			this.destroyNow=false;
		}
		
		
	}


}
