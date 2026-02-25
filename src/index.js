import fs from "fs";
import open from "open";
import axios from "axios";
import { Flow } from "flow-launcher-helper";
import { getResult, processData, copy } from "./helpers.js";
import { config, answer } from "./config.js";

const { on, showResult, run } = new Flow("..\\icons\\app.svg");

// We will save the master list locally to avoid rate limits
const COIN_LIST_FILE = "coin_list.json";

on("query", async (params) => {
  const [count, query] = processData(params[0] || "");

  if (query.length <= 1) return showResult(answer.wait);

  try {
    let coinList = [];

    // 1. Check if we already have the coin list cached locally
    if (fs.existsSync(COIN_LIST_FILE)) {
      const fileData = fs.readFileSync(COIN_LIST_FILE, "utf-8");
      coinList = JSON.parse(fileData);
    } else {
      // 2. If not, fetch it from CoinGecko ONCE and save it.
      // This endpoint gets the IDs and Symbols for all coins (it takes a second on the very first run)
      const listRes = await axios.get(`${config.apiBase}coins/list`);
      coinList = listRes.data;
      fs.writeFileSync(COIN_LIST_FILE, JSON.stringify(coinList));
    }

    // 3. Instantly search our local file for the exact coin (0 API calls!)
    const exactMatch = coinList.find(
      (c) =>
        c.symbol.toLowerCase() === query.toLowerCase() ||
        c.id.toLowerCase() === query.toLowerCase(),
    );

    // If they are still typing and haven't hit a valid coin yet, just show the wait UI
    if (!exactMatch) return showResult(answer.wait);

    // 4. We only hit the API for the price if we found an exact match locally!
    const priceRes = await axios.get(
      `${config.apiBase}simple/price?ids=${exactMatch.id}&vs_currencies=usd`,
    );

    const coinData = {
      symbol: exactMatch.symbol.toUpperCase(),
      price: priceRes.data[exactMatch.id].usd,
      id: exactMatch.id,
    };

    return showResult(...getResult(coinData, count));
  } catch (err) {
    // 5. Handle the 429 error gracefully so it doesn't just look broken
    if (err.response && err.response.status === 429) {
      return showResult({
        title: "Rate Limit Reached",
        subtitle:
          "You typed too fast! Please wait 60 seconds for CoinGecko to cool down.",
        iconPath: `${config.iconsPath}ratelimit.svg`,
      });
    }
    return showResult(answer.error(err));
  }
});

on("open_result", (params) => {
  open(params[0]);
});

on("copy_result", (params) => {
  copy(params[0]);
});

run();
