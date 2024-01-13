const express = require("express");
const app = express();
const getRoutes = require("./routes/getRoutes");
require("dotenv").config();
const checkTask = require("./helper/createTask");

app.use(express.json());
app.use("/uploads", express.static("uploads")); // Set up a route for file uploads

app.use("/file", getRoutes);

app.get("/health-check", function (req, res) {
  res.send("Success");
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

app.listen(process.env.PORT || 3000, async function (error) {
  if (error) throw error;
  await checkTask();
  console.log("Server created Successfully on PORT 8080");
});
