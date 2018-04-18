const pem = require('pem')
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
//let Telegraf
let bot
let telegram

exports.init = function() {

    bot = new Telegraf(process.env.BOT_TOKEN)
    telegram = new Telegram(process.env.BOT_TOKEN)
    
    bot.telegram.getMe().then((bot_informations) => {
        bot.options.username = bot_informations.username;
        console.log("Server has initialized bot nickname. Nick: "+bot_informations.username);
    });

    bot.start((ctx) => ctx.reply('Welcome!'))
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.on('sticker', (ctx) => ctx.reply('👍'))
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'))

    bot.startPolling()
};

exports.getBot = function() {
    return bot;
};
exports.startWebhook = function(host) {
    bot.telegram.setWebhook(host + '//secret-path')
};
exports.createCertificate = function() {
    pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
        if (err) {
          throw err
        }       
    })    
};
exports.getWebhookInfo = function() {
    telegram.getWebhookInfo().then(function(value) {
        console.log(value)
    });
};

