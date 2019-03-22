import * as ResponseController from "./controllers/responseController";
import * as Utils from "./utils";
import PluginInterface from "./plugins/PluginInterface";

import express from "express";

const plugins: PluginInterface[] = Utils.loadPlugins();

const app: express.Application = express();
app.use(express.json());

app.get("/process", (req, res) => {
  if (req.body.input === undefined || typeof req.body.input !== "string") {
    res.status(400).send("Bad Request");
    return;
  }
  const input: string = req.body.input;
  const response = ResponseController.getResponse(input, plugins);
  res.status(200).json(response);
});

app.listen(3010);
