"use strict";
export class Hand {
    constructor(playerType, jankenHand) {
        this._playerType = playerType;
        this._jankenHand = jankenHand;
        this._imgsrc = this.GetHandImg(jankenHand);
    }
    GetHandImg(handNum) {
        const rockSrc = "../../img/janken_gu.png";
        const scissorsSrc = "../../img/janken_choki.png";
        const paperSrc = "../../img/janken_pa.png";
        const jankens = [rockSrc, scissorsSrc, paperSrc];
        return jankens[handNum];
    }
}
//# sourceMappingURL=hand.js.map