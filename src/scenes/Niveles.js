import Button from '../components/Buttom.js';

//falta expecificar que un nivel desbloquea el siguiente
export default class Niveles extends Phaser.Scene {
    constructor(){
        super({ key: 'MapNiveles'});
        
        this.Nivel =[ ];
        this.Botones =[ ];
           this.stay=0;
         //posicion + nombre de la imagen
       // this.NivButton= this.relatedScene.add.image(500,200,'next_level');
      //  this.add.image(500,100, 'boton');
        // for (let i=0; i<5; i++) Nivel.push(this.NivButton);
    }
    preload(){
	
    }
    create(){
        
        
        //Nivel[0];
        this.add.image(500,350,'mapaciudad');

        this.Nivel.push(new Button(this, 135,485, 'boton', 'EscenaHablar','tomatico',this.stay, 1,this.wenge,this.money )) 
        this.Nivel.push(new Button(this, 317,280, 'boton', 'EscenaHablar','Manzanilla', this.stay,1,this.wenge,this.money)) 
        this.Nivel.push(new Button(this, 720,545, 'boton', 'EscenaHablar','Aceite',this.stay,1,this.wenge,this.money)) 
        this.Nivel.push(new Button(this, 750,140, 'boton', 'EscenaHablar','Croquetas',this.stay,1,this.wenge,this.money)) 
        this.Nivel.push(new Button(this, 925,265, 'boton', 'EscenaHablar','Arsenico',this.stay,1,this.wenge,this.money))  
     
        this.money.SetScene(this);
        this.money.ShowMoney();
        this.Botones.push(new Button(this, 150,70, 'shop_button', 'shop',"Niveles", this.stay,this.stay-1,this.wenge,this.money)); 
        this.Botones.push(new Button(this, 950,650, 'quit_buttom', 'menu',null, 0,0)) 

        //this.Botones.push(new Button(this, 100,100, 'quit_buttom', 'Escena_final',"Escena_final", this.stay,this.stay)) ;
        
        // primBot =this.add.image(500,350,'boton').setInteractive();
       // boton =this.add.image(500,350,'boton');
       // this.image.on('pointerdown',()=>{
       //     console.log("fg");
			//this.relatedScene.scene.start('MapNiveles');
		//});
        //this.add.image(500,350,'boton');
        

    }
    
    init(datos){
        this.money=datos.dinero;
        this.wenge=datos.wenge;
        if (datos.stay == this.stay&&this.wenge.alive){
            this.stay = this.stay +1;
        }
        this.wenge.alive=true;
        console.log(this.stay);
     
        console.log("niveles:" +this.money);
        console.log("niveles:"+ this.wenge);
       
    }

}




/*
//crea un var de reiniciarbutton en game

	
	* Creación de los elementos de la escena principal de juego
	

		// Para seleccionar botones con teclas, creamos el objeto tecla y un int al que se apunta actualmente
		var self=this;
    	let i = 0;
		var buttons = [];
		levels.forEach(level => {
			level.setScene(this, function(){self._keyboard.setBeingUsed(i)});
			buttons[i] = level.button;
      		i++;
		});
		//console.log(this.buttons);
		
		this._keyboard.loadButtonArray(buttons);
		
        // .setOrigin(0.5);
		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('battleScene');
        });
	}*/