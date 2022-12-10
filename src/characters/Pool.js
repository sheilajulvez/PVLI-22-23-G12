
//clase pool
export default class Pool {
	//constructor de la clase 
    constructor (scene, entities) 
	{
      this._group=scene.add.group();
	  this._group.addMultiple(entities);
	  entities.forEach(element => {
		this._group.killAndHide(element);
		element.body.checkCollision.none = true;
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
		  //entity.play(animationKey);
		  entity.setActive(true);
		  entity.setVisible(true);
		}
		
		return entity;
	}

	//quitarlo de escena (tambien se puede hacer con el setActive y el Visible)
	release (entity) {
		entity.body.checkCollision.none = false;
		this._group.killAndHide(entity);
		
	}
	getPhaserGroup(){
		return this._group;
	}

}