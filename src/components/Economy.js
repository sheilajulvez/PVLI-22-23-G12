export default class Economy{
    constructor(scene){
        this.scene=scene;
        this.money=1100;
        this.text=" ";
    }
    AddMoney(cantidad){
        this.money+=cantidad;
    }
    LessMoney(cantidad){
 
        console.log(cantidad);
        console.log(this.money);
        if(this.money>=cantidad){
            this.money-=cantidad;
            return true;
        }
        return false;
    }
    ShowMoney(){
       
        let a="DINERO:"+this.money;
        this.text=this.scene.add.text(800,30,a);
        this.text.setTint(0x000000);
        this.text.setScale(2,2);

     

    }
    SetText(){
        console.log("flkmelkfnlerf");
        let a="DINERO:"+this.money;
        this.text.setText(a);
      //  this.text.setText("DINERO: "+this.money);
    }
    SetMoney(dinero){
        this.money=dinero;
    }
    SetScene(scene){
        this.scene=scene;
    }

}