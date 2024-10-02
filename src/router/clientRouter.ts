import express from "express";
import {
  getAllClients,
  getClient,
  updateClientData,
  createClient,
  deleteClient,
} from "../controllers/clientController";

const router = express.Router();

router.get("/", getAllClients);
router.get("/:id", getClient);
router.post("/", createClient);
router.put("/:id", updateClientData);
router.delete("/:id", deleteClient);

export default router;
