const express = require("express");
const sql = require('mssql/msnodesqlv8');
//const mongoose = require("mongoose");
const path = require("path");
const https = require("https");
const fs = require("fs");
const passport = require("passport");

const app = express();

const keys = require("./config/keys");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require("./strategies/jwt");
require("./strategies/local");

// DB Config
// const dbConnection = keys.mongoURI;

// Connect to Mongo
/* mongoose
  .connect(dbConnection, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
*/
// Connect to SQL Server
sql.connect({
  server: '(localdb)\\MSSQLLocalDB',
  database: 'master',
  parseJSON: true,
  options: {
    encrypt: false
  }
}).then(() => {
  console.log("SQL Server Connected...")
}).catch(err => {
  console.dir(err)
})

// Use Routes
app.use("/", authRoutes);
app.use("/", apiRoutes);
app.use("/", adminRoutes);
app.use("/static", express.static(__dirname + "/static"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
  /*const httpsOptions = {
    key: fs.readFileSync("./security/cert.key"),
    cert: fs.readFileSync("./security/cert.pem")
  };

  const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log("https server running at " + port);
  });*/
}
// openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256