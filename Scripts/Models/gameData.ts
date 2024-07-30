"use strict";

import { HandType } from "../Enums/handType";
import { ResultType } from "../Enums/resultType";



export class GameData {
    private _gameCount: number;
    private _userHand: HandType;
    private _cpuHand: HandType;
    private _result:ResultType;
    private _winRate:number;

    constructor(gameCount: number, user: HandType, cpu: HandType,result:ResultType,winRate:number) {
        this._gameCount = gameCount;
        this._userHand = user;
        this._cpuHand = cpu;
        this._result = result;
        this._winRate = winRate;
    }
}