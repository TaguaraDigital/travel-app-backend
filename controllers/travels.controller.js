const dbConnection = require("../database/connections");

const travelsController = {};

// Get all travels in database
travelsController.getAll = async (req, res) => {
  try {
    dbConnection.query("SELECT *FROM viajes", async (err, result) => {
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
          msg: "No hay viajes",
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

// Insert a new travels in database
travelsController.create = async (req, res) => {
  const { codigo, nro_plazas, destino, origen, precio } = req.body;

  try {
    dbConnection.query(
      "INSERT INTO viajes (cod_viaje, nro_plazas, destino, origen, precio) VALUES (?, ?, ?, ?,?)",
      [codigo, nro_plazas, destino, origen, precio],
      async (err, result) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Error =" + err,
          });
        }

        res.status(200).json({
          status: 200,
          success: true,
          count: 1,
          data: {
            id: result.insertId,
            codigo,
            nro_plazas,
            destino,
            origen,
            precio,
          },
          message: "ok",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en travelsController",
    });
  }
};

// Update travels in database
travelsController.update = async (req, res) => {
  const { id, codigo, nro_plazas, destino, origen, precio } = req.body;

  try {
    dbConnection.query(
      "UPDATE viajes SET cod_viaje=?, nro_plazas=?, destino=?, origen=?, precio=? WHERE id=?",
      [codigo, nro_plazas, destino, origen, precio, id],
      async (err, result) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Error =" + err,
          });
        }

        res.status(200).json({
          status: 200,
          success: true,
          message: "ok",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en travelsController",
    });
  }
};

// delete travels in database
travelsController.delete = async (req, res) => {
  try {
    dbConnection.query(
      "DELETE FROM viajes WHERE id=?",
      [req.params.id],
      async (err, result) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Error =" + err,
          });
        }

        res.status(200).json({
          status: 200,
          success: true,
          message: "ok",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en travelsController",
    });
  }
};

module.exports = travelsController;
