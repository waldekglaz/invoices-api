import express from "express";

const router = express.Router();
// get All invoices for authenticated user
router.get("/", (req, res) => {
  res.send("Hello, invoiceRouter");
});

// get invoice by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send("Hello, invoiceRouter" + " " + id);
});

// create invoice
router.post("/", (req, res) => {
  const { username, password } = req.body;
  res.send("Hello, invoiceRouter" + " " + username + " " + password);
});

// update invoice
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  res.send("Hello, invoiceRouter" + " " + id + " " + username + " " + password);
});

// delete invoice
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send("Hello, invoiceRouter" + " " + id);
});

export default router;
