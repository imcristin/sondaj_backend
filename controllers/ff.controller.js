const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Poll = db.poll;



exports.fftokenExtract = (req,res) => {

    let token = req.headers["x-access-token"];
    let user_it;


    jwt.verify(token, config.secret, (err,decoded)=>{
        if(err){
            return
        }
    })

}