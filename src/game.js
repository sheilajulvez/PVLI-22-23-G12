import Inicio from './scenes/inicio.js';
import Menu from './scenes/menu.js';
import Shop from './scenes/shop.js';
import Macarrones from './scenes/macarrones.js';
import EscenaHablar from './scenes/EscenaHablar.js'
import Niveles from './scenes/Niveles.js'

 //importamos la escena macarrones que vamos a usar

let config= { //configuramos canvas
  type: Phaser.AUTO,
  parent:'Juego',  //crea el canvas dentro del index
  //ancho y alto de pantalla como window, ya se ira viendo
  width:1000,
  height: 700,
  PixelArt:true,
  scale:{ //para escalar el canvas en la pantalla con minimo y maximo
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, 
    mode: Phaser.Scale.FIT,
    min: {
            width: 1000, //esto se ira viendo
            height: 700,
        },
    max: {
            width: 1000,
            height: 700,
        },
    zoom: 1
  },
    physics:
    {
      default:'arcade',
      arcade:
      {
        gravity:{y:0},
        debug:false
      }
    },
    scene:[Inicio,Menu,Shop, Macarrones,EscenaHablar,Niveles],
    title: "WENGEEEEEEEEEEEEEEEEEEEEEE",
    version: "1.0.0"   
  
};
new Phaser.Game(config);



