'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var slug = require('slug');

var ScoopidooGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        var prompts = [{
            name: 'appName',
            message: 'What is the name of the service ?',
            default: process.cwd().split(path.sep).pop()
        }, {
            name: 'appAuthor',
            message: 'What is your name ?'
        }, {
            type: 'confirm',
            name: 'addAngular',
            message: 'Would you like to create an Angular directory ?',
            default: true
        }];

        this.prompt(prompts, function(props) {
            this.appName = slug(props.appName.toLowerCase());
            this.appAuthor = props.appAuthor;
            this.addAngular = props.addAngular;

            done();
        }.bind(this));
    },

    scaffoldFolders: function() {
        this.mkdir("app");
        this.mkdir("test");
    },

    copyMainFiles: function() {
        this.writeFileFromString("'use strict';\n\nvar config = require('./config');", "app/" + this.appName + ".js");
        this.writeFileFromString(this.read("_mocha.opts"), "test/mocha.opts");

        var config = this._.template(this.read("_tests.js"));
        this.writeFileFromString(config(this), "test/tests.js");
        var config = this._.template(this.read("_config.js"));
        this.writeFileFromString(config(this), "app/config.js");
        var pkg = this._.template(this.read("_package.json"));
        this.writeFileFromString(pkg(this), "package.json");
    },

    generateAngularDirectory: function() {
        if (this.addAngular) {
            console.log("Todo : create angular directory !");
        }
    }
});

module.exports = ScoopidooGenerator;