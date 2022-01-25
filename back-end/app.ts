import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.static("build"));

app.get("/", (_req, res) => {
  res.send("hello world");
});

export default app;
