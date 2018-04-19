/* eslint-env node, mocha */

const confirmation = require('../components/confirmation')

var assert = require('assert')
describe('confirmation', function() {
    before(() => {
    })
    after(() => {
    })
    describe('show()', function() {
        it('should just dont fail', function() {
            confirmation.show(
                undefined, 
                'afsdfsdfds?',
                (val) => {
                    assert.equal(val, true)
                },
                (err) => {
                    assert.equal(err, false)
                }
            )
        })
    })
})