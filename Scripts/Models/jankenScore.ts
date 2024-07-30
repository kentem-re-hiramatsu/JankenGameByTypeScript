"use strict";

export class JankenScore {
    private _winScore: number = 0;
    private _gameCount: number = 0;

    public set Score(isWin: boolean) {
        if (isWin) {
            this._winScore++;
        }
        this._gameCount++;
    }

    public get WinScore(): number {
        return this._winScore;
    }

    public get WinRate(): number {
        const winRate = Math.round(this._winScore / this._gameCount * 100) * 1;
        return winRate;
    }
}