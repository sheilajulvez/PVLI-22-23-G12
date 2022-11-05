//clase pool
export default class Pool {
	//constructor de la clase 
    constructor (scene, entities,reuse) 
	{
      this._group=scene.add._group();
	  this.max=max;
	  this.scene=scene;
	  this.reuse=reuse;
	}
	//mostrar un objeto en escena
	
	
	addObject(entities)
	{
		this._group.addMultiple(entities);
		entities.ForEach(c=>
		{
			this._group.killAndHide(c);
			c.body.checkCollision.none=true;
		})
	}
	
	
	
	spawn (x, y,animationKey='anim') {
		let entity = this._group.getFirstDead();

		if(!entity)
		{
			entity = this._group.getFirstNth(1, true);
			this._group.remove(entity);
			this._group.add(entity);
		}
		if (entity)
	    {
		  entity.x = x;
		  entity.y = y;
		  entity.play(animationKey);
		  entity.setActive(true);
		  entity.setVisible(true);
		  entity.body.checkCollision.none=false;
		}
		return entity;
	}
	//quitarlo de escena (tambien se puede hacer con el setActive y el Visible)
	release (entity) {
		entity.body.checkCollision.none = true;
		this._group.killAndHide(entity);
	}
	getPhaserGroup(){
		return this._group;
	}

}