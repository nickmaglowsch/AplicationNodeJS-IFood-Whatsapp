const app = require("./src/fluxo");
const bot = require("./funcoesBot");
const sulla = require("venom-bot");


(async () => {
  const whatsapp = await sulla.create();
  setInterval(function () {
    app.main();
  }, 1 * 60 * 60 * 1000); // 1 hour
  whatsapp.onMessage(async msg => {
    if (msg.body === "!bott") {
      // await app.main();
      bot.retornarPrecinhos(whatsapp, msg.chatId, "restaurantes")

    }
  })
})();


