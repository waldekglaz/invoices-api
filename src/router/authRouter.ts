import express from "express";

const router = express.Router();

router.put("/login", (req, res) => {
  res.send("Hello, from new repo");
});

export default router;
