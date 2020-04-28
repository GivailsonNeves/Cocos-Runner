const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    velocity: number = Math.round(Math.random() * 4) + 2

    onLoad () {

    }

    start () {

    }

    update (dt) {
 
        this.node.setPosition((this.node.position.x - (this.velocity*dt)),this.node.position.y);
        if(this.node.position.x < -(this.node.parent.width / 2 + this.node.width)){
             this.node.setPosition(this.node.parent.width + this.node.width,this.node.position.y)
        }
    }
}
