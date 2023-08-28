import express from "express";
import config from "@proxtx/config";

const app = express();

let cache = {};

app.get("*", async (req, res) => {
  if (!cache[req.url])
    cache[req.url] = await (await fetch(config.url + req.url)).arrayBuffer();

  res.send(Buffer.from(cache[req.url], "base64"));
});

app.listen(config.port);
