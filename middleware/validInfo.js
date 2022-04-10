const dbConnection = require("../database/connections");

module.exports = (req, res, next) => {
  const { identification, user_name, email, password } = req.body;

  function validIdentification(userIdentification) {
    return /^[V|E|J|P][0-9]{3,9}$/.test(userIdentification);
  }

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  function validPassword(userPassword) {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      userPassword
    );
  }

  if (req.path === "/register") {
    if (![identification, user_name, email, password].every(Boolean)) {
      return res.status(401).json({
        status: 401,
        success: false,
        msg: "Error --> Faltan datos",
      });
    }

    if (!validIdentification(identification.toUpperCase())) {
      return res.status(401).json({
        status: 401,
        success: false,
        msg: "Error --> Identificación invalida",
      });
    }

    if (!validEmail(email.toLowerCase())) {
      return res.status(401).json({
        status: 401,
        success: false,
        msg: "Error --> Email invalido",
      });
    }

    if (!validPassword(password)) {
      return res.status(401).json({
        status: 401,
        success: false,
        msg: "Error --> Clave invalida",
      });
    }

    dbConnection.query(
      "SELECT * FROM usuarios WHERE identification = ? LIMIT 1",
      [identification],
      async (err, result) => {
        const a = await result.length;
        if (a > 0) {
          return res.status(401).json({
            status: 401,
            success: false,
            msg: "Joder --> Usuario ya existe",
          });
        }
        next();
      }
    );
  } else {
    if (req.path === "/login") {
      if (![identification, password].every(Boolean)) {
        return res.status(401).json({
          status: 401,
          success: false,
          msg: "Error --> Faltan datos",
        });
      }
      if (!validIdentification(identification.toUpperCase())) {
        return res.status(401).json({
          status: 401,
          success: false,
          msg: "Error --> Identificación invalida",
        });
      }
    }
    next();
  }
};
