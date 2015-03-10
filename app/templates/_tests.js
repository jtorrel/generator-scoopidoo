'use strict';

var chai = require('chai');
chai.use(require('chai-fs'));
var expect = require('chai').expect

/** Tests */
describe('configuration', function() {
    it('should have these file in the directories', function(done) {
        expect("app/config.js").to.be.a.path("Configuration file is missing");
        expect("package.json").to.be.a.path("Package file is missing");
        expect("test").to.be.a.directory("Mocha configuration file is missing");
        expect("test/mocha.opts").to.be.a.path("Mocha configuration file is missing");
        done();
    });
});