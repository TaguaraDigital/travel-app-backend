const router = require("express").Router();

const tasksController = require("../controllers/tasks.controller");

// fetch all tasks
router.get("/", tasksController.getAll);

// count totla tasks
// router.get("/:count", tasksController.count);

// fetch a particular tasks
// router.get("/:id", tasksController.byId);

// Insert a new task
router.post("/", tasksController.create);

// update a task
router.put("/", tasksController.update);

// Delete a task
router.delete("/:id", tasksController.delete);

module.exports = router;
