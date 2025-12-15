
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


app.post("/create-product", async (req, res) => {
  const { amount, userId } = req.body;

  if (!Number.isInteger(amount) || amount < 1 || amount > 20000) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  // 🔴 IMPORTANT:
  // You should NOT create products here dynamically.
  // This example assumes you already have products created.

  const PRODUCT_MAP = {
    1: 111111,
    5: 222222,
    10: 333333,
    50: 444444,
    100: 555555
  };

  const productId = PRODUCT_MAP[amount];
  if (!productId) {
    return res.status(400).json({ error: "Unsupported amount" });
  }

  res.json({ productId });
});








