export default class Economy{
    constructor(scene){
        this.scene=scene;
        this.money=0;
    }
    AddMoney(cantidad){
        this.money+=cantidad;
    }
    LessMoney(cantidad){
        console.log("llamas");
        console.log(cantidad);
        console.log(this.money);
        if(this.money>=cantidad){
            this.money-=cantidad;
            return true;
        }
        return false;
    }
    ShowMoney(){
        console.log("hola?");
        let a="DINERO:"+this.money;
        this.scene.add.text(a,300,300);
    }
    SetMoney(dinero){
        this.money=dinero;
    }
    SetScene(scene){
        this.scene=scene;
    }

}