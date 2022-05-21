const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Match stat
exports.create = (req, res) => {
  // Validate request
  if (!req.body.matchday) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Match stat
  const tutorial = {
    matchday: req.body.matchday,
    home: req.body.home,
    away: req.body.home,
    homescore: req.body.home,
    awayscore: req.body.home,
    published: req.body.published ? req.body.published : false
  };

  // Save Match stat in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Match stat."
      });
    });
};

// Retrieve all Match stats from the database.
exports.findAll = (req, res) => {
  const matchday = req.query.matchday;
  var condition = matchday ? { matchday: { [Op.like]: `%${matchday}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Match stats."
      });
    });
};

// Find a single Match stat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Match stat with id=" + id
      });
    });
};

// Update a Match stat by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Match stat was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Match stat with id=${id}. Maybe Match stat was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Match stat with id=" + id
      });
    });
};

// Delete a Match stat with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Match stat was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Match stat with id=${id}. Maybe Match stat was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Match stat with id=" + id
      });
    });
};

// Delete all Match stats from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Match stats were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Match stats."
      });
    });
};

// find all published Matchs
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Match stats."
      });
    });
};
