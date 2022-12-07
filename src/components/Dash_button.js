export default class Dash_button {
    constructor(x,y,scene, current_money,name,wenge){
       // super(scene, x, y, name);
        this.scene=scene;
        this.x=x;
        this.y=y;
        this.price=300;
        this.current_money=current_money;
        this.name=name;
        this.wenge=wenge;
        this.buy=this.scene.sound.add("buy");
    
    }
    create(){
        
       console.log(this.scene);
        this.sprite=this.scene.add.sprite(this.x,this.y,this.name).setInteractive();
        this.sprite.on("pointerdown",()=>{
            
            console.log(this.wenge.dash);
            if(this.current_money.LessMoney(this.price)){
            this.buy.play();
            this.wenge.SetDash();
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

    Add_life(){

    }
}