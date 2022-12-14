export default class outfits_button {
    constructor(x,y,scene, current_money,name,wenge,key){
       // super(scene, x, y, name);
        this.scene=scene;
        this.x=x;
        this.y=y;
        this.price=200;
        this.current_money=current_money;
        this.name=name;
        this.wenge=wenge;
        this.buy=this.scene.sound.add("buy");
        this.key=key;
    
    }
    create(){
        //super.create();
       
        this.sprite=this.scene.add.sprite(this.x,this.y,this.name).setInteractive().setScale(1.2,1.2);
        let a=0;
        let found=false;
        while(a<this.wenge.outfits.lenght&&!(found)){
            if(this.wenge.outfits[a][0]==this.key){
                found=true;
            }
            else ++a;
        }
        this.sprite.on("pointerdown",()=>{
          if(this.wenge.outfits[a][1]){
           
            this.wenge.SetAnim(this.key);
          }else{
            if(this.current_money.LessMoney(this.price)){
                this.buy.play();
                this.wenge.SetAnim(this.key);
                }
                this.current_money.SetText();
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