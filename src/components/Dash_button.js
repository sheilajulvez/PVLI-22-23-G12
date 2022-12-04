export default class Dash_button {
    constructor(x,y,scene, current_money,name,wenge){
       // super(scene, x, y, name);
        this.scene=scene;
        this.x=x;
        this.y=y;
        this.price=250;
        this.current_money=current_money;
        this.name=name;
        this.wenge=wenge;
    
    }
    preload(){
        //super.preload();
  
    }
    create(){
       console.log(this.scene);
        this.sprite=this.scene.add.sprite(this.x,this.y,this.name).setInteractive();
        this.sprite.on("pointerdown",()=>{
            console.log("cisco");
            if(this.current_money.LessMoney(this.price)){
           console.log("cisco");
            }
        })
       
    }

    Add_life(){

    }
}