# Flow Launcher: CryptoPrice

A fast, lightweight cryptocurrency price tracker for [Flow Launcher](https://github.com/Flow-Launcher/Flow.Launcher). 

Type your favorite coin's ticker symbol directly into Flow Launcher to instantly get the current USD price, powered by the KuCoin API.

![CryptoPrice Demo](https://raw.githubusercontent.com/vs256/crypto-price/main/images/1.png)

## ✨ Features
* **Keyless & Unthrottled:** Pulls live market data directly from KuCoin's public exchange API for instant, rate-limit-free searches without requiring an API key.
* **Massive Library:** Supports over 1,000+ cryptocurrencies (including privacy coins like XMR).
* **Precision Search:** Search instantly by ticker symbol (`btc`, `eth`, `sol`).
* **Smart Formatting:** Large numbers are beautifully formatted with commas (e.g., `$66,000.00`).
* **Quick Actions:** * `Enter`: Opens the coin's live chart directly on KuCoin.
  * `Alt + Enter`: Copies the formatted price directly to your clipboard.

## 🚀 Installation

### Option 1: Via Flow Launcher (Recommended)
Once available in the official store, you can install this plugin directly from Flow Launcher:
1. Open Flow Launcher.
2. Type `pm install CryptoPrice` and hit Enter.

### Option 2: Manual Installation
1. Download the latest `.zip` release from the [Releases page](https://github.com/vs256/crypto-price/releases).
2. Extract the folder.
3. Move the extracted folder to your Flow Launcher plugins directory: 
   `%APPDATA%\FlowLauncher\Plugins`
4. Restart Flow Launcher or type `ReloadPluginData`.

## 💻 Usage

Trigger the plugin using the action keyword `crypto` followed by a space and your coin query:

* `crypto btc` (Gets the current price of 1 Bitcoin)
* `crypto 10 xmr` (Calculates the total USD value of 10 Monero)

## 🔮 Future Work (v1.3.0+)
The next major update will introduce direct currency conversions, turning the plugin into a powerful calculation tool for traders:
* **Crypto-to-Crypto Swaps:** Type `crypto 0.5 btc xmr` to instantly see how much Monero you can get for 0.5 Bitcoin.
* **Fiat Conversions:** Support for calculating exact crypto amounts based on USD input (e.g., `crypto 100 usd btc` to see how much Bitcoin $100 buys). 
* **Expanded Base Currencies:** Native support for checking prices in EUR, GBP, and other major world currencies.

## ⚙️ Requirements
* Flow Launcher v1.17+
* Node.js (Flow Launcher handles JavaScript plugins natively, but having Node installed locally ensures full compatibility).

## 🛠️ Built With
* [Node.js](https://nodejs.org/)
* [Axios](https://axios-http.com/) - For handling API requests.
* [KuCoin API](https://www.kucoin.com/api) - Free, rate-limit friendly cryptocurrency data.
* [Flow Launcher Helper](https://www.npmjs.com/package/flow-launcher-helper) - Boilerplate for JSON-RPC communication.

## 📄 License
This project is licensed under the MIT License.
