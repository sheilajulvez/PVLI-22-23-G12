export default class outfits_button {
    constructor(x,y,scene, current_money,name,wenge){
       // super(scene, x, y, name);
        this.scene=scene;
        this.x=x;
        this.y=y;
        this.price=50;
        this.current_money=current_money;
        this.name=name;
        this.wenge=wenge;
    
    }
    preload(){
        //super.preload();
  
    }
    create(){
        //super.create();
       
        this.sprite=this.scene.add.sprite(this.x,this.y,this.name).setInteractive().setScale(1.2,1.2);
        console.log(this.sprite);
        this.sprite.on("pointerdown",()=>{
          
            if(this.current_money.LessMoney(this.price)){
             if(this.name=="motomami"){

             }else if(this.name=="daltonismo"){
                      
             }else if(this.name=="Nueva_Coleccion"){

             }
            }
        })
       
    }

   
}