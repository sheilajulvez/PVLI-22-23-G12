/*import la escena inicial*/
let config {
  type: Phaser.AUTO;
  parent:'Juego',  //crea el canvas dentro del index
  //ancho y alto de pantalla como window, ya se ira viendo
  width: window.innerWidth,
  height: window.innerHeight,
  PixelArt=true;
  scale:{ //para escalar el canvas en la pantalle con minimo y maximo
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
    scene: //[nombre de la escena],
    title: "Titulo",
    version: "1.0.0"   
  
};
new Phaser.Game(config);


