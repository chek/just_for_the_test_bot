var telegram = require('../telegram.js')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

exports.show = (ctx, question, callBack, errCalback) => {
    const close = (ctx) => {
        ctx.deleteMessage(ctx.update.callback_query.message.message_id, ctx.update.callback_query.message.chat.id)
        promise = null
    }
    const showCallbackMessage = (ctx, text) => {
        ctx.answerCbQuery(text)
    }
    //let promise = new Promise((resolve, reject) => {
    telegram.bot().action('confirmation-component-ok', (ctx) => {
        console.log("fulfilled: !!!")
        close(ctx)
        callBack(true)
        //resolve(true)
        //showCallbackMessage(ctx, `Oh, ${ctx.match[0]}! Great choice`)
    })   
    telegram.bot().action('confirmation-component-cancel', (ctx) => {
        console.log("reject: !!!")
        close(ctx)
        //reject(false)
        errCalback(false)
        //showCallbackMessage(ctx, `Oh, ${ctx.match[0]}! Great choice`)
    })   
    ctx.reply(question, Extra.markup(
        Markup.inlineKeyboard([
            Markup.callbackButton('Ok', 'confirmation-component-ok'),
            Markup.callbackButton('Cancel', 'confirmation-component-cancel')
        ])       
    ))    
    //})    
    //return promise
}

