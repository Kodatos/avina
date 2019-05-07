import * as ResponseController from "./controllers/responseController";
import * as Utils from "./utils";

import express = require("express");

const app: express.Application = express();
app.use(express.json());

async function start() {
  const plugins = await Utils.loadPlugins();
  console.log(plugins);
  app.get("/process", (req, res) => {
    if (req.body.input === undefined || typeof req.body.input !== "string") {
      res.status(400).send("Bad Request");
      return;
    }
    const input: string = req.body.input;
    ResponseController.getResponse(input, plugins).then(response => {
      res.status(200).json(response);
    });
  });

  app.listen(3010);
}

start();
