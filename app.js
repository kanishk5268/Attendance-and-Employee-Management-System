const express = require('express');
const cors = require('cors');
const adminRoute = require('./routes/admin.route');

//App
const app = express();

// Middlewares
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(
    express.json({
      limit: "3mb",
    })
  );
  app.use(
    express.urlencoded({
      limit: "3mb",
      extended: true,
    })
  );
  app.use(express.static("public"));

//Routes
app.use("/api/v1/admin",adminRoute)

  module.exports = app;