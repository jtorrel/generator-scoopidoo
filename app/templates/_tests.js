"use strict";

var chai = require("chai");
chai.use(require("chai-fs"));
var expect = require("chai").expect

/** Tests */
describe("Files and directories configuration", function() {
    it("should have these file in the directories", function(done) {
        expect("app/config.js").to.be.a.path("Configuration file is missing");
        expect("package.json").to.be.a.path("Package file is missing");
        expect("test").to.be.a.directory("Mocha configuration file is missing");
        expect("test/mocha.opts").to.be.a.path("Mocha configuration file is missing");
        done();
    });
});

var config = require("../app/config.js");
describe("App configuration", function() {
    it("should have these infos in the config file", function(done) {
       	expect(config).to.have.property("queueName");
       	expect(config).to.have.property("queueSocket");
       	expect(config).to.have.property("appName");
        done();
    });
});