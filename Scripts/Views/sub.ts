"use strict";
{
    const dataLength: number = localStorage.length;
    const resultTbody: HTMLElement | null = document.getElementById('jankenResult');

    for (let i = 0; i < dataLength; i++) {
        const tr = document.createElement('tr');
        const dataKey = 'data' + i;
        const data = localStorage.getItem(dataKey);

        if (data) {
            const jankenData = JSON.parse(data);

            Object.entries(jankenData).forEach(([key, value]) => {
                const th = document.createElement('th');
                th.textContent = `${value}`;
                tr.appendChild(th);
            });
            resultTbody!.appendChild(tr);
        }
    }
}