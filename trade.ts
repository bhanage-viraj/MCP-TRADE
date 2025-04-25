import { KiteConnect } from "kiteconnect";

const apiKey = "609if7cf08xzv60j";
const apiSecret = "4nfoxvqar7awnggv91b4m9y75ispfwn4";
// const requestToken = "vf5T8KewJfDW5HiWSyVdZMywWbGWo40r";

const kc = new KiteConnect({ api_key: apiKey });
let accessToken = "QsLNvJTHeaBQBnmmDcfuudkQIiF4SIOv";




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
