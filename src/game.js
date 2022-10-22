import Macarrones from './scenes/macarrones.js'  //importamos la escena macarrones que vamos a usar

let config= { //configuramos canvas
  type: Phaser.AUTO,
  parent:'Juego',  //crea el canvas dentro del index
  //ancho y alto de pantalla como window, ya se ira viendo
  width: window.innerWidth,
  height: window.innerHeight,
  PixelArt:true,
  scale:{ //para escalar el canvas en la pantalla con minimo y maximo
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, 
    mode: Phaser.Scale.FIT,
    min: {
            width: 100, //esto se ira viendo
            height: 500
        },
    max: {
            width: 1080,
            height: 1000
        },
    zoom: 1
  },
    scene:[Macarrones],
    title: "WENGEEEEEEEEEEEEEEEEEEEEEE",
    version: "1.0.0"   
  
};
new Phaser.Game(config);



