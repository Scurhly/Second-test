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

    const form = new FormData();
    form.append("name", `Donation ${amount} Robux`);
    form.append("description", `Donate ${amount} Robux to support the game`);
    form.append("price", amount.toString());
    form.append("isForSale", "true");
    form.append("isRegionalPricingEnabled", "true");

    const response = await fetch(
      `https://apis.roblox.com/developer-products/v2/universes/${9353795104}/developer-products`,
      {
        method: "POST",
        headers: {
          "x-api-key": ROBLOX_API_KEY,
          ...form.getHeaders(),
        },
        body: form,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Roblox API error:", data);
      return res.status(response.status).json(data);
    }

    res.json({
      success: true,
      productId: data.id,
      price: amount,
      name: `Donation ${amount} Robux`,
    });
  } catch (err) {
    console.error("Create product failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ------------------ Railway PORT ------------------ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



