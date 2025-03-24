// import { Request, Response, Router } from "express";
import express from "express";
import postgres from "../db/postgres.ts";
import mongodb from "../db/mongodb.ts";
import { ObjectId } from "mongodb";
import prisma from "../db/prisma.ts";

const router = express.Router();

// mongodb
// const USERS_COLLECTION = "users";

// router.get("/", async (req: express.Request, res: express.Response) => {
//   try {
//     let collection = await mongodb?.collection(USERS_COLLECTION);
//     let results = await collection.find({}).limit(10).toArray();
//     res.send(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

// router.get("/:id", async (req: express.Request, res: express.Response) => {
//   const id = new ObjectId(req.params.id);

//   try {
//     let collection = await mongodb?.collection(USERS_COLLECTION);
//     let results = await collection.findOne({ _id: id });
//     res.send(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

// router.post("/", async (req: any, res: any) => {
//   const data = req.body;

//   if (!data.name || !data.email) {
//     return res
//       .status(400)
//       .send({ message: "error: name and email are required" });
//   }

//   const collection = await mongodb?.collection(USERS_COLLECTION);
//   const userByEmail = await collection.findOne({ email: data.email });
//   if (userByEmail) {
//     return res.status(400).send({ message: "error: email already exists" });
//   }

//   const result = await collection.insertOne(data);

//   res.send({ message: "post users data:", result }).status(204);
// });

// router.patch("/:id", async (req: any, res: any) => {
//   const id = new ObjectId(req.params.id);
//   const data = req.body;

//   const collection = await mongodb?.collection(USERS_COLLECTION);
//   const result = await collection.updateOne({ _id: id }, { $set: data });

//   res.send({ message: "patch users data:", result }).status(204);
// });

// postgresql

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/", (req: any, res: any) => {
  const data = req.body;

  if (!data.email) {
    return res.status(400).send({ message: "error: email is required" });
  }

  try {
    const user = prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    res.send({ message: "user created successfully:", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
