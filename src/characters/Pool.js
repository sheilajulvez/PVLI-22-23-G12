
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

//clase pool
export default class Pool {
	//constructor de la clase 
    constructor (scene,max, entities) 
	{
      this._group=scene.add.group();
	  this._group.addMultiple(entities);
	  entities.forEach(element => {
		this._group.killAndHide(element);
	  });
	  this.max=max;
	  this.scene=scene;
	}
	//mostrar un objeto en escena
	
	
	
	
	spawn (x, y,animationKey) {
		let entity = this._group.getFirstDead();
			//Nunca deberían existir grupos sin elementos activo
		if (entity)
	    {
		  entity.x = x;
		  entity.y = y;
		  entity.play(animationKey);
		  entity.setActive(true);
		  entity.setVisible(true);
		}
		
		return entity;
	}
	//quitarlo de escena (tambien se puede hacer con el setActive y el Visible)
	release (entity) {
		this._group.killAndHide(entity);
	}
	getPhaserGroup(){
		return this._group;
	}

}