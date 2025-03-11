const express = require("express");
const cors = require("cors");

const indexRoute = require("./routes/index");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/", indexRoute);
app.use("/users", require("./routes/users"));
app.use("/graphql", require("./routes/graphql"));

app.listen(port, (error: any) => {
  if (error) {
    return console.error(error);
  }
  console.log(`Server started at http://localhost:${port}`);
});
