require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3500;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES TRAVELLERS
app.use("/travellers", require("./routes/travellers"));

// ROUTES TRAVELS
app.use("/travels", require("./routes/travels"));

app.listen(PORT, () => {
  console.log(
    `backend server is running in port ${PORT} and DB is ${process.env.DBSource}`
  );
});
