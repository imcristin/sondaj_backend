const { authJwt } = require("../middleware");
const anwserController = require("../controllers/answer.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/poll/:pollid/submit",
        [authJwt.verifyToken],//verify poll json
        anwserController.sendAnswer

    )
}