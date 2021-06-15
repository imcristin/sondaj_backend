const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Poll = db.poll;



exports.createPoll = (req,res) =>{
    console.log("123123123123132123123")
    let token = req.headers["x-access-token"];
    let user_id;
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        user_id=decoded.id;
    });

    console.log(JSON.stringify(req.body))
    Poll.create({
        // poll_json: req.body,
        name: req.body["name"],
        questions: req.body["questions"],
        answers: req.body["answers"],
        types: req.body["types"],
        created_by_userid: user_id,
    }).then(Poll=>{
        res.status(200).send("Poll was created successfully!");
    }).catch(err=>{
            res.status(500).send({message:err.message});
        })
}

exports.getallname = (req,res) => {
    Poll.findAll({
        attributes: ['name']
    }).then(poll_json => {
        res.status(200).send(poll_json)
        console.log(poll_json[0])
    })
}

exports.getcount = (req,res) => {
    Poll.count().then(c =>{
        res.status(200).send(JSON.stringify(c));
    })
}

exports.getpoll = (req,res) => {
    Poll.findOne(
        {
            where : {id: req.params.pollid},
            attributes : ['name','questions','answers','types']
        })

        .then(poll=>{
        res.status(200).send(JSON.stringify(poll))
    })
}

exports.sendaresult = (req,res) =>{
    Response.create({
        // poll_json: req.body,
        name: req.body["name"],
        questions: req.body["questions"],
        answers: req.body["answers"],
        types: req.body["types"],
        created_by_userid: user_id,
    }).then(Poll=>{
        res.status(200).send("Poll was created successfully!");
    }).catch(err=>{
        res.status(500).send({message:err.message});
    })
}

exports.test = (req,res) => {
    console.log(req.body)
    res.status(200).send("TEEEEEEST")
}