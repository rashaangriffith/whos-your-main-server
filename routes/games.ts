import express from "express";
import prisma from "../db/prisma.ts";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        characters: true,
      },
    });
    res.send(games);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  try {
    const game = await prisma.game.findUnique({
      where: {
        id,
      },
      include: {
        characters: true,
      },
    });
    res.send(game);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
