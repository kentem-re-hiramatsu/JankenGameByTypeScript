"use strict";
{
    class Game {
        private img: HTMLImageElement;
        private timeoutId: NodeJS.Timeout | undefined = undefined;

        constructor() {
            const main: HTMLElement | null = document.querySelector('main');
            const cpuSection: HTMLElement | null = document.getElementById('cpuHand');
            const jankenResult: HTMLElement | null = document.getElementById('result');

            this.img = document.createElement('img');
            this.img.src = this.GetCpuHand();
            this.img.width = 220;
            this.img.height = 220;

            cpuSection?.appendChild(this.img);

            const game: HTMLDivElement = document.createElement('div');
            game.className = 'game';

            const startButton: HTMLDivElement = document.createElement('div');
            startButton.id = 'gameStartButton';
            startButton.textContent = 'Start';

            startButton.addEventListener('click', () => {
                this.SpinCpuHand();
                matchButton.classList.remove('inactive');
                startButton.classList.add('inactive');
            });

            const matchButton: HTMLDivElement = document.createElement('div');
            matchButton.id = 'matchButton';
            matchButton.textContent = '勝負!!';
            matchButton.classList.add('inactive');
            const h2: HTMLElement = document.createElement('h2');

            matchButton.addEventListener('click', () => {
                clearTimeout(this.timeoutId);
                h2.textContent = this.CheckHand();
                jankenResult?.appendChild(h2);
                startButton.classList.remove('inactive');
                matchButton.classList.add('inactive');
            });

            game.appendChild(startButton);
            game.appendChild(matchButton);
            main?.appendChild(game);
        }

        GetCpuHand(): string {
            const rockSrc: string = "../img/janken_gu.png";
            const scissorsSrc: string = "../img/janken_choki.png";
            const paperSrc: string = "../img/janken_pa.png";
            const jankens: readonly string[] = [rockSrc, scissorsSrc, paperSrc];
            return jankens[Math.floor(Math.random() * jankens.length)];
        }

        SpinCpuHand(): void {
            this.img.src = this.GetCpuHand();
            this.timeoutId = setTimeout(() => {
                this.SpinCpuHand();
            }, 100);
        }

        CheckHand(): string {
            const jankens = document.getElementsByName('janken') as NodeListOf<HTMLInputElement>;
            let userResult: number = -1;
            let cpuResult: number;

            jankens.forEach((janken) => {
                if (janken.checked) {
                    userResult = (Number)(janken.value);
                }
            });

            console.log(userResult);

            if (this.img.src.includes('janken_gu.png')) {
                cpuResult = 0;
            }
            else if (this.img.src.includes('janken_choki.png')) {
                cpuResult = 1;
            }
            else {
                cpuResult = 2;
            }

            console.log(cpuResult);

            let jankenResultNum: Number = (userResult - cpuResult + 3) % 3;
            let jankenResult: string;

            if (jankenResultNum === 0) {
                jankenResult = 'DRAW';
            }
            else if (jankenResultNum === 2) {
                jankenResult = 'WIN';
            }
            else {
                jankenResult = 'LOSE';
            }
            this.DataSave(userResult, cpuResult, jankenResult);
            return jankenResult;
        }

        GetHandString(handNum: number):string {
            let hand: string;
            switch (handNum) {
                case 0:
                    hand = 'グー';
                    break
                case 1:
                    hand = 'チョキ';
                    break
                case 2:
                    hand = 'パー';
                    break
                default: hand = '';
            }
            return hand;
        }

        DataSave(userHand: number, cpuHand: number, result: string): void {
            const dataLength = localStorage.length;
            const gameCount: number = dataLength + 1;
            const data: { gameCount: number, user: string, cpu: string, result: string } = 
            { gameCount, user: this.GetHandString(userHand), cpu: this.GetHandString(cpuHand), result: result };
            const dataKey: string = 'data' + dataLength;

            localStorage.setItem(dataKey, JSON.stringify(data));
        }
    }

    new Game();
}