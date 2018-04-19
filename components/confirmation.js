var telegram = require('../telegram.js')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const close = (ctx) => {
    ctx.deleteMessage(ctx.update.callback_query.message.message_id, ctx.update.callback_query.message.chat.id)
}
const showCallbackMessage = (ctx, text) => {
    ctx.answerCbQuery(text)
}
exports.show = (ctx, question, callBack, errCallBack) => {
    telegram.bot().action('confirmation-component-ok', (ctx) => {
        close(ctx)
        if (typeof callBack === 'function') callBack(true)
        //showCallbackMessage(ctx, `Oh, ${ctx.match[0]}! Great choice`)
    })   
    telegram.bot().action('confirmation-component-cancel', (ctx) => {
        close(ctx)
        if (typeof errCallBack === 'function') errCallBack(false)
        //showCallbackMessage(ctx, `Oh, ${ctx.match[0]}! Great choice`)
    })      
    if (typeof ctx !== 'undefined') {
        ctx.reply(question, Extra.markup(
            Markup.inlineKeyboard([
                Markup.callbackButton('Ok', 'confirmation-component-ok'),
                Markup.callbackButton('Cancel', 'confirmation-component-cancel')
            ])       
        ))        
    }
}

