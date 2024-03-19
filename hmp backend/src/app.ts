import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { authConfig } from "./config/auth.js";
import { pool } from "./database/pool.js";
import {
  getProductById,
  getProducts,
  jsonParser,
  postOrder,
} from "./controllers/controllers.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

const jwtCheck = auth(authConfig);

// enforce on all endpoints
// app.use(jwtCheck)

app.get("/data", (req, res) => {
  res.send("Secured Resource result asdajgsdkaj");
});

app.get("/products", getProducts);
app.get("/products/:id", jwtCheck, getProductById);

app.post("/order", jsonParser, postOrder);

app.listen(port);

console.log("Running on port ", port);

process.on("exit", () => {
  // Close the connection pool gracefully
  pool.end();
});

// Handle other signals like SIGINT and SIGTERM for graceful shutdown
process.on("SIGINT", () => {
  pool.end(() => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  pool.end(() => {
    process.exit(0);
  });
});
