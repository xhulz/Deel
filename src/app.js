const { errors } = require("celebrate");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("../docs/api-spec.json");
const routes = require("./application/routes");
const { sequelize } = require("./repository/models");

dotenv.config();

const app = express();

// Setting api docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Setting configurations
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errors());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

module.exports = app;
