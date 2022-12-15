//Barra de Progreso de Nivel
export default class Bar  {
    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);  //la barraa es un objeto de la librería de Phaser graphics
        this.x =x;      //posicion x
        this.y =y;      //posicion y
        this.value=0;
        this.maximo=20000;  //el tiempo que tarda en cargarse la barra
        this.tamx=110;  //ancho
        this.tamy=30;   //alto
        this.p = this.tamx / this.maximo;
        this.draw();
        scene.add.existing(this.bar);   //añadido a la escena
    }
    //metodo para que aumente la barra de progreso
    aumenta(cant){
        //vas sumando una cantidad al valor que tiene la barra
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

    //devuelve un booleano si la barra se ha rellenado al completo
    fin(){
      
        return (this.value >= this.maximo); ///si el valor es mayor o igual al maximo has terminado el niveñ
    }
    //metodo de renderizado
    draw(){
        //borra la barra actual
        this.bar.clear();
         //  barra del fondo(margen negro):
         this.bar.fillStyle(0x000000);
         this.bar.fillRect(this.x, this.y, this.tamx+4, this.tamy+4);
         //barra de vida
         this.bar.fillStyle(0xffffff);//color blanco
         this.bar.fillRect(this.x + 2, this.y + 2, this.tamx, this.tamy);
        this.bar.fillStyle(0xFDEE35);//rellenas de color amarillo
        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(this.x + 2, this.y + 2, d, this.tamy);
    }
}