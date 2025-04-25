import { KiteConnect } from "kiteconnect";

const apiKey = process.env.REACT_APP_KITE_API_KEY;
const apiSecret = process.env.REACT_APP_KITE_API_SECRET;
const accessToken: string = process.env.REACT_APP_KITE_ACCESS_TOKEN!;

const kc = new KiteConnect({ api_key: process.env.REACT_APP_KITE_API_KEY! });





export async function placeOrder(tradingSymbol: string, quantity: number, type: "BUY" | "SELL" ,ordertype :"regular"| "amo") {
  try {
    kc.setAccessToken(accessToken);
    await kc.placeOrder(ordertype, {
        exchange: "NSE",
        tradingsymbol: tradingSymbol,
        transaction_type: type,
        quantity: quantity,
        order_type: "MARKET",
        product: "CNC",

        
    });
    
  } catch (err) {
    console.error( err);
  }
}
// Initialize the API calls
export async function getHoldings(){
    kc.setAccessToken(accessToken);
    const holdings = await kc.getHoldings();
    let allholdings = "";
    holdings.map(holdings=>{
      allholdings += `trading symbol ${holdings.tradingsymbol}, quantity ${holdings.quantity},current price ${holdings.last_price} `;
    })
    return allholdings
}
