// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Main from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label) tfRecord : cc.Label = null;
    @property(cc.Label) tfLife : cc.Label = null;

    start () {

    }

    update (dt) {
        this.tfLife.string = '' + (3 - Main.colides);
        this.tfRecord.string = this.minTwoDigits(Main.totalTickets);
    }
    private minTwoDigits(n:number): string {
        return n > 9 ? n.toString() : '0' + n;
    }
}
