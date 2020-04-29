// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Main from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Label) tfTickets : cc.Label = null;
    @property(cc.Label) tfCurr : cc.Label = null;
    @property(cc.Node) progressBarr : cc.Node = null;
    @property(cc.Node) boy : cc.Node = null;
    @property(cc.Node) girl : cc.Node = null;
    @property(cc.Label) tfFeedback : cc.Label = null;
    @property(cc.Node) bgModal : cc.Node = null;
    @property(cc.Node) nPainel : cc.Node = null;

    static _ref : GameScene;
    public static handlers : any[] = [];

    constructor() {
        super();
        GameScene._ref = this;
    }

    public static showFeedback(message: string, isFinal: boolean = false) {
        GameScene._ref.tfFeedback.node.opacity = 255;
        GameScene._ref.tfFeedback.string = message;
        GameScene._ref.bgModal.opacity = 180;
        if (isFinal) {
            GameScene._ref.nPainel.opacity = 255;
        }        
    }

    public static hideFeedback() {
        GameScene._ref.tfFeedback.node.opacity = 0;
        GameScene._ref.bgModal.opacity = 0;
        GameScene._ref.nPainel.opacity = 0;
    }

    onLoad () {
        if (Main.currentPlayer == 'girl') {
            this.boy.opacity = 0;
            this.boy.active = false;            
        } else {
            this.girl.opacity = 0;
            this.girl.active = false;
        }
        cc.director.resume();
        GameScene.hideFeedback();
        cc.director.getPhysicsManager().enabled = true;        
        this.node.on("mousedown",(event) => {
            for (let handler of GameScene.handlers) {
                handler();
            }
         },this);
    }

    update (dt) {
        this.tfCurr.string = this.minTwoDigits(Main.totalTickets);
        this.tfTickets.string = this.minTwoDigits(Main.currentTickets);
        this.progressBarr.setScale(new cc.Vec2(Main.totalTickets / 20,1));
    }

    private minTwoDigits(n:number): string {
        return n > 9 ? n.toString() : '0' + n;
    }
}
