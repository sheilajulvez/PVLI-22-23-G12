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
        this.i_dinero=this.scene.add.image(900,50,'Dinero');
        this.i_dinero.setScale(0.5,0.5);
        let a=+this.money;
        this.text=this.scene.add.text(870,40,a);
        this.text.setTint(0x00000);
        this.text.setScale(1.5,1.5);
      
    }
    SetText(){

        let a=+this.money;
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