import fs from "fs";
import open from "open";
import axios from "axios";
import { Flow } from "flow-launcher-helper";
import { getResult, processData, copy } from "./helpers.js";
import { config, answer } from "./config.js";

const { on, showResult, run } = new Flow("..\\icons\\app.svg");

// Master list cached locally to prevent 429 Rate Limit errors
const COIN_LIST_FILE = "coin_list.json";

on("query", async (params) => {
  const [count, query] = processData(params[0] || "");

  if (query.length <= 1) return showResult(answer.wait);

  try {
    let coinList = [];

    if (fs.existsSync(COIN_LIST_FILE)) {
      const fileData = fs.readFileSync(COIN_LIST_FILE, "utf-8");
      coinList = JSON.parse(fileData);
    } else {
      const listRes = await axios.get(`${config.apiBase}coins/list`);
      coinList = listRes.data;
      fs.writeFileSync(COIN_LIST_FILE, JSON.stringify(coinList));
    }

    const exactMatch = coinList.find(
      (c) => c.symbol.toLowerCase() === query.toLowerCase() || 
             c.id.toLowerCase() === query.toLowerCase()
    );

    if (!exactMatch) return showResult(answer.wait);

    const priceRes = await axios.get(
      `${config.apiBase}simple/price?ids=${exactMatch.id}&vs_currencies=usd&include_24hr_change=true`
    );

    const coinData = {
      symbol: exactMatch.symbol.toUpperCase(),
      price: priceRes.data[exactMatch.id].usd,
      change24h: priceRes.data[exactMatch.id].usd_24h_change,
      id: exactMatch.id
    };

    return showResult(...getResult(coinData, count));

  } catch (err) {
    if (err.response && err.response.status === 429) {
      return showResult({
          title: "Rate Limit Reached",
          subtitle: "You typed too fast! Please wait 60 seconds.",
          iconPath: `${config.iconsPath}ratelimit.svg`
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