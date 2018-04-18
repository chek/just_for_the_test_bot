exports.init = function() {
    const Telegraf = require('telegraf')

    const bot = new Telegraf(process.env.BOT_TOKEN)
    
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
