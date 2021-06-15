const { authJwt } = require("../middleware");
const pollController = require("../controllers/poll.controller");
const answerController = require("../controllers/answer.controller");

const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

module.exports = function(app) {
    app.use(function(req, res, next) {
        console.log("aiciii")

        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept");

        res.header('Access-Control-Allow-Origin', '*');
        res.header("content-type", "application/json")
        // setTimeout( function(){
        //     try{
        //         console.log("acum dam next")
        //         next()
        //     }catch(err){
        //         console.log(err.toString())
        //     }
        // },1)
        next();
    });

    app.post(
        "/api/poll/create/",
        [authJwt.verifyToken,authJwt.isModerator,jsonParser],
        pollController.createPoll
    )

    app.post(
        "/api/poll/send/:pollid/",
        [],
        answerController.sendAnswer
    )

    app.get(
        "/api/poll/getallname/",
        [authJwt.verifyToken],
        pollController.getallname
    )

    app.get(
        "/api/poll/count/",
        [authJwt.verifyToken],
        pollController.getcount
    )

    app.get(
        "/api/poll/getpoll/:pollid/",
        [authJwt.verifyToken],
        pollController.getpoll
    )

    app.get(
        "/api/poll/getanswers/:pollid/",
        [authJwt.verifyToken],
        answerController.getAnswers
    )


};
// asd