const express = require("express");
const sql = require('mssql/msnodesqlv8');
const path = require("path");
const https = require("https");
const fs = require("fs");
const passport = require("passport");

const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

const keys = require("./config/keys");
const authRoutes = require("./routes/auth");
const customersRoutes = require("./routes/customers");
const fiscalyearsRoutes = require("./routes/fiscalyears");
const adminRoutes = require("./routes/admin");
const industries = require("./routes/industries");
const timezones = require("./routes/timezones");
const countries = require("./routes/countries");
const states = require("./routes/states");
const oms = require("./routes/oms");
const financialRoutes = require("./routes/financial");
const hrRoutes = require("./routes/hr");
const employeegroupsRoutes = require("./routes/employeegroups");
const notes = require("./routes/notes");

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allowCrossDomain);

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
  server: 'SCALYBOI\\CLIENTDATABASE',
  database: 'cdb',
  parseJSON: true,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    encrypt: false
  }
}).then(() => {
  console.log("SQL Server Connected...")
}).catch(err => {
  console.dir(err)
})

// Use Routes
app.use("/", authRoutes);
app.use("/", customersRoutes);
app.use("/", fiscalyearsRoutes);
app.use("/", adminRoutes);
app.use("/", industries);
app.use("/", timezones);
app.use("/", countries);
app.use("/", states);
app.use("/", financialRoutes);
app.use("/", hrRoutes);
app.use("/", employeegroupsRoutes);
app.use("/", oms);
app.use("/", notes);

// app.use("/static", express.static(__dirname + "/static"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  /* Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
 */
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