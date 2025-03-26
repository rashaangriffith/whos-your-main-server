import express from "express";
import prisma from "../db/prisma.ts";

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  const { userId, gameCharacterId } = req.body;

  if (!userId && !gameCharacterId) {
    res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const character = await prisma.userGameCharacter.create({
      data: {
        userId,
        gameCharacterId,
      },
    });
    res.send(character);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get(
  "/user/:userId",
  async (req: express.Request, res: express.Response) => {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).send({ message: "Missing required fields" });
    }

    try {
      const characters = await prisma.userGameCharacter.findMany({
        where: {
          userId: parseInt(userId),
        },
        include: {
          gameCharacter: {
            include: {
              character: true,
            },
          },
        },
      });
      res.send(characters);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

export default router;
