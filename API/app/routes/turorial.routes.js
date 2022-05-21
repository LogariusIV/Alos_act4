module.exports = app => {
  const match_stats = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Match stat
  router.post("/", match_stats.create);

  // Retrieve all Match stats
  router.get("/", match_stats.findAll);

  // Retrieve all published Match stats
  router.get("/published", match_stats.findAllPublished);

  // Retrieve a single Match stat with id
  router.get("/:id", match_stats.findOne);

  // Update Match stat with id
  router.put("/:id", match_stats.update);

  // Delete Match stat with id
  router.delete("/:id", match_stats.delete);

  // Delete all Match stats
  router.delete("/", match_stats.deleteAll);

  app.use('/api/matchstats', router);
};
