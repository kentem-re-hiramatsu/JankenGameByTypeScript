"use strict";
import { Manager } from "../Manager/manager.js";
{
    const mgr = new Manager();
    const dataLength = localStorage.length;
    const resultTbody = document.getElementById('jankenResult');
    const returnBtn = document.getElementById('returnGame');
    returnBtn.addEventListener('click', () => {
        window.location.href = '../Views/main.html';
    });
    //ローカルストレージから取得、表示
    for (let i = 0; i < dataLength; i++) {
        const tr = document.createElement('tr');
        const dataKey = 'data' + i;
        const data = localStorage.getItem(dataKey);
        if (data) {
            const jankenData = JSON.parse(data);
            Object.entries(jankenData).forEach(([key, value]) => {
                const th = document.createElement('th');
                let text;
                if (key === '_userHand' || key === '_cpuHand') {
                    text = mgr.GetHand(parseInt(value, 10));
                }
                else if (key === '_result') {
                    text = mgr.GetResult(parseInt(value, 10));
                }
                else if (key === '_winRate') {
                    text = `${value}%`;
                }
                else {
                    text = `${value}`;
                }
                th.textContent = text;
                tr.appendChild(th);
            });
            resultTbody.appendChild(tr);
        }
    }
}
//# sourceMappingURL=sub.js.map