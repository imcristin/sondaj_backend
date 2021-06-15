module.exports = (sequelize , Sequelize) => {
  const Poll = sequelize.define("polls",{

      created_by_userid: {
          type: Sequelize.INTEGER
      },
      name: {
          type: Sequelize.STRING
      },
      questions: {
          type: Sequelize.ARRAY(Sequelize.TEXT)
      },

      answers: {
          // type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.TEXT))
          type: Sequelize.JSON
      },

      types: {
          type: Sequelize.ARRAY(Sequelize.TEXT)
      },


  });

  return Poll;
};