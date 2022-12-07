export default class Bar  {
    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x =x;
        this.y =y;
        this.value=0;
        this.maximo=40000;
        this.tamx=110;
        this.tamy=30;
        this.p = this.tamx / this.maximo;
        this.draw();
        scene.add.existing(this.bar);
    }
    aumenta(cant){
        this.value+=cant;
        //si el valor supera el máximo entonces lo igualas al máximo
        if (this.value > this.maximo){
            this.value= this.maximo;
        }
        //dibujas la barra
        this.draw();
        //devuelves un bool que indica si el valor es el mismo que el de la barra
        return (this.value === this.maximo);
    }

    fin(){
      
        return (this.value >= this.maximo);
    }
    draw(){
        //borra la barra actual
        this.bar.clear();
         //  barra del fondo(margen):
         this.bar.fillStyle(0x000000);
         this.bar.fillRect(this.x, this.y, this.tamx+4, this.tamy+4);
         //barra de vida
         this.bar.fillStyle(0xffffff);
         this.bar.fillRect(this.x + 2, this.y + 2, this.tamx, this.tamy);
        this.bar.fillStyle(0xFDEE35);
        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(this.x + 2, this.y + 2, d, this.tamy);
    }
}