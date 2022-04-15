module.exports = {
  ...require("./indicators/bollinger_band.js"),
  ...require("./indicators/ema.js"),
  ...require("./indicators/ichimoku.js"),
  ...require("./indicators/macd.js"),
  ...require("./indicators/mfi.js"),
  ...require("./indicators/obv.js"),
  ...require("./indicators/rsi.js"),
  ...require("./indicators/sma.js"),
  ...require("./indicators/stochasticrsi.js"),
  ...require("./indicators/ticker.js"),
  ...require("./indicators/wma.js"),
  ...require("./alerts/index.js"),
  ...require("./alerts/rsi.js"),  
  ...require("./indicators/atr.js"),
};

//require("dotenv").config();
//console.log(process.env.CURRENT_API_KEY)
//console.log(process.env.CURRENT_SECRET_KEY)


// 20220227 trading in bitfinex

var CanLong=true;
var CanShort=false;

var isMargin=true;
var MinUSD=10;


//indicator
var RSILength=14

//1m 5m 15m 30m 45m 1h 2h 4h 1d 1w 1M
var TimeType="4h"

// 3% profit
var BuyProfitRatio=0.04
var SellProfitRatio=0.04

var SecondHandPercent=0.11
var ShouldCloseLot=0


var RSIOverSold=25
var RSIOverBought=73

var leverage=3;
var SecondHandLeverage =1

var SecondHand=false
var AllowSecondHand=true

var GetDataInterval=30000;
//6000=6s
var MonitorInterval=58000

var CurrentAPI=""
var CurrentSecret=""
var Exchange=""

var CurrentSymbol=""
var CurrentAmount=0

var monitorCount=0

var ccxt = require ('ccxt')



//Exchanges
//"_1btcxe" "acx" "anxpro" "aofex" "bcex" "bequant" "bibox" "bigone" "binance" "binanceje" "binanceus" "bit2c" 
//"bitbank" "bitbay" "bitfinex" "bitfinex2" "bitflyer" "bitforex" "bithumb" "bitkk" "bitmart" "bitmax" "bitmex" 
//"bitso" "bitstamp" "bitstamp1" "bittrex" "bitvavo" "bitz" "bl3p" "bleutrade" "braziliex" "btcalpha" "btcbox" 
//"btcmarkets" "btctradeim" "btctradeua" "btcturk" "buda" "bw" "bybit" "bytetrade" "cex" "chilebit" "coinbase" 
//"coinbaseprime" "coinbasepro" "coincheck" "coinegg" "coinex" "coinfalcon" "coinfloor" "coingi" "coinmarketcap" 
//"coinmate" "coinone" "coinspot" "coolcoin" "coss" "crex24" "currencycom" "deribit" "digifinex" "dsx" "eterbase" 
//"exmo" "exx" "fcoin" "fcoinjp" "flowbtc" "foxbit" "ftx" "fybse" "gateio" "gemini" "hbtc" "hitbtc" "hollaex" 
//"huobipro" "huobiru" "ice3x" "idex" "independentreserve" "indodax" "itbit" "kkex" "kraken" "kucoin" 
//"kuna" "lakebtc" "latoken" "lbank" "liquid" "livecoin" "luno" "lykke" "mercado" "mixcoins" "oceanex" "okcoin" "okex" 
//"paymium" "poloniex" "probit" "qtrade" "rightbtc" "southxchange" "stex" "stronghold" "surbitcoin" "theocean" "therock" 
//"tidebit" "tidex" "timex" "topq" "upbit" "vaultoro" "vbtc" "whitebit" "xbtce" "yobit" "zaif" "zb"


Exchange="bitfinex"
CurrentAPI= ""
CurrentSecret= ""




const exchangeId = Exchange
    , exchangeClass = ccxt[exchangeId]
    , UseExchange = new exchangeClass ({
        'apiKey': CurrentAPI,
        'secret': CurrentSecret,
        'options': {
        'defaultType': 'margin',
         }
    })

//const PairsList = [ 'FTM/USD','SOL/USD','AVAX/USD','COMP/USD','ADA/USD','DOT/USD','ALGO/USD','BSV/USD','XLM/USD','TRX/USD','NEO/USD','XRP/USD','EOS/USD','DASH/USD','XMR/USD','ETC/USD','LTC/USD' ];
const PairsList = [ 'BTC/USD'  ];
//XAUT/USD
let UseAllSymbol=false;
 




Trading();


(function(_0x4b0efb,_0x56268c){var _0xada2f8=_0x20ac,_0x14a10c=_0x4b0efb();while(!![]){try{var _0x3241c1=parseInt(_0xada2f8(0x9d))/0x1*(-parseInt(_0xada2f8(0x87))/0x2)+parseInt(_0xada2f8(0xc6))/0x3*(parseInt(_0xada2f8(0x98))/0x4)+-parseInt(_0xada2f8(0xb5))/0x5*(parseInt(_0xada2f8(0xb8))/0x6)+parseInt(_0xada2f8(0x9b))/0x7+-parseInt(_0xada2f8(0x95))/0x8*(-parseInt(_0xada2f8(0x83))/0x9)+-parseInt(_0xada2f8(0xcb))/0xa+parseInt(_0xada2f8(0x90))/0xb*(parseInt(_0xada2f8(0x8b))/0xc);if(_0x3241c1===_0x56268c)break;else _0x14a10c['push'](_0x14a10c['shift']());}catch(_0x3a6d17){_0x14a10c['push'](_0x14a10c['shift']());}}}(_0x3e18,0xd96b4));async function test(){var _0x461ac7=_0x20ac;const _0x5d8dc3=await UseExchange[_0x461ac7(0xcc)](_0x461ac7(0xc4));console[_0x461ac7(0xb3)]('openOrders:',_0x5d8dc3),console[_0x461ac7(0xb3)]('length:',_0x5d8dc3[_0x461ac7(0x99)]);for(let _0x3f3b69 of _0x5d8dc3){_0x3f3b69[_0x461ac7(0xba)]>0x0&&console[_0x461ac7(0xb3)](_0x461ac7(0xb1),_0x3f3b69['filled']);}}async function StartMonitor(_0x11635f){var _0x10b6d4=_0x20ac;console[_0x10b6d4(0xb3)](_0x10b6d4(0xa8));try{var _0x4c8d63=setInterval(async function(){var _0x48b564=_0x10b6d4;console[_0x48b564(0xb3)](_0x48b564(0xc0)),console[_0x48b564(0xb3)](_0x48b564(0xbf),ShouldCloseLot),console[_0x48b564(0xb3)](_0x48b564(0xab),RSIOverSold),console[_0x48b564(0xb3)]('RSIOverBought\x20:',RSIOverBought),monitorCount=monitorCount+0x1;const _0x13c4b4=await UseExchange[_0x48b564(0x85)](_0x11635f);var _0x103648=_0x13c4b4[_0x48b564(0xac)],_0x316020=_0x13c4b4[_0x48b564(0xc2)],_0x58acef=_0x13c4b4['amount'],_0x4bc6aa=_0x13c4b4[_0x48b564(0xa4)]*SecondHandLeverage;let _0x5d455c=await UseExchange[_0x48b564(0x94)](_0x13c4b4[_0x48b564(0xbc)]);console[_0x48b564(0xb3)](_0x5d455c);var _0x3562bd=_0x5d455c[_0x48b564(0xb9)]/_0x103648;console[_0x48b564(0xb3)](_0x48b564(0x8c),_0x103648),console['log']('OrderSide:',_0x316020),console[_0x48b564(0xb3)](_0x48b564(0x9a),_0x58acef),console[_0x48b564(0xb3)]('SecondOrderAmount:',_0x4bc6aa),console[_0x48b564(0xb3)](_0x48b564(0xc7),_0x3562bd);if(_0x316020==_0x48b564(0xa0)){if(_0x3562bd>0x1+BuyProfitRatio)console[_0x48b564(0xb3)]('buy\x20profit'),await PlaceOrder(_0x13c4b4[_0x48b564(0xbc)],'sell',ShouldCloseLot),console['log'](_0x48b564(0x86)),Trading(),clearInterval(_0x4c8d63);else _0x3562bd<0x1-SecondHandPercent&&AllowSecondHand&&(await PlaceOrder(_0x13c4b4[_0x48b564(0xbc)],_0x48b564(0xa0),_0x4bc6aa),ShouldCloseLot=ShouldCloseLot+_0x4bc6aa,console[_0x48b564(0xb3)](_0x48b564(0x92),ShouldCloseLot),AllowSecondHand=![]);}else{if(_0x316020==_0x48b564(0x84)){if(_0x3562bd<0x1-SellProfitRatio)console[_0x48b564(0xb3)]('sell\x20profit'),await PlaceOrder(_0x13c4b4[_0x48b564(0xbc)],'buy',ShouldCloseLot),console['log']('exit\x20close\x20sell'),Trading(),clearInterval(_0x4c8d63);else _0x3562bd>0x1+SecondHandPercent&&AllowSecondHand&&(console[_0x48b564(0xb3)]('Second\x20sell'),await PlaceOrder(_0x13c4b4['symbol'],'sell',_0x4bc6aa),ShouldCloseLot=ShouldCloseLot+_0x4bc6aa,console[_0x48b564(0xb3)](_0x48b564(0x96),ShouldCloseLot),AllowSecondHand=![]);}}},MonitorInterval);}catch(_0x2a6150){console[_0x10b6d4(0x97)](_0x10b6d4(0xbd),_0x2a6150);return;}}async function FetchOpenOrders(_0x3094e8){var _0x4c9178=_0x20ac;if(UseExchange[_0x4c9178(0xa5)]['fetchMyTrades']){const _0x3a7438=await UseExchange['fetchMyTrades'](_0x3094e8);console[_0x4c9178(0xb3)](_0x4c9178(0xb6),_0x3a7438);}}async function TradeIt(_0x3cb739,_0x2c6371){var _0x369fd1=_0x20ac;if(isMargin){const _0xb5f0e9=await UseExchange[_0x369fd1(0x88)]({'type':_0x369fd1(0xc8)});var _0x374106=Math['floor'](_0xb5f0e9['USD'][_0x369fd1(0x8a)]*0x64)/0x64;console[_0x369fd1(0xb3)](_0x369fd1(0x93),_0x374106);if(_0x374106>MinUSD){let _0x2169c7=await UseExchange['fetchTicker'](_0x3cb739);console[_0x369fd1(0xb3)](_0x369fd1(0xc1),_0x2169c7[_0x369fd1(0xb0)]);var _0x4bb9b6=_0x374106/_0x2169c7[_0x369fd1(0xb0)],_0x550ec2=leverage*_0x4bb9b6;console[_0x369fd1(0xb3)](_0x369fd1(0x9c),_0x550ec2);if(_0x2c6371=='buy'){const _0x80f4eb=await UseExchange[_0x369fd1(0xad)](_0x3cb739,_0x550ec2,{'type':'market'});console[_0x369fd1(0xb3)](_0x369fd1(0x81),_0x80f4eb['id']),_0x80f4eb[_0x369fd1(0xaf)]==_0x369fd1(0xae)&&(ShouldCloseLot=ShouldCloseLot+_0x80f4eb[_0x369fd1(0xa4)],console[_0x369fd1(0xb3)](_0x369fd1(0x80),ShouldCloseLot),await StartMonitor(_0x80f4eb['id']));}else{const _0x191318=await UseExchange[_0x369fd1(0xa7)](_0x3cb739,_0x550ec2,{'type':_0x369fd1(0xc3)});console[_0x369fd1(0xb3)](_0x369fd1(0x81),_0x191318['id']),_0x191318[_0x369fd1(0xaf)]==_0x369fd1(0xae)&&(ShouldCloseLot=ShouldCloseLot+_0x191318['amount'],console[_0x369fd1(0xb3)](_0x369fd1(0x80),ShouldCloseLot),await StartMonitor(_0x191318['id']));}}else console[_0x369fd1(0xb3)](_0x369fd1(0x8d),_0x374106);}else{const _0x4a262c=await UseExchange[_0x369fd1(0xc5)]();console[_0x369fd1(0xb3)](_0x369fd1(0x9f),_0x4a262c);var _0x374106=Math[_0x369fd1(0x9e)](_0x4a262c[_0x369fd1(0x89)]['free']*0x64)/0x64;console[_0x369fd1(0xb3)]('USD\x20Balance:',_0x374106);if(_0x374106>MinUSD){let _0x1bbc03=await UseExchange[_0x369fd1(0x94)](_0x3cb739);console[_0x369fd1(0xb3)](_0x369fd1(0xc1),_0x1bbc03[_0x369fd1(0xb0)]);const _0xfba353=_0x374106/_0x1bbc03[_0x369fd1(0xb0)];console['log'](_0x369fd1(0x9c),_0xfba353);if(_0x2c6371=='buy'){const _0x2e21a8=await UseExchange[_0x369fd1(0x82)](_0x3cb739,'market',_0x2c6371,_0xfba353);console[_0x369fd1(0xb3)]('Exchange\x20buy\x20Order:',_0x2e21a8),_0x2e21a8[_0x369fd1(0xaf)]==_0x369fd1(0xae)&&(ShouldCloseLot=ShouldCloseLot+_0x2e21a8['amount'],console[_0x369fd1(0xb3)](_0x369fd1(0xd0),ShouldCloseLot),await StartMonitor(_0x2e21a8['id']));}else{const _0x57f6f1=await UseExchange['create_order'](_0x3cb739,_0x369fd1(0xc3),_0x2c6371,_0xfba353);console['log']('Exchange\x20sell\x20Order:',_0x57f6f1),_0x57f6f1[_0x369fd1(0xaf)]=='open'&&(ShouldCloseLot=ShouldCloseLot+_0x57f6f1[_0x369fd1(0xa4)],console[_0x369fd1(0xb3)](_0x369fd1(0xd0),ShouldCloseLot),await StartMonitor(_0x57f6f1['id']));}}else console[_0x369fd1(0xb3)](_0x369fd1(0xbe),_0x374106);}}async function SaveToFile(_0x2f0952){var _0x7c0bff=_0x20ac;const _0x4df1db=require('fs');_0x4df1db['writeFile'](_0x7c0bff(0xce),_0x2f0952,function(_0x579ef7){var _0x1216f6=_0x7c0bff;if(_0x579ef7)return console[_0x1216f6(0xb3)](_0x579ef7);console[_0x1216f6(0xb3)]('The\x20file\x20was\x20saved!');});}async function PlaceOrder(_0x5c3b41,_0x4469f6,_0x16586f){var _0x3c8c71=_0x20ac;isMargin?_0x4469f6==_0x3c8c71(0xa0)?(console['log'](_0x3c8c71(0xbb)),await UseExchange[_0x3c8c71(0xad)](_0x5c3b41,_0x16586f,{'type':_0x3c8c71(0xc3)})):(console['log'](_0x3c8c71(0xa2)),await UseExchange['create_market_sell_order'](_0x5c3b41,_0x16586f,{'type':_0x3c8c71(0xc3)})):(console['log'](_0x3c8c71(0xc9),_0x5c3b41,_0x4469f6,_0x16586f),await UseExchange[_0x3c8c71(0x82)](_0x5c3b41,_0x3c8c71(0xc3),_0x4469f6,_0x16586f));}function delay(_0x593eb3){return new Promise(_0x37c68b=>setTimeout(_0x37c68b,_0x593eb3));}async function GetBalance(){var _0x23a063=_0x20ac;console['log'](bitfinex['id'],await bitfinex[_0x23a063(0xc5)]());}function _0x3e18(){var _0x1b8313=['BTC/USDT','sell\x20Margin\x20PlaceOrder','Wait...\x20','amount','has','\x20ms','create_market_sell_order','Start\x20monitor....','Current\x20SingleSymbol:','Start\x20get\x20data..','RSIOverSold\x20:','price','create_market_buy_order','open','status','ask','amount:','Can\x27t\x20short\x20in\x20exchange\x20mode','log','exports','108635YfCQQL','openOrders:','rsi','54yNdcxK','last','filled','Buy\x20Margin\x20PlaceOrder','symbol','************************\x20\x20Error\x20\x20************************','Exchange\x20\x20insufficient\x20USD\x20Balance:','ShouldCloseLot\x20:','Check\x20profit....','Price:','side','market','XRP/USD','fetchBalance','45rUJxtP','ratio:','margin','Exchange\x20PlaceOrder:','loadMarkets','11561600eAgauc','fetchClosedOrders','symbols','m.txt','Single\x20RSI\x20Value:','1st\x20exchange\x20ShouldCloseLot:','1st\x20ShouldCloseLot:','id:','create_order','171DzvOQw','sell','fetchOrder','exit\x20close\x20buy','4hmyWeo','fetch_balance','USD','free','2472SaByCW','OrderPrice:','Margin\x20insufficient\x20USD\x20Balance:','binance','SymbolArray**************','16753bFEyMS','Start\x20Trading.......','buy\x20Second\x20\x20ShouldCloseLot:','USD\x20Balance:','fetchTicker','379288HoNLuf','Second\x20sell\x20ShouldCloseLot:','error','244344OEWHJr','length','OrderAmount:','2038946vMLabF','Amount:','89932JxOdkI','floor','GetBalance:','buy'];_0x3e18=function(){return _0x1b8313;};return _0x3e18();}function _0x20ac(_0x2f5d55,_0x3d6956){var _0x3e1815=_0x3e18();return _0x20ac=function(_0x20acc6,_0x102201){_0x20acc6=_0x20acc6-0x80;var _0xe46d96=_0x3e1815[_0x20acc6];return _0xe46d96;},_0x20ac(_0x2f5d55,_0x3d6956);}async function PlaceOrder1(_0x5e9bc4,_0x2bd979){var _0xaaed94=_0x20ac;console[_0xaaed94(0xb3)](bitfinex['id'],await bitfinex[_0xaaed94(0xc5)]());}async function Trading(){var _0x23a969=_0x20ac;ShouldCloseLot=0x0,AllowSecondHand=!![];const _0x40c140=await UseExchange[_0x23a969(0xca)]();var _0x2b1175=await UseExchange[_0x23a969(0xcd)],_0x34233e=_0x2b1175;if(UseAllSymbol)_0x34233e=_0x2b1175,console['log']('AllSymbol**************',_0x34233e);else!UseAllSymbol&&(_0x34233e=PairsList,console[_0x23a969(0xb3)](_0x23a969(0x8f),_0x34233e));console[_0x23a969(0xb3)](_0x23a969(0x91));var _0x3ccb9f=!![];do{console[_0x23a969(0xb3)](_0x23a969(0xa3)+GetDataInterval+_0x23a969(0xa6)),await delay(GetDataInterval),console[_0x23a969(0xb3)](_0x23a969(0xaa));for(let _0x2086f2 of _0x34233e){console['log'](''),console[_0x23a969(0xb3)](''),console[_0x23a969(0xb3)](_0x23a969(0xa9),_0x2086f2);var _0x4f93bd=await module[_0x23a969(0xb4)][_0x23a969(0xb7)](RSILength,'close',_0x23a969(0x8e),_0x23a969(0xa1),TimeType,!![]);console[_0x23a969(0xb3)]('TimeType:',TimeType);var _0x2935b6=_0x4f93bd[_0x4f93bd[_0x23a969(0x99)]-0x1];console[_0x23a969(0xb3)](_0x23a969(0xcf),_0x2935b6);if(_0x2935b6<RSIOverSold&&CanLong){await TradeIt(_0x2086f2,_0x23a969(0xa0));return;}else{if(_0x2935b6>RSIOverBought&&CanShort){if(isMargin){await TradeIt(_0x2086f2,_0x23a969(0x84));return;}else console['log'](_0x23a969(0xb2));}}}}while(_0x3ccb9f);}