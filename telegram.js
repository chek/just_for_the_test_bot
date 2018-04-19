//const pem = require('pem')
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
//process.env.NODE_CONFIG_DIR = './config'
const config = require('config');
let bot
let telegram

exports.init = function() {
    let token;
    if(process.env.BOT_TOKEN) { 
        token = process.env.BOT_TOKEN;; 
    }
    else { 
        token = config.get('BOT_TOKEN'); 
    }

    bot = new Telegraf(token)
    telegram = new Telegram(token)
    
    bot.telegram.getMe().then((bot_informations) => {
        bot.options.username = bot_informations.username;
        console.log("Server has initialized bot nickname. Nick: "+bot_informations.username);
    });

    bot.start((ctx) => {
        start(ctx);
    })
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.on('sticker', (ctx) => {
        sticker(ctx)
    })
    bot.hears('hi', (ctx) => ctx.reply('Hey there'))
    bot.hears(/buy/i, (ctx) => {
        ctx.reply('Buy-buy')
    })

    bot.hears('ok', ctx => {
        //console.log(ctx)
        //console.log(ctx.update.message.message_id)
        ctx.reply('Yay!')
        //ctx.deleteMessage(ctx.update.message.message_id, ctx.update.message.chat.id)
    })
    bot.action('plain', (ctx) => {
    })
    bot.action('italic', (ctx) => {
    })
    bot.action(/.+/, (ctx) => {
        //console.log(ctx)
        //console.log(ctx.update.callback_query.message)
        ctx.deleteMessage(ctx.update.callback_query.message.message_id, ctx.update.callback_query.message.chat.id)
        //ctx.deleteMessage
        //console.log(ctx.message)
        return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
      })   

    bot.startPolling()
};
const start = function(ctx) {
    //console.log('start')
    ctx.reply('Welcome!')
}
const sticker = function(ctx) {
    //console.log('sticker')
    //ctx.reply('👍')
    //return renderConfirm(ctx, 'Wich one of these you want check?');
    return renderKeyboard(ctx, 'Wich one of these you want check?', ['ok', 'cancel']);
    
    
     
}
const renderConfirm = function(ctx, question) {
    return ctx.reply(question, Extra.markup(
        Markup.inlineKeyboard([
            Markup.callbackButton('Ok', 'ok'),
            Markup.callbackButton('Cancel', 'cancel')
        ])       
    ))    
}
const renderKeyboard = function(ctx, question, buttons) {
    return ctx.reply(question, Extra.markup(
        Markup.keyboard(buttons, false, true)
    ))    
}
