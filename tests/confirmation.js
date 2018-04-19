/* eslint-env node, mocha */

const confirmation = require('../components/confirmation')

var assert = require('assert')
describe('confirmation', function() {
    before(() => {
    })
    after(() => {
    })
    describe('show()', function() {
        it('should close on timeout', function(done) {
            confirmation.show(
                undefined, 
                'afsdfsdfds?',
                (val) => {
                    assert.equal(val, true)
                    done()
                },
                (err) => {
                    assert.equal(err, false)
                    done()
                }
            )
        })
    })
})