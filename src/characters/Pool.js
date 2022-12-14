//clase pool
import Moto from "../characters/Vehiculos/Moto.js"
export default class Pool {
	//constructor de la clase 
    constructor (scene, entities) 
	{
      this._group=scene.add.group();
	  this._group.addMultiple(entities);
	  entities.forEach(element => {
		this._group.killAndHide(element);
		element.body.checkCollision.none = false;
	  });
	 
	  this.scene=scene;

	}
	//mostrar un objeto en escena
	
	
	spawn (x, y,animationKey) {
		var entity = this._group.getFirstDead();
			//Nunca deberían existir grupos sin elementos activo
		
		if (entity)
	    {
		  entity.x = x;
		  entity.y = y;
		  
		  entity.setActive(true);
		  entity.setVisible(true);
		  entity.body.checkCollision.none = false;
		  console.log(this._group.getLength());
		  if(entity.move==Moto.prototype.move){
				entity.play(entity.anim);
			}
			
		else{
				entity.play(animationKey);
			}
			entity.body.setEnable(true);
		
		}
		return entity;
	}
	devuelvey(){
		var entity= this._group.getFirstDead();
		if(entity)return entity.y;

	}

	//quitarlo de escena (tambien se puede hacer con el setActive y el Visible)
	release (entity) {
		entity.body.checkCollision.none = true;
		entity.body.setEnable(false);
		this._group.killAndHide(entity);

	
	}
	getPhaserGroup(){
		return this._group;
	}
}