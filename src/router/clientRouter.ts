import express from "express";
import { PrismaClient } from "@prisma/client";
import bycrypt from "bcrypt";

const prisma = new PrismaClient();

const router = express.Router();
// get All clients
router.get("/", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const allClients = await prisma.client.findMany({
      where: {
        userId: userId,
      },
    });
    res.json(allClients);
  } catch (err) {
    console.log(err);
  }
});

// get client by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await prisma.client.findUnique({
      where: { id: id },
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// create client
router.post("/", async (req, res) => {
  const { name, email, phone, address, userId } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        address,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res.status(201).json(client);
  } catch (err) {
    console.log(err);
  }
});

// update client only for authenticated user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  try {
    const client = await prisma.client.update({
      where: { id: id },
      data: {
        name,
        email,
        phone,
        address,
      },
    });
    res.json(client);
  } catch (err) {
    console.log(err);
  }
});

// delete client
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.client.delete({
    where: { id: id },
  });
  res.json({ message: "Client deleted" });
});

export default router;
