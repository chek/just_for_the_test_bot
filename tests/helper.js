/* eslint-env node, mocha */
let telegram = require('../telegram.js')
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