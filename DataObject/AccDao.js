const db = require("./MainDao");
let out = {};

out.getAcc = (username,password)=>{
    return new Promise((resolve,reject)=>{
        let sql = "select * from account where username = ? and password= ?";
        db.query(sql,[username,password],(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    });
}

module.exports = out;
