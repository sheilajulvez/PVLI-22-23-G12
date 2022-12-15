//importamos todas las escenas
import Inicio from './scenes/inicio.js';
import Menu from './scenes/menu.js';
import Shop from './scenes/shop.js';
import Macarrones from './scenes/Niveles/macarrones.js';
import Aceite from './scenes/Niveles/Aceite.js';
import Arsenico from './scenes/Niveles/Arsenico.js';
import Croquetas from './scenes/Niveles/Croquetas.js';
import Manzanilla from './scenes/Niveles/Manzanilla.js';
import EscenaHablar from './scenes/EscenaHablar.js'
import Niveles from './scenes/Niveles.js'
import GameOver from './scenes/GameOver.js';
import Escena_fin from "./scenes/Escena_final.js";

let config= {                                        //configuramos el juego
  type: Phaser.WEBGL,                                //WEBGl
   parent:'Juego',                                   //crea el canvas dentro del index
  width:1000,                                        //ancho y alto del canvas
  height: 700,
  PixelArt:true,
  scale:{                                            //para escalar el canvas en la pantalla con minimo y maximo
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,    //centramos el canvas
    mode: Phaser.Scale.FIT,
    min: {
            width: 1000, 
            height: 700,
        },
    max: {
            width: 1000,
            height: 700,
        },
    zoom: 1
  },
    physics:                                         //añadimos las físicas al proyecto                   
    {
      default:'arcade',
      arcade:
      {
        gravity:{y:0},                                //seteamos la gravedad en y=0
        debug:true,
        debugShowBody:true,
        debugBodyColor:0x0000ff
      }
    },
    scene:[Inicio,Menu,Shop, Escena_fin,Macarrones,EscenaHablar,Niveles, Arsenico , Aceite,Croquetas,Manzanilla, GameOver],     //añadimos todas nuestras escenas
    title: "WENGEEEEEEEEEEEEEEEEEEEEEE",                                                                                        //título
    version: "1.0.0"                                                                                                            //versión
  
};
new Phaser.Game(config);                //creamos el game con su configuración



