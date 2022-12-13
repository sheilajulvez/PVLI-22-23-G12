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
 
        if(this.money>=cantidad){
            this.money-=cantidad;
            return true;
        }
        return false;
    }
    ShowMoney(){
       
        let a="DINERO:"+this.money;
        this.text=this.scene.add.text(700,50,a);
        this.text.setTint(0x00000);
       // this.text.backgroundColor(0xFFFF00);
        this.text.setScale(2,2);

     

    }
    SetText(){

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