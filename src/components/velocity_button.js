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
       // this.ShowMoney();
        //super.create();
        this.sprite=this.scene.add.sprite(this.x,this.y,this.name).setInteractive().setScale(1.2,1.2);
        this.sprite.on("pointerdown",()=>{
            console.log("wenga");
            if(this.current_money.LessMoney(this.price)){
                this.wenge.AddVelocity();
                this.sprite.setVisible(false);
                this.current_money.SetText("DINERO "+this.current_money.money);
            }
        })
        this.sprite.on("pointerover",()=>{
            this.sprite.scene.tweens.add(
                {
                    targets: this.sprite,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    duration: 100,
                    yoyo: true,
                }
            );
            
        })
    }

}