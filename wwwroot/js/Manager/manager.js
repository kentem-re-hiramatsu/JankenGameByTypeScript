"use strict";
import { HandType } from "../Enums/handType.js";
import { JankenScore } from "../Models/jankenScore.js";
export class Manager {
    constructor() {
        this._data = [];
        this.score = new JankenScore();
        this.Add = (userResult, cpuResult, jankenResult) => {
            const data = {
                gameCount: this.score.TotalScore,
                user: this.GetHand(userResult),
                cpu: this.GetHand(cpuResult),
                result: jankenResult,
                totalWin: `${(Math.round(this.score.WinScore / (this.score.TotalScore) * 100) * 1)}%`,
            };
            this._data[this._data.length] = data;
        };
        this.CheckHand = (userHand, cpuHand) => {
            let cpuResult;
            if (cpuHand.includes('gu')) {
                cpuResult = HandType.Gu;
            }
            else if (cpuHand.includes('choki')) {
                cpuResult = HandType.Choki;
            }
            else {
                cpuResult = HandType.Pa;
            }
            let jankenResultNum = (userHand - cpuResult + 3) % 3;
            let jankenResult;
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
            this.Add(userHand, cpuResult, jankenResult);
            return jankenResult;
        };
        this.GetHandImg = () => {
            const gu = "../../img/janken_gu.png";
            const choki = "../../img/janken_choki.png";
            const pa = "../../img/janken_pa.png";
            const handImg = [gu, choki, pa];
            const cpuResult = Math.floor(Math.random() * handImg.length);
            return handImg[cpuResult];
        };
        this.DataSave = () => {
            this._data.forEach((data, index) => {
                const dataKey = 'data' + index;
                localStorage.setItem(dataKey, JSON.stringify(data));
            });
        };
        this.LoadingData = () => {
            if (localStorage.length === 0) {
                return;
            }
            for (let i = 0; i < localStorage.length; i++) {
                const localDataObj = localStorage.getItem('data' + i);
                const localData = JSON.parse(localDataObj);
                this.score.Score = localData.result === 'WIN';
                const data = {
                    gameCount: localData.gameCount,
                    user: localData.user,
                    cpu: localData.cpu,
                    result: localData.result,
                    totalWin: localData.totalWin,
                };
                this._data[this._data.length] = data;
            }
        };
        this.LoadingData();
    }
    GetHand(handType) {
        let hand = '';
        switch (handType) {
            case HandType.Gu:
                hand = 'グー';
                break;
            case HandType.Choki:
                hand = 'チョキ';
                break;
            case HandType.Pa:
                hand = 'パー';
                break;
            default: break;
        }
        return hand;
    }
}
//# sourceMappingURL=manager.js.map