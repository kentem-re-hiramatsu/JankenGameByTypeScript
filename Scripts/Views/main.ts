"use strict";
import { Manager } from "../Manager/manager.js";
{
    const mgr = new Manager();
    const main: HTMLElement | null = document.querySelector('main');
    const cpuSection: HTMLElement | null = document.getElementById('cpuHand');
    const jankenResult: HTMLElement | null = document.getElementById('result');

    const historyButton: HTMLElement | null = document.getElementById('historyButton');

    let timeoutId:NodeJS.Timeout;

    historyButton!.addEventListener('click', () => {
        window.location.href = '../Views/sub.html';
    });

    const  img: HTMLImageElement = document.createElement('img');
    img.src = "../../img/janken_gu.png";
    img.width = 220;
    img.height = 220;

    cpuSection!.appendChild(img);

    const game: HTMLDivElement = document.createElement('div');
    game.className = 'game';

    const startButton: HTMLDivElement = document.createElement('div');
    startButton.id = 'gameStartButton';
    startButton.textContent = 'Start';

    startButton.addEventListener('click', () => {
        SpinCpuHand();
        matchButton.classList.remove('inactive');
        startButton.classList.add('inactive');
    });

    const matchButton: HTMLDivElement = document.createElement('div');
    matchButton.id = 'matchButton';
    matchButton.textContent = '勝負!!';
    matchButton.classList.add('inactive');
    const h2: HTMLElement = document.createElement('h2');

    matchButton.addEventListener('click', () => {
        clearTimeout(timeoutId);
        const selectedHand = Array.from(document.getElementsByName('janken') as NodeListOf<HTMLInputElement>)
        .find(radio => radio.checked)!.value;
        h2.textContent = mgr.CheckHand(Number(selectedHand),img.src);
        jankenResult?.appendChild(h2);
        startButton.classList.remove('inactive');
        matchButton.classList.add('inactive');
        mgr.DataSave();
    });

    game.appendChild(startButton);
    game.appendChild(matchButton);
    main?.appendChild(game);

    const SpinCpuHand = (): void => {
        img.src = mgr.GetHandImg();
        timeoutId = setTimeout(() => {
            SpinCpuHand();
        }, 100);
    }
}