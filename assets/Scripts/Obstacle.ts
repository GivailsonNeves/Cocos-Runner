// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Obstacle extends cc.Component {   
    
    groundSize: number = 1006;
    childrens: any[];
    positionX: number;
    
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.childrens = [this.node.getChildByName('ticket'), this.node.getChildByName('yellow_lollipop'), this.node.getChildByName('red_lollipop')];
        this.sortObstacle();
    }

    private sortObstacle() {
        for(let obstacle of this.childrens) {
            obstacle.opacity = 0;            
        }
        this.node.getComponent(cc.RigidBody).enabledContactListener = true;
        const index = Math.round(Math.random() * (this.childrens.length));
        if (index != this.childrens.length) {
            this.node.opacity = 255;
            this.childrens[index].opacity = 255;        
            this.node.name = this.childrens[index].name;
        } else {
            this.node.opacity = 0;
        }
    }

    update (dt) {
        this.positionX = this.node.position.x - (500*dt)
        if(this.positionX < -(this.node.parent.width / 2 + this.groundSize)){            
            this.positionX = this.node.parent.width + this.groundSize;
            this.sortObstacle();
        }
        this.node.setPosition(this.positionX,this.node.position.y);
    }
}
