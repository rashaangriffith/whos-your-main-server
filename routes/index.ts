import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Who's your main homey?");
});

module.exports = router;
