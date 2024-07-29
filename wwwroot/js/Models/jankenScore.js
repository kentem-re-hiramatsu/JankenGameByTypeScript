"use strict";
export class JankenScore {
    constructor() {
        this._winScore = 0;
        this._totalScore = 0;
    }
    set Score(isWin) {
        if (isWin) {
            this._winScore++;
        }
        this._totalScore++;
    }
    get WinScore() {
        return this._winScore;
    }
    get TotalScore() {
        return this._totalScore;
    }
}
//# sourceMappingURL=jankenScore.js.map