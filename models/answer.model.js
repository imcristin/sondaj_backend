module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answers",{
        poll_answer: {
            type: Sequelize.JSON
        },
        created_by_userid:{
            type: Sequelize.INTEGER
        },
        poll_id: {
            type: Sequelize.INTEGER
        }
    });
    return Answer;
}