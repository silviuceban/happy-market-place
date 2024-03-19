import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { authConfig } from "./config/auth.js";
import { pool } from "./database/pool.js";
import { getProductById, getProducts, jsonParser, postOrder, } from "./controllers/controllers.js";
import dotenv from "dotenv";
dotenv.config();
var app = express();
var port = process.env.PORT || 5000;
var jwtCheck = auth(authConfig);
// enforce on all endpoints
// app.use(jwtCheck)
app.get("/data", function (req, res) {
    res.send("Secured Resource result asdajgsdkaj");
});
app.get("/products", getProducts);
app.get("/products/:id", jwtCheck, getProductById);
app.post("/order", jsonParser, postOrder);
app.listen(port);
console.log("Running on port ", port);
process.on("exit", function () {
    // Close the connection pool gracefully
    pool.end();
});
// Handle other signals like SIGINT and SIGTERM for graceful shutdown
process.on("SIGINT", function () {
    pool.end(function () {
        process.exit(0);
    });
});
process.on("SIGTERM", function () {
    pool.end(function () {
        process.exit(0);
    });
});
//# sourceMappingURL=app.js.map