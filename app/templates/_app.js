'use strict';

var config = require('./config');

// Context
var context = require('rabbit.js').createContext(config.queueSocket);
console.log(" [x] Created context %s", config.queueSocket);

context.on("ready", function() {
    var sock = context.socket("<%= rabbitType %>");
    sock.connect(config.queueName, function() {
        console.log(" [x] Connected to queue : %s", config.queueName); <%
        if ((rabbitType == "SUB") || (rabbitType == "PULL") || (rabbitType == "REP") || (rabbitType == "WORKER"))
            print("\t\tsock.on(\"data\", function(data) {\n\t\t\t// TODO\n\t\t});");
        else
            print("\t\t// TODO"); %>
    });
});