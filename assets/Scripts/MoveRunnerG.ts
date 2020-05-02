import Main from './Main';
import GameScene from './GameScene';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    currentPosition: number = 0;
    nextPosition: number = 0;
    jump: number = 0;
    initialY: number = 0;
    alredyFallDown: boolean = false;

    onLoad() {
        this.initialY = this.node.position.y;
        this.node.getComponent(cc.Animation).play("grunning");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.jumpPlayer, this);
        Main.handlers[1] = () => this.jumpPlayer();
        cc.director.getPhysicsManager().enabled = true;
        this.node.getComponent(cc.RigidBody).fixedRotation = true;
    }

    start() {
        this.alredyFallDown = false;
    }

    handleKeyBoard(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
            case cc.macro.KEY.up:
                this.jumpPlayer();
                break;
        }
    }

    jumpPlayer() {
        if (!cc.director.isPaused()) {
            if (this.jump == 0 && !this.alredyFallDown) {
                GameScene.playJump();
                this.node.getComponent(cc.Animation).play("jumpping");
                this.nextPosition = this.node.position.y + 50;
                this.node.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 100000), true);
                this.jump = 1;
            }
        }
    }

    onBeginContact(contact, self, other) {
        if (other && other.node.name == "ground") {
            this.jump = 0;
        } else {
            if (other.node) {
                console.log(other.name);
                switch (other.name) {
                    case 'ticket<PhysicsBoxCollider>':
                        if (other.node.opacity !== 0) {
                            other.node.opacity = 0;
                            Main.onNewTicket();
                        }
                        break;
                    case 'yellow_lollipop<PhysicsBoxCollider>':
                    case 'red_lollipop<PhysicsBoxCollider>':
                    case 'cake<PhysicsBoxCollider>':
                    case 'drink_1<PhysicsBoxCollider>':
                    case 'drink_2<PhysicsBoxCollider>':
                        if (other.node.opacity !== 0) {
                            Main.onColide();
                            other.node.opacity = 0;
                        }
                        break;
                }
            }
        }
    }

    update(dt) {

        this.node.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 1), true);
        this.node.angle = 0;
        this.node.getComponent(cc.RigidBody).gravityScale = 10;
        if (this.jump == 1) {
            if (this.node.position.y > this.nextPosition) {
                this.node.getComponent(cc.Animation).play("grunning");
            }
        }
        this.alredyFallDown = this.node.position.y < -87;
        if (this.node.position.y < -370) {
            Main.onFallDown();
        }
    }
}
