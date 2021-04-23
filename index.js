//iterates through uniform urls which differ from each other only by some id

const puppeteer = require('puppeteer');
const userAgent = require('user-agents');
let cycles = 562;
let startNumber = 4254;
let tailStr = '&dbName=firLite&region_key=178';
let url = 'https://rosreestr.gov.ru/wps/portal/p/cc_ib_portal_services/online_request/!ut/p/z1/pZBNc8IgEIZ_Sw89s8TEqDeqju3Yav1qTS4MQcbgJCRDSDv994Uko72ohzIc2N333X0WFKM9ihX7kkdmZKFYZuMo7tPZyp_isY_nsxUOgbyQOe7hGcA2QJ83BUuM4v_4rcD54cohYP3xzRFj747AId4bElnIkAJ-Jpj43nw52Q6BrHvw8brwPACMNq4HL5TRRZYJjaJH2AimeUq4-0hXTYu6EraTfRbZgao6T5zQxZXRQpjzu-am1p2UlUybXKiuylnjRFE4GEF_ZOk8CIYj3wv8SyNqfkprtwG0SduClkUlG5QoGLqslsfUUC2O3dg6OQneTUlqmR2k6kpW0_gamTAmExeeqlmSsnbLyLKLZsHk1GL-0bRQYzKhi93b03TtSkJx-w2aKS46lDLf7UG-5_mgd-V-P_wCQRFtVA!!/p0/IZ7_01HA1A42KODT90AR30VLN22001=CZ6_GQ4E1C41KGQ170AIAK131G00T5=MEcontroller!QCPObjectDataController==/?object_data_id=78:6:2059:4254&dbName=firLite&region_key=178';
let beginURLStr = 'https://rosreestr.gov.ru/wps/portal/p/cc_ib_portal_services/online_request/!ut/p/z1/pZBNc8IgEIZ_Sw89s8TEqDeqju3Yav1qTS4MQcbgJCRDSDv994Uko72ohzIc2N333X0WFKM9ihX7kkdmZKFYZuMo7tPZyp_isY_nsxUOgbyQOe7hGcA2QJ83BUuM4v_4rcD54cohYP3xzRFj747AId4bElnIkAJ-Jpj43nw52Q6BrHvw8brwPACMNq4HL5TRRZYJjaJH2AimeUq4-0hXTYu6EraTfRbZgao6T5zQxZXRQpjzu-am1p2UlUybXKiuylnjRFE4GEF_ZOk8CIYj3wv8SyNqfkprtwG0SduClkUlG5QoGLqslsfUUC2O3dg6OQneTUlqmR2k6kpW0_gamTAmExeeqlmSsnbLyLKLZsHk1GL-0bRQYzKhi93b03TtSkJx-w2aKS46lDLf7UG-5_mgd-V-P_wCQRFtVA!!/p0/IZ7_01HA1A42KODT90AR30VLN22001=CZ6_GQ4E1C41KGQ170AIAK131G00T5=MEcontroller!QCPObjectDataController==/?object_data_id=78:6:2059:';
fs = require('fs');

async function fetchDataFromPages(cycles, startNumber, tailStr, beginURLStr) {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: null });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.toString());

    let searchNumber = 0;
    let searchURL = '';
    for (let i = 0; i < cycles; i++) {
        searchNumber = startNumber + i;
        searchURL = beginURLStr + searchNumber + tailStr;

        await page.goto(searchURL, { waitUntil: 'load' });
        await page.waitForSelector('#r_enc');

        const searchResArr = await page.evaluate(() => {
            let searchNodes = Array.from(document.querySelectorAll('#r_enc td[style]'));
            return searchNodes.map(node => node.innerText.replace(/\s+/g, " ").trim());
        });

        console.log(searchNumber + ';' + searchResArr.join(';'));
        fs.appendFileSync('output.txt', `${searchNumber};${searchResArr.join(';')}\n`);
    }
    await browser.close();
}

fetchDataFromPages(cycles, startNumber, tailStr, beginURLStr);
