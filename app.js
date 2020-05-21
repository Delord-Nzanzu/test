const express = require("express");
const bodyparse = require("body-parser");
var routers = require("./Router");

const app = express();
const port = process.env.port || 3000;

app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());

app.use("/users", routers.user);
app.use("/auth", routers.auth);
app.use("/courses", routers.cour);
app.use("/subscriptions", routers.abonne);
app.get("/", (req, res) => res.send("HelloWold"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
