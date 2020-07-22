const puppeteer = require("puppeteer");
const fs = require("fs");
const config = require("../config.json");

const main = async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(config.link);
  await page.addScriptTag({ path: "./src/scripts/restaurantsIfood.js" });
  console.log("pegando restaurantes")
  const restaurantes = await page.evaluate(() => {
    return restaurantes;
  });
  console.log("pegado restaurantes")
  console.log(restaurantes)
  await page.close();
  for (let index = 0; index < restaurantes.length; index++) {
    console.log("Analisando restaurante ", index);
    const element = restaurantes[index];

    const page2 = await browser.newPage();
    await page2.goto(element.link);
    await page2.addScriptTag({
      path: "./src/scripts/itensRestauranteIfood.js",
    });

    const produtos = await page2.evaluate(() => {
      return itens;
    });
    await page2.close();

    element.produtos = produtos;
  }

  await browser.close();

  fs.writeFileSync(
    "./src/responses/restaurantes.json",
    JSON.stringify(restaurantes, null, 2)
  );


};

module.exports = {
  main: main,
};
