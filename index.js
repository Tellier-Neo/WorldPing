// Section packages finances //
const finance = require("yahoo-finance2").default;
const financeGet = new finance({ suppressNotices: ["yahooSurvey"] });

// Section finance //
const FinanceData = {
  brent: null,
  btc: null,
  eth: null,
  cac40: null,
  NASDAQ: null,
  XAUUSD: null,
};

//Fonction de recuperation des prix des actifs financiers

//Prix du Petrole Brent
async function getBrentPrice() {
  let rawBrentData = await financeGet.quote("BZ=F");
  let BrentDataPrice = rawBrentData.regularMarketPrice;
  FinanceData.brent = BrentDataPrice;
  console.log("Brent Price: " + FinanceData.brent);
}

//Prix du Bitcoin
async function getBTCPrice() {
  let rawBTCData = await financeGet.quote("BTC-USD");
  let BTCDataPrice = rawBTCData.regularMarketPrice;
  FinanceData.btc = BTCDataPrice;
  console.log("BTC Price: " + FinanceData.btc);
}

//Prix de l'Ethereum
async function getETHPrice() {
  let rawETHData = await financeGet.quote("ETH-USD");
  let ETHDataPrice = rawETHData.regularMarketPrice;
  FinanceData.eth = ETHDataPrice;
  console.log("ETH Price: " + FinanceData.eth);
}

//Prix du CAC40
async function getCAC40Price() {
  let rawCAC40Data = await financeGet.quote("^FCHI");
  let CAC40DataPrice = rawCAC40Data.regularMarketPrice;
  FinanceData.cac40 = CAC40DataPrice;
  console.log("CAC40 Price: " + FinanceData.cac40);
}

//Prix du NASDAQ
async function getNASDAQPrice() {
  let rawNASDAQData = await financeGet.quote("^IXIC");
  let NASDAQDataPrice = rawNASDAQData.regularMarketPrice;
  FinanceData.NASDAQ = NASDAQDataPrice;
  console.log("NASDAQ Price: " + FinanceData.NASDAQ);
}

//Prix de l'Or
async function getXAUUSDPrice() {
  let rawXAUUSDData = await financeGet.quote("GC=F");
  let XAUUSDDataPrice = rawXAUUSDData.regularMarketPrice;
  FinanceData.XAUUSD = XAUUSDDataPrice;
  console.log("XAUUSD Price: " + FinanceData.XAUUSD);
}

//Sections packages News mondiales //
const Parser = require("rss-parser");

const newsParser = new Parser();

//Temp News GUID Storage
const GuidLastID = null;

//Section News mondiales //
const BBClastWorldNews = {
  title: null,
  link: null,
  pubDate: null,
};

//Recuperation des news mondiales via BBC News
async function getBBCWorldNews() {
  const feed = await newsParser.parseURL(
    "https://feeds.bbci.co.uk/news/world/rss.xml",
  );
  const worldNews = feed.items[0];
  if (worldNews.guid !== GuidLastID) {
    let BBClastWorldNews = {
      title: worldNews.title,
      link: worldNews.link,
      pubDate: worldNews.pubDate,
    };
    GuidLastID = worldNews.guid;
    console.log("World News: " + BBClastWorldNews.title);
  } else {
    console.log("No new BBC World News");
  }
}

// Package d'affichage des informations en popup windows //
const notifier = require("node-notifier");
const path = require("path");
//Logique de rafraichissement des données financières
async function refreshData() {
  await getBrentPrice();
  await getBTCPrice();
  await getETHPrice();
  await getCAC40Price();
  await getNASDAQPrice();
  await getXAUUSDPrice();
}

async function refreshNews() {
  await getBBCWorldNews();
}

//Affichage des données financières et des news mondiales dans une popup window a interval de 1heure avec un affichage au lancement du programme

async function displayFinancialData() {
  console.log("Displaying financial data and world news...");

  notifier.notify({
    title: "Financial Data First Part",
    message: `Brent: ${FinanceData.brent} $ \nBTC: ${FinanceData.btc} $\nETH: ${FinanceData.eth} $\n`,
    wait: true,
    appID: "WorldPing",
    icon: path.join(__dirname, "worldping.ico"), // Optional: path to an icon image
  });
  notifier.notify({
    title: "Financial Data Second Part",
    message: `CAC40: ${FinanceData.cac40} points \nNASDAQ: ${FinanceData.NASDAQ} points\nXAUUSD: ${FinanceData.XAUUSD} $`,
    wait: true,
    appID: "WorldPing",
    icon: path.join(__dirname, "worldping.ico"), // Optional: path to an icon image
  });
}

async function displayWorldNews() {
  console.log("Displaying world news...");
  notifier.notify({
    title: "Latest World News",
    message: `${BBClastWorldNews.title}\nPublished on: ${BBClastWorldNews.pubDate}\nLink: ${BBClastWorldNews.link}`,
    wait: true,
    appID: "WorldPing",
    icon: path.join(__dirname, "worldping.ico"), // Optional: path to an icon image
  });
}

async function GatherData() {
  console.log("Gathering financial data and world news...");
  await refreshData();
  await refreshNews();
}

//Call the displayData function every hour and at the beginning (3600000 milliseconds)
async function StartApp() {
  console.log("Starting Financial Data and World News App...");
  await GatherData();
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for data to be gathered before displaying
  await displayFinancialData();
  await new Promise((resolve) => setTimeout(resolve, 15000)); // Wait for 15 seconds before displaying world news
  await displayWorldNews();
  //Attendre 1 heure avant de rafraichir les données et les news
  setInterval(async () => {
    await GatherData();
    await displayFinancialData();
    await new Promise((resolve) => setTimeout(resolve, 15000)); // Wait for 15 seconds before displaying world news
    await displayWorldNews();
  }, 3600000); // Change to 3600000 for 1 hour
}

//DEBUG SECTION//

//Test de rafraichissement des données
//refreshData();
//refreshNews();

StartApp();
