var telegram = require('../telegram.js')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const close = (ctx) => {
    if (typeof ctx !== 'undefined') {
        ctx.deleteMessage(ctx.update.callback_query.message.message_id, ctx.update.callback_query.message.chat.id)
    }
}
const showCallbackMessage = (ctx, text) => {
    if (typeof ctx !== 'undefined') {
        ctx.answerCbQuery(text)
    }
}
const runCallback = (callBack, result) => {
    if (typeof callBack === 'function') callBack(result)
}
exports.show = (ctx, question, callBack, errCallBack) => {
    telegram.bot().action('confirmation-component-ok', (ctx) => {
        close(ctx)
        runCallback(callBack, true)
        //showCallbackMessage(ctx, `Oh, ${ctx.match[0]}! Great choice`)
    })   
    telegram.bot().action('confirmation-component-cancel', (ctx) => {
        close(ctx)
        runCallback(errCallBack, false)
        //showCallbackMessage(ctx, `Oh, ${ctx.match[0]}! Great choice`)
    })  
    let timeout = 1
    if (process.env.NODE_ENV) {
        timeout = 10000 
    }
    setTimeout(
        function() {
            close(ctx)
            runCallback(errCallBack, false)
        },
        timeout
    )
    if (typeof ctx !== 'undefined') {
        ctx.reply(question, Extra.markup(
            Markup.inlineKeyboard([
                Markup.callbackButton('Ok', 'confirmation-component-ok'),
                Markup.callbackButton('Cancel', 'confirmation-component-cancel')
            ])       
        ))        
    }
}

