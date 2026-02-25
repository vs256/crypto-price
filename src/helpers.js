import fs from "fs";
import childProcess from "child_process";
import { config } from "./config.js";

export function getResult(coin, count) {
    const coinName = coin.symbol; 
    const price = parseFloat(coin.price);
    const formattedPrice = formatPrice(price, count);
    const iconPath = getIconPath(coinName);
    
    // Format the 24h percentage change natively from CoinGecko
    let diffString = '';
    if (coin.change24h !== undefined && count === 1) {
        const change = parseFloat(coin.change24h);
        const diffSign = change > 0 ? "⬆" : "⬇";
        diffString = `| ${diffSign} ${Math.abs(change).toFixed(2)}%`;
    }
    
    return [
        {
            title: `${count} ${coinName} | $${formattedPrice} ${diffString}`,
            subtitle: 'Copy to buffer',
            method: 'copy_result',
            params: [`${count} ${coinName} | $${formattedPrice}`],
            iconPath,
            score: 0
        },
        {
            title: `${coinName} | USD`,
            subtitle: `Open on CoinGecko`,
            method: 'open_result',
            params: [`https://www.coingecko.com/en/coins/${coin.id}`],
            iconPath
        }
    ];
}

export const copy = (content) => {
    childProcess.spawn('clip', {shell: true}).stdin.end(content);
};

export function processData(data) {
    if (data.includes(" ")) {
        const arrayData = data.split(" ");
        arrayData[0] = arrayData[0].replace(',', '.');
        return arrayData;
    }
    return [1, data];
}

function getSymbolCount(diff) {
    const splitNumber = diff.toFixed(20).split(".");
    if (!splitNumber[1]) return 0;
    
    const numbersAfterPoint = splitNumber[1];
    let symbolCount = 0;
    for (let i = 0; i <= numbersAfterPoint.length; i++) {
        if(numbersAfterPoint[i] !== '0') {
            symbolCount = i + 1;
            break;
        }
    }
    return symbolCount;
}

function formatPrice(price, count) {
    const countedPrice = price * count;
    if (count > 1) {
        const fixedDigits = countedPrice > 100 ? 2 : getSymbolCount(price);
        return countedPrice.toFixed(fixedDigits);
    }
    return price.toString();
}

function getIconPath(coinName) {
    const svgPath = `${config.iconsPath}${coinName}.svg`;
    const pngPath = `${config.iconsPath}${coinName}.png`;
    const defaultIconPath = `${config.iconsPath}app.png`;

    if (fs.existsSync(svgPath)) return svgPath;
    if (fs.existsSync(pngPath)) return pngPath;
    return defaultIconPath;
}