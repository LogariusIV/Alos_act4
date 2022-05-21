module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    
    matchday:{
      type: Sequelize.STRING
    },
    home:{
      type: Sequelize.STRING
    },
    away:{
      type: Sequelize.STRING
    },
    homescore:{
      type: Sequelize.STRING
    },
    awayscore:{
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial;
};
