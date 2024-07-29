"use strict";
import { Manager } from "../Manager/manager.js";
{
    const mgr = new Manager();
    const main = document.querySelector('main');
    const cpuSection = document.getElementById('cpuHand');
    const jankenResult = document.getElementById('result');
    const historyButton = document.getElementById('historyButton');
    let timeoutId;
    historyButton.addEventListener('click', () => {
        window.location.href = '../Views/sub.html';
    });
    const img = document.createElement('img');
    img.src = "../../img/janken_gu.png";
    img.width = 220;
    img.height = 220;
    cpuSection.appendChild(img);
    const game = document.createElement('div');
    game.className = 'game';
    const startButton = document.createElement('div');
    startButton.id = 'gameStartButton';
    startButton.textContent = 'Start';
    startButton.addEventListener('click', () => {
        SpinCpuHand();
        matchButton.classList.remove('inactive');
        startButton.classList.add('inactive');
    });
    const matchButton = document.createElement('div');
    matchButton.id = 'matchButton';
    matchButton.textContent = '勝負!!';
    matchButton.classList.add('inactive');
    const h2 = document.createElement('h2');
    matchButton.addEventListener('click', () => {
        clearTimeout(timeoutId);
        const selectedHand = Array.from(document.getElementsByName('janken'))
            .find(radio => radio.checked).value;
        h2.textContent = mgr.CheckHand(Number(selectedHand), img.src);
        jankenResult === null || jankenResult === void 0 ? void 0 : jankenResult.appendChild(h2);
        startButton.classList.remove('inactive');
        matchButton.classList.add('inactive');
        mgr.DataSave();
    });
    game.appendChild(startButton);
    game.appendChild(matchButton);
    main === null || main === void 0 ? void 0 : main.appendChild(game);
    const SpinCpuHand = () => {
        img.src = mgr.GetHandImg();
        timeoutId = setTimeout(() => {
            SpinCpuHand();
        }, 100);
    };
}
//# sourceMappingURL=main.js.map