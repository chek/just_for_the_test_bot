const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const config = require('config')
const confirmation = require('./components/confirmation')

let bot
let telegram

exports.bot = function () {
    return bot
}
exports.init = function () {
    if (typeof bot !== 'undefined') return
    let token
    if(process.env.BOT_TOKEN) { 
        token = process.env.BOT_TOKEN
    }
    else { 
        token = config.get('BOT_TOKEN')
    }
    bot = new Telegraf(token)
    telegram = new Telegram(token)
    //console.log(process.env)
    //console.log(process.env.NODE_ENV)
    bot.telegram.getMe().then((bot_informations) => {
        bot.options.username = bot_informations.username
        console.log('Server has initialized bot nickname. Nick: '+bot_informations.username)
    })
    bot.start((ctx) => {
        start(ctx)
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
        //Markup.keyboard(buttons, false, true)
        //ctx.reply('Yay!')  
        return ctx.reply('Yay!', Extra.markup(
            Markup.removeKeyboard()
        ))
        //ctx.reply(':)', Extra.markup((m) => m.removeKeyboard()))             
        //ctx.deleteMessage(ctx.update.message.message_id, ctx.update.message.chat.id)
    })
    bot.action('plain', (ctx) => {
    })
    bot.action('italic', (ctx) => {
    })
    /*
    bot.action(/.+/, (ctx) => {
        //console.log(ctx)
        //console.log(ctx.update.callback_query.message)
        ctx.deleteMessage(ctx.update.callback_query.message.message_id, ctx.update.callback_query.message.chat.id)
        //ctx.deleteMessage
        //console.log(ctx.message)
        return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
    })   
    */    
    bot.action('ok', (ctx) => {
        //ctx.reply('Ok - ok')
    })
    bot.command('/mod', ({ reply }) => reply('Yo'))
    bot.startPolling()
}
const start = function(ctx) {
    //console.log('start')
    ctx.reply('Welcome!')
}
const sticker = function(ctx) {
    //console.log('sticker')
    //ctx.reply('👍')
    confirmation.show(
        ctx, 
        'afsdfsdfds?',
        (val) => {
            console.log('111')
        },
        (err) => {
            console.log('222')
        }
    )
    //return renderKeyboard(ctx, 'Wich one of these you want check?', ['ok', 'cancel'])
}
const renderKeyboard = function(ctx, question, buttons) {
    return ctx.reply(question, Extra.markup(
        Markup.keyboard(buttons, false, true)
    ))    
}
