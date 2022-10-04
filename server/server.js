const express = require("express");
const path = require("path");
const db = require("./config/dbConfig");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


db.once("open", () => {
    console.log("Successfully connected to MongoDB database.");
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    })
})