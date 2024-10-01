import express from "express";

const router = express.Router();
// get All users
router.get("/", (req, res) => {
  res.send("Hello, userRouter");
});

// get user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send("Hello, userRouter" + " " + id);
});

// create user
router.post("/", (req, res) => {
  const { username, password } = req.body;
  res.send("Hello, userRouter" + " " + username + " " + password);
});

// update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  res.send("Hello, userRouter" + " " + id + " " + username + " " + password);
});

// delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send("Hello, userRouter" + " " + id);
});

export default router;
