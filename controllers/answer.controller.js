const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Answer = db.answer;

exports.sendAnswer = (req,res) =>{
    Answer.create({
        poll_answer: req.body,
        poll_id : req.params["pollid"]
    }).then(Answer => {
        res.status(200).send("Anwser was submited successfully!")
    })
}

exports.getAnswers = (req,res) =>{
    Answer.findAll({
        attributes: ['poll_answer'],
        where : {poll_id: req.params.pollid}
    }).then(poll_json => {
        res.status(200).send(poll_json)
        console.log(poll_json[0])
    })
}