export default class Velocity_button {
    constructor(x,y,scene, current_money,name,wenge){
       // super(scene, x, y, name);
        this.scene=scene;
        this.x=x;
        this.y=y;
        this.price=75;
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
        this.sprite.on("pointerdown",()=>{
            console.log("wenga");
            if(this.current_money.LessMoney(this.price)){
                this.wenge.AddVelocity();
            }
        })
        this.sprite.on("pointerover",()=>{
            this.sprite.scene.tweens.add(
                {
                    targets: this.sprite,
                    scaleX: 3,
                    scaleY: 3,
                    duration: 200,
                    yoyo: true,
                }
            );
            
        })
    }

    Add_life(){

    }
}