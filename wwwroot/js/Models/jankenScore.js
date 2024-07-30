"use strict";
export class JankenScore {
    constructor() {
        this._winScore = 0;
        this._gameCount = 0;
    }
    set Score(isWin) {
        if (isWin) {
            this._winScore++;
        }
        this._gameCount++;
    }
    get WinScore() {
        return this._winScore;
    }
    get WinRate() {
        const winRate = Math.round(this._winScore / this._gameCount * 100) * 1;
        return winRate;
    }
}
//# sourceMappingURL=jankenScore.js.map