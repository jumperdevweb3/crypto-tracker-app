export const urlFetchList = {
  currenciesList:
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d",
  exchangesList:
    "https://api.coingecko.com/api/v3/exchanges?per_page=25&page=1",
  companiesList:
    "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin",
  nftsList:
    "https://api.coingecko.com/api/v3/nfts/list?order=h24_volume_native_desc&asset_platform_id=ethereum&per_page=50&page=1",
  nft: "https://api.coingecko.com/api/v3/nfts/",
  chartData: {
    firstPhrase: "https://api.coingecko.com/api/v3/coins/",
    secondPhrase: "/market_chart?vs_currency=usd&days=450&interval=daily",
  },
  etherScan: `https://api.etherscan.io/api?module=account&action=balance&tag=latest&market_chart?vs_currency=usd&days=450&interval=daily&apikey=${process.env.API_ETHERSCAN_KEY}&address=`,
  newsList:
    "https://data.messari.io/api/v1/news?fields=title,author/name,id,published_at,tags,url",
  newsSubpageId: "https://data.messari.io/api/v1/news?fields=id",
};
