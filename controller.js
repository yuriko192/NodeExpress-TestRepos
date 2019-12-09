const feather = require("feather-icons");
const crypto = require("crypto");

const view = require("./view");
const Web = require("./Web");
const menudao = require("./DataObject/MenuDao");
const userdao = require("./DataObject/AccDao");

const controller = {};

function hashpassword(password){
    let sha = crypto.createHash("sha1");
    sha.update(password);
    return sha.digest('base64');
}

controller.serveIndexPage = async (req, res) => {
    model = {};
    model.user = req.session.user;
    model.menu = await menudao.getSide();
    model.curr = (await menudao.getMenuWithID(0))[0];
    for (x of model.menu){
        if(x.image_type==0){
            x.image=feather.icons[x.image].toSvg();
        }
    }
    console.log(model.user);
    model.arrow = feather.icons["arrow-up"].toSvg();
    res.send(view.render(model, Web.Template.INDEX));
};

controller.serveLoginPage = async (req, res) => {
    model = {};
    res.send(view.render(model, Web.Template.LOGIN));
};

controller.handleLogin = async (req, res) => {
    let username = req.body.username;
    let password = hashpassword(req.body.password);
    console.log(username);
    console.log(password);
    let user = await userdao.getAcc(username,password);
    if(user){
        req.session.user = user[0];
        res.redirect(Web.Path.INDEX);
    }else{
        model = {};
        model.incorrect = true;
        res.send(view.render(model, Web.Template.LOGIN));
    }
};

module.exports = controller;
