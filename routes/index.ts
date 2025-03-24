import express from "express";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("Who's your main homey?");
});

export default router;
