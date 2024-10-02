import express from "express";
import userRouter from "./router/userRouter";
import invoiceRouter from "./router/invoiceRouter";
import clientRouter from "./router/clientRouter";
import authRouter from "./router/authRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, from new repo");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/client", clientRouter);
app.use("/invoice", invoiceRouter);

app.listen(3000, () => {
  console.log("Server ready at localhost:3000");
});
