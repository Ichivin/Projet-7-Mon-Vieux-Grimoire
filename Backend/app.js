const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");
const path = require("path");

const mongoose = require("mongoose");

/* Connection BDD mongoose */
mongoose
    .connect(process.env.DBCONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // Demarrage serveur
    .then(() =>
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Enjoy !`);
        })
    )
    // Arret du serveur si connection impossible
    .catch(() => console.log("Server connection failed !"));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

//app.use(bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
