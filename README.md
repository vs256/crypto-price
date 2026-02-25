# Flow Launcher: CryptoPrice

A fast, lightweight cryptocurrency price tracker for [Flow Launcher](https://github.com/Flow-Launcher/Flow.Launcher). 

Type your favorite coin's ticker symbol (or full name) directly into Flow Launcher to instantly get the current USD price, powered by the KuCoin API.

![CryptoPrice Demo](https://raw.githubusercontent.com/vs256/crypto-price/main/images/1.png)

## ✨ Features
* **Lightning Fast:** Caches the master coin list locally so searching as you type is instantaneous.
* **Massive Library:** Supports over 1,000+ cryptocurrencies (including privacy coins like XMR) via KuCoin.
* **Search:** Search by ticker symbol (`btc`, `eth`).
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

* `crypto btc` (Searches by ticker)
* `crypto ethereum` (Searches by full name)
* `crypto 10 xmr` (Calculates the value of 10 Monero)

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
