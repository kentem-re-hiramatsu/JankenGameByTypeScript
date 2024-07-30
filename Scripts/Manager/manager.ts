"use strict";
import { HandType } from "../Enums/handType.js";
import { ResultType } from "../Enums/resultType.js";
import { GameData } from "../Models/gameData.js";
import { JankenScore } from "../Models/jankenScore.js";

export class Manager {
    private _data: GameData[] = [];
    private score: JankenScore = new JankenScore();

    constructor() {
        this.LoadingData();
    }

    public Add = (data: GameData): void => {
        this._data[this._data.length] = data;
    }

    public Clear = (): void => {
        this._data = [];
        this.score = new JankenScore();
    }

    //勝負結果
    public CheckHand = (userHand: number, cpuHand: string): string => {
        let cpuResult: number;

        if (cpuHand.includes('gu')) {
            cpuResult = HandType.Gu;
        }
        else if (cpuHand.includes('choki')) {
            cpuResult = HandType.Choki;
        }
        else {
            cpuResult = HandType.Pa;
        }

        let jankenResultNum: Number = (userHand - cpuResult + 3) % 3;
        
        let jankenResult: ResultType;

        if (jankenResultNum === ResultType.Draw) {
            jankenResult = ResultType.Draw;
        }
        else if (jankenResultNum === ResultType.Win) {
            jankenResult = ResultType.Win;
        }
        else {
            jankenResult = ResultType.Lose;
        }
        this.score.Score = jankenResult === ResultType.Win;
        const data =
            new GameData(this._data.length + 1, userHand, cpuResult, jankenResult, this.score.WinRate);
        this.Add(data);
        return ResultType[jankenResult];
    }

    public GetHand(handType: number): string {
        let hand: string = '';

        switch (handType) {
            case HandType.Gu:
                hand = 'グー'
                break;
            case HandType.Choki:
                hand = 'チョキ'
                break;
            case HandType.Pa:
                hand = 'パー'
                break;
            default: break;
        }
        return hand;
    }

    public GetResult(resultType: number): string {
        let result: string = '';

        switch (resultType) {
            case ResultType.Win:
                result = 'WIN'
                break;
            case ResultType.Lose:
                result = 'LOSE'
                break;
            case ResultType.Draw:
                result = 'DRAW'
                break;
            default:break;
        }
        return result;
    }

    //画像のSrcを返す
    public GetHandImg = (): string => {
        const gu: string = "../../img/janken_gu.png";
        const choki: string = "../../img/janken_choki.png";
        const pa: string = "../../img/janken_pa.png";
        const handImg: string[] = [gu, choki, pa];
        const cpuResult: number = Math.floor(Math.random() * handImg.length);

        return handImg[cpuResult];
    }

    //ローカルストレージに保存
    public DataSave = (): void => {
        this._data.forEach((data, index) => {
            const dataKey = 'data' + index;
            localStorage.setItem(dataKey, JSON.stringify(data));
        });
    }

    //ローカルストレージから読み込み
    public LoadingData = (): void => {
        if (localStorage.length === 0) {
            return;
        }

        for (let i = 0; i < localStorage.length; i++) {
            const localDataObj = localStorage.getItem('data' + i);
            const localData = JSON.parse(localDataObj!);

            this.score.Score = ResultType.Win === localData._result;
            const data = new GameData(localData._gameCount, localData._userHand, localData._cpuHand, localData._result, localData._winRate);
            this._data[this._data.length] = data;
        }
    }
}