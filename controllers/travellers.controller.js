// const bcrypt = require("bcrypt");
const dbConnection = require("../database/connections");
// const jwtGenerator = require("../utils/jwtGenerator");
const travellersController = {};

const UniqueTraveler = (travellers) => {
  const viajeroCedula = [];
  const viajeroUnico = [];

  travellers.map((viajero, index) => {
    const i = viajeroUnico.findIndex((ele) => {
      return ele.cedula === viajero.cedula;
    });
    if (i >= 0) {
      viajeroUnico[i].viaje.push({
        cod: viajero.cod_viaje,
        origen: viajero.origen,
        destino: viajero.destino,
        precio: viajero.precio,
      });
      viajeroCedula[viajero.cedula] += 1;
    } else {
      viajeroCedula[viajero.cedula] = 1;
      const newViaje =
        viajero.cod_viaje === null
          ? []
          : [
              {
                cod: viajero.cod_viaje,
                origen: viajero.origen,
                destino: viajero.destino,
                precio: viajero.precio,
              },
            ];

      viajeroUnico.push({
        cedula: viajero.cedula,
        nombre: viajero.nombre,
        telefono: viajero.telefono,
        fecha_nacimiento: viajero.fecha_nacimiento,
        viaje: newViaje,
      });
    }
  });
  return viajeroUnico;
};

// Get all travellers in database
travellersController.getAllTravellers = async (req, res) => {
  try {
    dbConnection.query(
      "SELECT a.cedula, a.nombre, a.fecha_nacimiento, a.telefono, c.cod_viaje, c.origen, c.destino, c.precio FROM viajeros AS a LEFT JOIN tickets AS b ON b.viajero_id = a.id LEFT JOIN viajes AS c ON b.viaje_id = c.id",
      async (err, result) => {
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
            msg: "No hay viajeros",
          });
        }

        const viajeroUnico = UniqueTraveler(result);

        res.status(200).json({
          status: 200,
          success: true,
          data: viajeroUnico,
          count: viajeroUnico.length,
          message: "ok",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en travellersController",
    });
  }
};

// Get traveler by Id (cedula)
travellersController.byId = async (req, res) => {
  try {
    dbConnection.query(
      "SELECT a.cedula, a.nombre, a.fecha_nacimiento, a.telefono, c.cod_viaje, c.origen, c.destino, c.precio FROM viajeros AS a LEFT JOIN tickets AS b ON b.viajero_id = a.id LEFT JOIN viajes AS c ON b.viaje_id = c.id WHERE a.cedula = ?",
      [req.params.cedula],

      async (err, result) => {
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
            msg: "No hay viajeros",
          });
        }

        const viajeroUnico = UniqueTraveler(result);

        res.status(200).json({
          status: 200,
          success: true,
          data: viajeroUnico,
          count: viajeroUnico.length,
          message: "ok",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en travellersController",
    });
  }
};

travellersController.create = async (req, res) => {
  try {
    const { viajero, viajes } = req.body;
    const { cedula, nombre, fecha_nacimiento, telefono } = viajero;
    let insertedTravelerId;
    let values = [];

    dbConnection.query(
      "INSERT INTO viajeros(cedula, nombre, fecha_nacimiento, telefono) VALUES (?,?,?,?)",
      [cedula, nombre, fecha_nacimiento, telefono],

      async (err, result) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Error =" + err,
          });
        } else {
          insertedTravelerId = result.insertId;
          viajes.forEach((viaje) => {
            values.push([insertedTravelerId, viaje.id]);
          });
          dbConnection.query(
            "INSERT INTO tickets (viajero_id, viaje_id) VALUES ?",
            [values],
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
                id: insertedTravelerId,
                success: true,
                message: "ok",
              });
            }
          );

          console.log("en el paso 5");
        }
      }
    );
  } catch (error) {
    console.log("en el paso 6");
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error en travellersController",
    });
  }
};

module.exports = travellersController;
