const fs = require("fs")
const config = require("./config.json");

function retornarPrecinhos(whatsapp, chatId, tipoRestaurante) {
    const restaurantes = JSON.parse(fs.readFileSync(`./src/responses/${tipoRestaurante}.json`))
    console.log(restaurantes)
    for (let index = 0; index < restaurantes.length; index++) {
        const element = restaurantes[index];

        element.produtos.forEach(async (item) => {
            if (item.porcentagem >= config.porcentagem) {
                await whatsapp.sendText(
                    chatId,
                    `${emojiParaComida(tipoRestaurante)} com precinho!!!!\nRestaurante: ${element.nome}\nProduto:${item.descricao}\nPreço Original: R$ ${item.preco}\nDesconto: R$ ${item.precoDesconto}\nPorcentagem desconto: ${item.porcentagem}% \nLink: ${element.link}`
                );
            }
        });
    }
}


function emojiParaComida(tipoRestaurante) {
    return "🍣 japa"
}

module.exports = {
    retornarPrecinhos: retornarPrecinhos,
};
