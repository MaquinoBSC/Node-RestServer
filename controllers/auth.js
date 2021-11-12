const { request, response } = require("express");

const login= (reqe= request, res= response)=> {


    res.json({
        msg: "Login OK",
    })
}


module.exports= {
    login,
}