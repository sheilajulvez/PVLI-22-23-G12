import Button from '../components/Buttom.js';

//falta expecificar que un nivel desbloquea el siguiente
export default class Niveles extends Phaser.Scene {
    constructor(){
        super({ key: 'MapNiveles'});
        //creacion de arrays de los niveles 
        this.Nivel =[ ];
        this.Botones =[ ];
         this.stay=0;
    }
    create(){
        //configuracion de la música
        const config =
		{
			mute: false,
 			 volume: 0.1,
 		 	 rate: 1,
			 detune: 0,
 			 seek: 0,
 			 loop: false,
 			 delay: 0,
		}
		//añades los sonidos
		this.music = this.sound.add('musica6',config);
        this.music.play();
        //creas la imagen del fondo
        this.add.image(500,350,'mapaciudad');
        //añades los cinco niveles
        this.Nivel.push(new Button(this, 135,485, 'boton', 'EscenaHablar','tomatico',this.stay, 1,this.wenge,this.money,this.music )) 
        this.Nivel.push(new Button(this, 317,280, 'boton', 'EscenaHablar','Manzanilla', this.stay,2,this.wenge,this.money,this.music)) 
        this.Nivel.push(new Button(this, 720,545, 'boton', 'EscenaHablar','Aceite',this.stay,3,this.wenge,this.money,this.music)) 
        this.Nivel.push(new Button(this, 750,140, 'boton', 'EscenaHablar','Croquetas',this.stay,4,this.wenge,this.money,this.music)) 
        this.Nivel.push(new Button(this, 925,265, 'boton', 'EscenaHablar','Arsenico',this.stay,1,this.wenge,this.money,this.music))  
        //mostramos el dinero disponible
        this.money.SetScene(this);
        this.money.ShowMoney();
        //boton para la tienda y para salir
        this.Botones.push(new Button(this, 150,70, 'shop_button', 'shop',"Niveles", this.stay,this.stay-1,this.wenge,this.money,this.music)); 
        this.Botones.push(new Button(this, 950,650, 'quit_buttom', 'menu',null, 0,0,0,0,this.music)) ;
    }
    //metodo que se ejecuta al iniciar la escena
    init(datos){
        this.money=datos.dinero;
        this.wenge=datos.wenge;
        if (datos.stay == this.stay&&this.wenge.alive){
            this.stay = this.stay +1;
        }
        this.wenge.alive=true;       
    }
}