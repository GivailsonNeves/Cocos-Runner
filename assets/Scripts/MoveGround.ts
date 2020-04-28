const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }

    update (dt) {
 
        this.node.setPosition((this.node.position.x - (500*dt)),this.node.position.y);
        if(this.node.position.x < -(this.node.parent.width / 2 + this.node.width)){
             this.node.setPosition(this.node.parent.width + this.node.width,this.node.position.y)
        }
    }
}
