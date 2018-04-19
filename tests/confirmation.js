/* eslint-env node, mocha */

const confirmation = require('../components/confirmation')
var telegram = require('../telegram.js')

var assert = require('assert')
describe('confirnation', function() {
    before(() => {
    })
    after(() => {
    })
    describe('show()', function() {
        it('should return -1 when the value is not present', function() {
            confirmation.show(
                undefined, 
                'afsdfsdfds?',
                (val) => {
                    console.log('111')
                },
                (err) => {
                    console.log('222')
                }
            )
            assert.equal([1,2,3].indexOf(4), -1)
        })
    })
})