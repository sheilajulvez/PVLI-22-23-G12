export default class FondoMove extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'FondoMove');
		this.scene.add.existing(this);
		this.setScale(1,1);
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);

		//movimiento de las casas
		this.y+=(40*dt)/100;

		if(this.y>800)
		{
			this.y=0;
			//implementdo por si ueremos añadir más de una casa, por ahora se queda comentado.
			var house=random(0,7);
			
			}
		}
        
        
	}

}