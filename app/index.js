"use strict";

var yeoman = require("yeoman-generator");
var path = require("path");
var slug = require("slug");
var exec = require('child_process').exec;

var ScoopidooGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        var prompts = [{
            name: "appName",
            message: "What is the name of the service (it will be slugify) ?",
            default: process.cwd().split(path.sep).pop()
        }, {
            name: "appAuthor",
            message: "What is your name ?",
            store: true
        }, {
            type: "list",
            choices: [{
                name: "PUB",
                value: "PUB"
            }, {
                name: "SUB",
                value: "SUB"
            }, {
                name: "PUSH",
                value: "PUSH"
            }, {
                name: "PULL",
                value: "PULL"
            }, {
                name: "REQ",
                value: "REQ"
            }, {
                name: "REP",
                value: "REP"
            }, {
                name: "WORKER",
                value: "WORKER"
            }],
            name: "rabbitType",
            message: "What kind of socket type do you want to join ?",
            default: true
        }, {
            name: "queueSocket",
            message: "What is the address of the AMPQ server ?",
            store: true,
            default: "amqp://localhost"
        }, {
            name: "queueName",
            message: "What is the name of the queue to join ?",
            store: true,
            default: "scoopi_test"
        }];

        this.prompt(prompts, function(props) {
            this.appName = slug(props.appName.toLowerCase());
            this.appAuthor = props.appAuthor;
            this.queueSocket = props.queueSocket;
            this.queueName = props.queueName;
            this.rabbitType = props.rabbitType;
            done();
        }.bind(this));
    },

    createFolders: function() {
        this.mkdir("app");
        this.mkdir("test");
    },

    copyFiles: function() {
        // Mocha config file
        this.writeFileFromString(this.read("_mocha.opts"), "test/mocha.opts");

        // App main file
        var app = this._.template(this.read("_app.js"));
        this.writeFileFromString(app(this), "app/" + this.appName + ".js");

        // Test file
        var test = this._.template(this.read("_tests.js"));
        this.writeFileFromString(test(this), "test/tests.js");

        // App config file
        var config = this._.template(this.read("_config.js"));
        this.writeFileFromString(config(this), "app/config.js");

        // Global config file
        var pkg = this._.template(this.read("_package.json"));
        this.writeFileFromString(pkg(this), "package.json");
    },

    installing: function() {
        exec("npm install", function(err) {
            if (err) {
                console.log("Error occurred. You may need administrator privileges to install the module.");
                console.log("Try to run > sudo npm install");
            }
        });
    }
});

// Export
module.exports = ScoopidooGenerator;