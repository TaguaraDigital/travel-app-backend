const router = require("express").Router();
const travellersController = require("../controllers/travellers.controller");
const validInfo = require("../middleware/validInfo");

// Get all de traveller from database (Join Traveleers Travels)
router.get("/", travellersController.getAllTravellers);

// Get traveller by id
router.get("/:cedula", travellersController.byId);

// Create a traveller
router.post("/", travellersController.create);

// Update a traveller
// router.put("/", travellersController.update);

// Delete a traveller
router.delete("/", travellersController.delete);

module.exports = router;
