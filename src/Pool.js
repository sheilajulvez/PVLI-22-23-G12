//clase pool
class Pool {
	//constructor de la clase 
    constructor (scene, entities) {
       this._group = scene.add.group();
       this._group.addMultiple(entities);
       this._group.children.iterate(c => {
            c.setActive(false);
            c.setVisible(false);
        });
	}
	//mostrar un objeto en escena
	spawn (x, y) {
		let entity = this._group.getFirstDead();
		if (entity) {
		  entity.x = x;
		  entity.y = y;
		  entity.setActive(true);
		  entity.setVisible(true);
		}
		return entity;
	}
	//quitarlo de escena (tambien se puede hacer con el setActive y el Visible)
	release (entity) {
		this._group.killAndHide(entity);
	}

}