import { placeOrder } from "./trade";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { serve } from "bun";
import { z } from "zod";
import { getHoldings } from "./trade";

const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});


server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);



server.tool("buy-stock-regular", "Buys a stock for user in zerodha exchnage if market is open . It executes  a real order on zerodha if indian market is open",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    placeOrder(stock, quantity, "BUY", "regular");
    return { content: [{ type: "text", text: `Placed order for ${quantity} shares of ${stock}` }] };
  }
)

server.tool("sell-stock-regular", "Sells a stock for user in zerodha exchnage if indian market is open . It executes  a real order on zerodha if indian market is open",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    placeOrder(stock, quantity, "SELL", "regular");
    return { content: [{ type: "text", text: `Placed order for ${quantity} shares of ${stock}` }] };
  }
)

server.tool("buy-a-stock-after-market", "Buys a stock for user in zerodha exchnage if indian market is closed . It executes  a real order on zerodha if  indian market is closed",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    placeOrder(stock, quantity, "BUY", "amo");
    return { content: [{ type: "text", text: `Placed order for ${quantity} shares of ${stock}` }] };
  }
)
server.tool("sell-a-stock-after-market", "Sells a stock for user in zerodha exchnage if indian market is closed . It executes  a real order on zerodha if indian market is closed",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    placeOrder(stock, quantity, "SELL", "amo");
    return { content: [{ type: "text", text: `Placed order for ${quantity} shares of ${stock}` }] };
  }
)
server.tool(
  "show-portfolio-holdings",
  "Shows my complete portfolio holdings",
  {},
  async () => {
    const holdings = await getHoldings();
    return {
      content: [{ type: "text", text: holdings }],
    };
  }
);



const transport = new StdioServerTransport();
await server.connect(transport);