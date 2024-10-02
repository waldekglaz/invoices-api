import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getAllClients = async (req: Request, res: Response) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClient = async (req: Request, res: Response) => {
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
};

export const createClient = async (req: Request, res: Response) => {
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
};

export const updateClientData = async (req: Request, res: Response) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.client.delete({
      where: { id: id },
    });
    res.json({ message: "Client deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
