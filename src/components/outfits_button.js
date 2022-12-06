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
                this.wenge.SetAnim("Wenge_motomami");
              
             }else if(this.name=="daltonismo"){
                console.log(this.name);
                     this.wenge.SetAnim("Wenge_daltonismo");
                    
             }else if(this.name=="nueva_coleccion"){
                console.log("nueva_coleccion");
                 this.wenge.SetAnim("Wenge_nuevacoleccion");
                
             }
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