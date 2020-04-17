const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();

// Using body-parser for form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connecting Router with server
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assert if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Bring mongoURI for connecting to mongodb
const db = config.get("mongoURI");

// Connecting to mongoose data base
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongodb connected..."))
  .catch(() => console.log("Mongodb not connected"));

app.get("/", (req, res) => res.json({ success: "very very true" }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
