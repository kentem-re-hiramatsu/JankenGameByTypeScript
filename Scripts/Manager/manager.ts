"use strict";
import { HandType } from "../Enums/handType.js";
import { GameData } from "../Models/gameData.js";
import { JankenScore } from "../Models/jankenScore.js";

export class Manager {
    public _data: GameData[] = [];
    private score: JankenScore = new JankenScore();

    constructor() {
        this.LoadingData();
    }

    public Add = (userResult: number, cpuResult: number, jankenResult: string): void => {
        const data: GameData =
        {
            gameCount: this.score.TotalScore,
            user: this.GetHand(userResult),
            cpu: this.GetHand(cpuResult),
            result: jankenResult,
            totalWin: `${(Math.round(this.score.WinScore / (this.score.TotalScore) * 100) * 1)}%`,
        };

        this._data[this._data.length] = data;
    }

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
        let jankenResult: string;

        if (jankenResultNum === 0) {
            jankenResult = 'DRAW';
            this.score.Score = false;
        }
        else if (jankenResultNum === 2) {
            jankenResult = 'WIN';
            this.score.Score = true;
        }
        else {
            jankenResult = 'LOSE';
            this.score.Score = false;
        }
        this.Add(userHand, cpuResult, jankenResult)
        return jankenResult;
    }

    private GetHand(handType: HandType): string {
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

    public GetHandImg = (): string => {
        const gu: string = "../../img/janken_gu.png";
        const choki: string = "../../img/janken_choki.png";
        const pa: string = "../../img/janken_pa.png";
        const handImg: string[] = [gu, choki, pa];
        const cpuResult: number = Math.floor(Math.random() * handImg.length);

        return handImg[cpuResult];
    }

    public DataSave = (): void => {
        this._data.forEach((data, index) => {
            const dataKey = 'data' + index;
            localStorage.setItem(dataKey, JSON.stringify(data));
        });
    }

    public LoadingData = (): void => {
        if (localStorage.length === 0) {
            return;
        }

        for (let i = 0; i < localStorage.length; i++) {
            const localDataObj = localStorage.getItem('data' + i);
            const localData = JSON.parse(localDataObj!);

            this.score.Score = localData.result === 'WIN';
            const data: GameData =
            {
                gameCount: localData.gameCount,
                user: localData.user,
                cpu: localData.cpu,
                result: localData.result,
                totalWin: localData.totalWin,
            };
            this._data[this._data.length] = data;
        }
    }
}