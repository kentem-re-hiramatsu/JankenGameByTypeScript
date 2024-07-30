"use strict";
import { Manager } from "../Manager/manager.js";
{
    const mgr = new Manager();
    const main = document.querySelector('main');
    const cpuSection = document.getElementById('cpuHand');
    const jankenResult = document.getElementById('result');
    const historyButton = document.getElementById('historyButton');
    const resetButton = document.getElementById('resetButton');
    let timeoutId;
    //履歴ボタンの処理
    historyButton.addEventListener('click', () => {
        window.location.href = '../Views/sub.html';
    });
    //リセットボタンの処理
    resetButton.addEventListener('click', () => {
        localStorage.clear();
        mgr.Clear();
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
    //スタートボタンの処理
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
    //対戦ボタンの処理
    matchButton.addEventListener('click', () => {
        clearTimeout(timeoutId);
        //ラジオボタンのチェック取得
        const selectedHand = Array.from(document.getElementsByName('janken'))
            .find(radio => radio.checked).value;
        h2.textContent = mgr.CheckHand(Number(selectedHand), img.src);
        jankenResult.appendChild(h2);
        startButton.classList.remove('inactive');
        matchButton.classList.add('inactive');
        mgr.DataSave();
    });
    game.appendChild(startButton);
    game.appendChild(matchButton);
    main.appendChild(game);
    //CPUのじゃんけん
    const SpinCpuHand = () => {
        img.src = mgr.GetHandImg();
        timeoutId = setTimeout(() => {
            SpinCpuHand();
        }, 100);
    };
}
//# sourceMappingURL=main.js.map