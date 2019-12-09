const express = require("express");
const Web = require("./Web");
const controller = require("./controller");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    //gw juga gatau ini bwt apa jadi why not :v
    keys: ["I am the Bone of my Sword\n",
    "Steel is my Body and Fire is my Blood.\n",
    "I have created over a Thousand Blades,\n",
    "Unknown to Death,\n",
    "Nor known to Life.\n",
    "Have withstood Pain to create many Weapons\n",
    "Yet those Hands will never hold Anything.\n",
    "So, as I Pray--\n",
    "Unlimited Blade Works"],
    maxAge: 10 * 60 * 1000 // 10 Minutes
}));

app.use(morgan("dev"));
app.use(express.static(__dirname+'/public'));

app.use(function(req, res, next) {
    if (req.session.user === undefined && req.body.username == null) {
        return controller.serveLoginPage(req,res);
    }
    else {
        next();
    }
});

app.get(Web.Path.INDEX, controller.serveIndexPage);

app.get(Web.Path.LOGIN, controller.serveLoginPage);
app.post(Web.Path.LOGIN, controller.handleLogin);

app.listen(4567);
