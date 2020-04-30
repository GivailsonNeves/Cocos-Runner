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

    @property(cc.Label) tfPrevRecord : cc.Label = null;
    @property(cc.Label) tfCupons : cc.Label = null;

    @property(cc.Label) tfRecord : cc.Label = null;
    @property(cc.Label) tfNewCupons : cc.Label = null;

    update (dt) {
        this.tfPrevRecord.string = this.minTwoDigits(Main.record);
        this.tfCupons.string = this.minTwoDigits(Main.currentTickets);
        this.tfRecord.string = Main.totalTickets <= Main.record ? '--' : this.minTwoDigits(Main.totalTickets);
        this.tfNewCupons.string = this.minTwoDigits(Main.totalTickets - Main.record);
    }
    private minTwoDigits(n:number): string {
        return n > 9 ? n.toString() : '0' + n;
    }
}
