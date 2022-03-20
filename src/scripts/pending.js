var settings = require("../constants/settings.json");
var ethers = require("ethers");

const init = () => {
  var wsProvider = new ethers.providers.WebSocketProvider(
    settings.wss_provider
  );

  wsProvider.on("pending", (tx) => {
    wsProvider.getTransaction(tx).then((transaction) => {
      console.log(transaction);
    });
  });

  wsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });

  wsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    wsProvider._websocket.terminate();
    setTimeout(init, 3000);
  });
};

init();
