
export default class Niveles extends Phaser.Scene {
    constructor(){
        super('MapNiveles');
         let Nivel =[ ];
         for (let i=0; i<5; i++) Nivel.push();
    }
    preload(){
        this.load.image("mapaciudad","assets/mapaciudad.png");
    }
    create(){
        this.add.image(500,350,'mapaciudad');
    }
}
