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
    @property(cc.Button) btnInit : cc.Button = null;
    @property(cc.Button) btnReInit : cc.Button = null;
    static _ref : GameScene;

    static isLocked : boolean = false;

    sndTrilha: cc.AudioSource = null;
    sndJump: cc.AudioSource = null;
    sndCollide: cc.AudioSource = null;
    sndWalking: cc.AudioSource = null;    
    sndFinal: cc.AudioSource = null;

    constructor() {
        super();
        GameScene._ref = this;
    }

    public static showFeedback(message: string, isFinal: boolean = false, showInitButton: boolean = false) {
        GameScene._ref.tfFeedback.node.opacity = 255;
        GameScene._ref.tfFeedback.string = message;
        GameScene._ref.bgModal.opacity = 180;
        if (showInitButton)
            GameScene._ref.btnInit.node.opacity = 255;
        if (isFinal) {
            GameScene._ref.nPainel.opacity = 255;
            GameScene._ref.btnReInit.node.opacity = 255;
        }        
    }

    public static hideFeedback() {
        GameScene._ref.tfFeedback.node.opacity = 0;
        GameScene._ref.bgModal.opacity = 0;
        GameScene._ref.nPainel.opacity = 0;
        GameScene._ref.btnInit.node.opacity = 0;
        GameScene._ref.btnReInit.node.opacity = 0;
    }

    public static playJump() {
        // cc.audioEngine.play(Main._ref.sndCollide, false, .5);
        // cc.audioEngine.play(Main._ref.sndCollide, true , 1);
        // cc.audioEngine.play(Main._ref.sndTrilha, true , 0.3);
        //         cc.audioEngine.playMusic(Main._ref.sndTrilha, true);
        //         cc.audioEngine.play(Main._ref.sndFinal, true, .5);
        
        console.log('pula')
        GameScene._ref.sndJump.play();

    }
    onDestroy() {
        
    }
    onLoad () {
        
        const snds = this.node.getComponents(cc.AudioSource);

        this.sndTrilha = snds[0];
        this.sndJump = snds[1];
        this.sndFinal = snds[2];
        this.sndCollide = snds[3];
        this.sndWalking = snds[4];
        
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
        this.node.on("touchstart",(event) => {
            if( !cc.director.isPaused() ) {
                for (let handler of Main.handlers) {
                    if (handler)
                        handler();
                }
            } else {
                if (GameScene.isLocked) {
                    Main.restartGame();
                    GameScene.isLocked = false;
                } else if(Main.finishied) {
                    console.log('reinit')
                    Main.reInit();
                }
            }

            if(GameScene._ref.btnInit.node.opacity) {
                Main.init();
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

    public static isLandsCape() {
        if( cc.winSize.height > cc.winSize.width ) {
            GameScene.showFeedback('Resolução \nnão permitida');
            GameScene.isLocked = true;
            return false;
        }
        return true;
    }
}
