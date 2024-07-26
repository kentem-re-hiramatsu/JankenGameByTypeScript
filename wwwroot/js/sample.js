"use strict";
{
    class Game {
        constructor() {
            this.timeoutId = undefined;
            const main = document.querySelector('main');
            const cpuSection = document.getElementById('cpuHand');
            const jankenResult = document.getElementById('result');
            this.img = document.createElement('img');
            this.img.src = this.GetCpuHand();
            this.img.width = 220;
            this.img.height = 220;
            cpuSection === null || cpuSection === void 0 ? void 0 : cpuSection.appendChild(this.img);
            const game = document.createElement('div');
            game.className = 'game';
            const startButton = document.createElement('div');
            startButton.id = 'gameStartButton';
            startButton.textContent = 'Start';
            startButton.addEventListener('click', () => {
                this.SpinCpuHand();
                matchButton.classList.remove('inactive');
                startButton.classList.add('inactive');
            });
            const matchButton = document.createElement('div');
            matchButton.id = 'matchButton';
            matchButton.textContent = '勝負!!';
            matchButton.classList.add('inactive');
            const h2 = document.createElement('h2');
            matchButton.addEventListener('click', () => {
                clearTimeout(this.timeoutId);
                h2.textContent = this.CheckHand();
                jankenResult === null || jankenResult === void 0 ? void 0 : jankenResult.appendChild(h2);
                startButton.classList.remove('inactive');
                matchButton.classList.add('inactive');
            });
            game.appendChild(startButton);
            game.appendChild(matchButton);
            main === null || main === void 0 ? void 0 : main.appendChild(game);
        }
        GetCpuHand() {
            const rockSrc = "../img/janken_gu.png";
            const scissorsSrc = "../img/janken_choki.png";
            const paperSrc = "../img/janken_pa.png";
            const jankens = [rockSrc, scissorsSrc, paperSrc];
            return jankens[Math.floor(Math.random() * jankens.length)];
        }
        SpinCpuHand() {
            this.img.src = this.GetCpuHand();
            this.timeoutId = setTimeout(() => {
                this.SpinCpuHand();
            }, 100);
        }
        CheckHand() {
            const jankens = document.getElementsByName('janken');
            let userResult = -1;
            let cpuResult;
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
            let jankenResultNum = (userResult - cpuResult + 3) % 3;
            let jankenResult;
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
        DataSave(userHand, cpuHand, result) {
            const data = { user: userHand, cpu: cpuHand, result: result };
            const dataLength = localStorage.length;
            const dataKey = 'data' + dataLength;
            localStorage.setItem(dataKey, JSON.stringify(data));
        }
    }
    new Game();
}
//# sourceMappingURL=sample.js.map