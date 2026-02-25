// import fs from "fs";
// import { exec } from "child_process";
// import axios from "axios";
// import { Flow } from "flow-launcher-helper";
// import { getResult, processData, copy } from "./helpers.js";
// import { config, answer } from "./config.js";

// const { on, showResult, run } = new Flow("..\\icons\\app.png");

// on("query", async (params) => {
//   const [count, query] = processData(params[0] || "");

//   if (query.length <= 1) return showResult(answer.wait);

//   try {
//     // KuCoin strictly formats its trading pairs as "BTC-USDT", "XMR-USDT", etc.
//     const ticker = query.toUpperCase() + "-USDT";

//     const res = await axios.get(
//       `${config.apiBase}market/stats?symbol=${ticker}`,
//     );

//     // KuCoin returns a "200000" code for success. If it fails (e.g., invalid coin), we show the wait screen.
//     if (res.data.code !== "200000" || !res.data.data) {
//       return showResult(answer.wait);
//     }

//     const marketData = res.data.data;

//     const coinData = {
//       symbol: query.toUpperCase(),
//       price: marketData.last,
//       // KuCoin returns the change rate as a raw decimal (e.g., 0.05 for 5%), so we convert it to a standard percentage
//       change24h: parseFloat(marketData.changeRate) * 100,
//       id: query.toUpperCase(),
//     };

//     return showResult(...getResult(coinData, count));
//   } catch (err) {
//     // Check if the error is specifically a 429 Rate Limit
//     if (err.response && err.response.status === 429) {
//       return showResult({
//         title: "Rate Limit Reached",
//         subtitle: "You typed a bit too fast! Please pause for a second.",
//         iconPath: `${config.iconsPath}error.png`,
//       });
//     }

//     // If it is a 404 (Coin doesn't exist on KuCoin) or any other network error, show a generic fail
//     return showResult(answer.notFound);
//   }
// });

// on("open_result", (params) => {
//   exec(`start "" "${params[0]}"`);
// });

// on("copy_result", (params) => {
//   copy(params[0]);
// });

// run();
