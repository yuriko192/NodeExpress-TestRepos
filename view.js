const pug= require('pug');
const Web = require("./Web");

module.exports.render = (model,template)=> {
    template = pug.compileFile(template);
    model.Web = Web;
    return template(model)
};
