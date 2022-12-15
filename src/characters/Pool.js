//clase Pool
import Moto from "../characters/Vehiculos/Moto.js"		//importamos las Moto
export default class Pool {
	//constructor de la clase 
    constructor (scene, entities) 
	{
      this._group=scene.add.group();	//creamos un grupo y lo añadimos a la escena
	  this._group.addMultiple(entities);	//añades entidades al grupo
	  entities.forEach(element => {			//primero queremos lo elementos desactivados
		this._group.killAndHide(element);
		element.body.checkCollision.none = false;		//el checkCollision a false, porque inicialmente no detecta las colisiones
	  });
	 
	  this.scene=scene;

	}
	//mostrar un objeto en escena
	
	//Recuperamos una entidad del pool utilizando el método spawn() que recibe las nuevas coordenadas del sprite x e y
	spawn (x, y,animationKey) {
		var entity = this._group.getFirstDead();
			//Nunca deberían existir grupos sin elementos activo
		
		if (entity)
	    {
		  entity.x = x;
		  entity.y = y;
		  
		  entity.setActive(true);//activas la entidad
		  entity.setVisible(true);//y la piones visible en el canvas
		  if(entity.move==Moto.prototype.move){	//en el caso de que la entidad sea de tipo moto, le pasas su propia animacion
				entity.play(entity.anim);
			}
			
		else{
				entity.play(animationKey);	//el resto le pasas la animacion
			}
			entity.body.setEnable(true);
		
		}
		return entity;
	}


	//quitarlo de escena (tambien se puede hacer con el setActive y el Visible)
	release (entity) {
		entity.body.checkCollision.none = true;	//ahora si detectas las colisiones
		entity.body.setEnable(false);	//lo desactivas para que sus posiciones no continuen
		this._group.killAndHide(entity);	//y lo eliminas/ocultas de la escena

	
	}
	//funcion que devuelve el grupo de la pool
	getPhaserGroup(){
		return this._group;	
	}
}