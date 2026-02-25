import fs from "fs";
import { exec } from "child_process";
import axios from "axios";
import { Flow } from "flow-launcher-helper";
import { getResult, processData, copy } from "./helpers.js";
import { config, answer } from "./config.js";

const { on, showResult, run } = new Flow("..\\icons\\app.png");
const COIN_LIST_FILE = "coin_list.json";

// The VIP override list to prevent meme coins from stealing major tickers
const majorCoins = {
  btc: "bitcoin",
  eth: "ethereum",
  usdt: "tether",
  bnb: "binancecoin",
  sol: "solana",
  xrp: "ripple",
  usdc: "usd-coin",
  ada: "cardano",
  doge: "dogecoin",
  xmr: "monero",
};

on("query", async (params) => {
  const [count, query] = processData(params[0] || "");
  const lowerQuery = query.toLowerCase();

  if (query.length <= 1) return showResult(answer.wait);

  try {
    let coinList = [];

    if (fs.existsSync(COIN_LIST_FILE)) {
      coinList = JSON.parse(fs.readFileSync(COIN_LIST_FILE, "utf-8"));
    } else {
      const listRes = await axios.get(`${config.apiBase}coins/list`);
      coinList = listRes.data;
      fs.writeFileSync(COIN_LIST_FILE, JSON.stringify(coinList));
    }

    let exactMatch = null;

    // 1. Smart Match: Check our major coins override list first
    if (majorCoins[lowerQuery]) {
      exactMatch = coinList.find((c) => c.id === majorCoins[lowerQuery]);
    }

    // 2. If not a major coin, search by exact CoinGecko ID (e.g. typing "bitcoin")
    if (!exactMatch) {
      exactMatch = coinList.find((c) => c.id.toLowerCase() === lowerQuery);
    }

    // 3. Fallback: Search by symbol and take the first result
    if (!exactMatch) {
      exactMatch = coinList.find((c) => c.symbol.toLowerCase() === lowerQuery);
    }

    // If still nothing, keep waiting
    if (!exactMatch) return showResult(answer.wait);

    const priceRes = await axios.get(
      `${config.apiBase}simple/price?ids=${exactMatch.id}&vs_currencies=usd&include_24hr_change=true`,
    );

    const coinData = {
      symbol: exactMatch.symbol.toUpperCase(),
      price: priceRes.data[exactMatch.id].usd,
      change24h: priceRes.data[exactMatch.id].usd_24h_change,
      id: exactMatch.id,
    };

    return showResult(...getResult(coinData, count));
  } catch (err) {
    if (err.response && err.response.status === 429) {
      return showResult({
        title: "Rate Limit Reached",
        subtitle: "You typed too fast! Please wait 60 seconds.",
        iconPath: `${config.iconsPath}error.png`,
      });
    }
    return showResult(answer.error(err));
  }
});

on("open_result", (params) => {
  // Uses the native Windows cmd to force the default browser to open the URL
  exec(`start "" "${params[0]}"`);
});

on("copy_result", (params) => {
  copy(params[0]);
});

run();
