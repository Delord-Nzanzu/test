const express = require("express");
const bodyparse = require("body-parser");
var routers = require("./Router");

const app = express();
const port = process.env.port || 3000;

app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());

app.use("/api", routers.user);
app.use("/api", routers.auth);
app.use("/api", routers.cour);
app.get("/", (req, res) => res.send("HelloWold"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
