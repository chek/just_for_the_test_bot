/* eslint-env node, mocha */
let telegram = require('../telegram.js')
//var assert = require('assert')

// globals
//global.assert = require('assert')

// setup
before(
    () => {
        telegram.init()
    }    
)
//beforeEach()

// teardown
after(
    () => {
        telegram.bot().stop()
    }    
)
//afterEach()