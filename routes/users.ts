import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const result = await db.query(
      `SELECT DISTINCT * FROM users WHERE id = ${userId}`
    );
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/", (req: Request, res: Response) => {
  const data = req.body;

  if (!data.name) {
    return res.status(400).send({ message: "error: name is required" });
  }

  res.send({ message: "post users data:", data });
});

module.exports = router;
