const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Server running on http://second-test-production.up.railway.app");
});

app.post("/create-product", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!Number.isInteger(amount) || amount < 1 || amount > 20000) {
      return res.status(400).json({ error: "Invalid amount" });
    }

  
});

/* ------------------ Railway PORT ------------------ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





