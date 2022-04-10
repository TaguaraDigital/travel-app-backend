const router = require("express").Router();

const travelsController = require("../controllers/travels.controller");

// fetch all travels
router.get("/", travelsController.getAll);

// Insert a new travel
router.post("/", travelsController.create);

// update a travel
router.put("/", travelsController.update);

// Delete a travel
router.delete("/:id", travelsController.delete);

module.exports = router;
