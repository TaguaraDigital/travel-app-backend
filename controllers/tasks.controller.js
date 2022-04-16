const connect = require("../database/con2");
const dbConnection = require("../database/connections");

const tasksController = {};
/*
// Get all travels in database
tasksController.getAll = async (req, res) => {
  try {
    dbConnection.query("SELECT * FROM tasks", async (err, result) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Error =" + err,
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          status: 400,
          success: false,
          msg: "No hay tareas",
        });
      }

      res.status(200).json({
        status: 200,
        success: true,
        data: result,
        count: result.length,
        message: "ok",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en travelsController",
    });
  }
};

*/

// Get all tasks in database
tasksController.getAll = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM tasks");

    if (rows.length === 0) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "No hay tareas",
      });
    }
    console.log("probando");
    res.status(200).json({
      status: 200,
      success: true,
      message: "ok",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en tasks Controller",
    });
  }
};

// Get tasks by Id
tasksController.getById = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "No hay tareas",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "ok",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en tasks Controller",
    });
  }
};

// Insert a new tasks in database
tasksController.create = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const db = await connect();
    const [rows] = await db.query(
      "INSERT INTO tasks (title, description, status) VALUES (?,?,?)",
      [title, description, status]
    );
    res.status(200).json({
      status: 200,
      success: true,
      count: rows.affectedRows,
      data: {
        ...req.body,
        id: rows.insertId,
      },
      message: "ok",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error,
      message: "Server Error en tasks Controller",
    });
  }
};

// Update travels in database
tasksController.update = async (req, res) => {
  const { id, title, description } = req.body;
  try {
    const db = await connect();
    const [rows] = await db.query(
      "UPDATE tasks SET title=?, description=? WHERE id=?",
      [title, description, id]
    );

    res.status(200).json({
      status: 200,
      success: true,
      data: req.body,
      count: rows.affectedRows,
      message: "ok",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      error,
      message: "Server Error en travelsController",
    });
  }
};

// delete travels in database
tasksController.delete = async (req, res) => {
  try {
    const db = await connect();
    const [rows] = await db.query("DELETE FROM tasks WHERE id=?", [
      req.params.id,
    ]);

    console.log(rows);
    res.status(200).json({
      status: 200,
      success: true,
      message: "ok",
      count: rows.affectedRows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en tasks Controller",
    });
  }
};

module.exports = tasksController;
