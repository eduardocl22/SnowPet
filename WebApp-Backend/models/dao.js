const promise = require('bluebird');
var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:1010@localhost:5432/Test_prueba");

class dao {
    constructor () {}
    select(sql, params = []) {
        return new promise((resolve, reject) => {
            db.any(sql, params).then( data => {
                resolve(data);
            }).catch(function(error){
                console.log('Error running sql ' + sql);
                console.log(error);
                reject(error);
            });    
        });
    }
    execute_one(sql, params = []) {
        return new promise((resolve, reject) => {
            db.one(sql, params).then( data => {
                resolve(data);
            }).catch(function(error){
                console.log('Error running sql ' + sql);
                console.log(error);
                reject(error);
            });            
        });
    }
    execute_none(sql, params = []) {
        return new promise((resolve, reject) => {
            db.none(sql, params).then( data => {
                resolve(data);
            }).catch(function(error){
                console.log('Error running sql ' + sql);
                console.log(error);
                reject(error);
            });            
        });
    }
    master_detail(sqlm, sqld, parm = [], list_pard = []) {
        return new promise((resolve, reject) => { 
            db.tx(async t => {
                const id = await t.one(sqlm, parm, a => +a.id_noticias);
                list_pard.forEach(async pard => {
                    pard[0] = id;
                    await t.none(sqld, pard);
                });
                return id;
            }).then(data => { 
                resolve(data); 
            }).catch(function (err) {
                //console.log('Error running sql ' + sql);
                console.log(err);
                reject(err);
            });
        });
    }
}

module.exports = dao;