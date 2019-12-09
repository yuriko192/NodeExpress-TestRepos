const db = require("./MainDao");
let out = {};

out.getSide = ()=>{
    return new Promise((resolve,reject)=>{
        let sql = "select * from table_main order by Tab_ind";
        db.query(sql,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    });
};
out.getMenuWithID = (id)=>{
    return new Promise((resolve,reject)=>{
        let sql = "select * from table_main where tab_ind = '?' order by Tab_ind";
        db.query(sql,[id],(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    });
}

module.exports = out;
