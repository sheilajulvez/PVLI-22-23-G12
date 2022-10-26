
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

var dir='r';
export default class Van extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser
     
	constructor(scene, x, y) {
		super(scene, x, y, 'Van');

		this.scene.add.existing(this);
		this.scene.anims.create({ //animación
			key: 'idle_WhiteCar', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Van',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
            
		});
      


		this.play('idle_WhiteCar'); //activa la animavcion
       

		this.setScale(1,1);
	}

	preUpdate(t, dt){
        super.preUpdate(t,dt);
		//movimiento de los coches
            this.y+=(10*dt)/100;

			
            if(this.x>900)
            {
                dir='l';
            }
            else if(this.x<200)
            {
                dir='r';
            }
			if(dir==='r')this.x+=(40*dt)/100;
			if(dir==='l')this.x-=(40*dt)/100;



			if(this.y>800)
			{
				this.y=0;
				var pos=random(0,1);
				//this.x= random(100, 1200);
				switch(pos)
				 {
				 	  case 0:
				 	 	this.x=350;
				 	 	break;
				 	  case 1:
				 	  	this.x=610;
				 	  	break;  
				}
			}
	}

}
