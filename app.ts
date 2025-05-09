// Load environment variables
import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import indexRoute from "./routes/index.ts";
import usersRoute from "./routes/users.ts";
import gamesRoute from "./routes/games.ts";
import graphqlRoute from "./routes/graphql.ts";
import userGameCharactersRoute from "./routes/user-gamecharacters.ts";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/", indexRoute);
app.use("/users", usersRoute);
app.use("/games", gamesRoute);
app.use("/user-gamecharacters", userGameCharactersRoute);
app.use("/graphql", graphqlRoute);

app.listen(port, (error: any) => {
  if (error) {
    return console.error(error);
  }
  console.log(`Server started at http://localhost:${port}`);
});
