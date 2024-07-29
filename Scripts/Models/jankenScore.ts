"use strict";

export class JankenScore{
    private _winScore:number = 0;
    private _totalScore:number = 0;

    public set Score(isWin:boolean){
        if(isWin){
            this._winScore++;
        }
        this._totalScore++;
    }

    public get WinScore():number{
        return this._winScore;
    }

    public get TotalScore():number{
        return this._totalScore;
    }
}