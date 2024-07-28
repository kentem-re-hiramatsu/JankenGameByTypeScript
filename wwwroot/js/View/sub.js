"use strict";
{
    const dataLength = localStorage.length;
    const resultTbody = document.getElementById('jankenResult');
    for (let i = 0; i < dataLength; i++) {
        const tr = document.createElement('tr');
        const data = localStorage.getItem('data' + i);
        if (data) {
            const jankenObject = JSON.parse(data);
            Object.keys(jankenObject).forEach((data) => {
                const th = document.createElement('th');
                th.textContent = data;
                tr.appendChild(th);
            });
            resultTbody === null || resultTbody === void 0 ? void 0 : resultTbody.appendChild(tr);
        }
    }
}
//# sourceMappingURL=sub.js.map