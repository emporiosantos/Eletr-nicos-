import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const stripe = new Stripe("SUA_CHAVE_SECRETA_AQUI");

app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "Notebook Gamer", price: 4500 },
  { id: 2, name: "Smartphone Samsung", price: 2500 },
  { id: 3, name: "Headset Gamer", price: 350 }
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/checkout", async (req, res) => {
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map(item => ({
      price_data: {
        currency: "brl",
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: 1
    })),
    mode: "payment",
    success_url: "https://SEUUSUARIO.github.io/NOMEDOREPO",
    cancel_url: "https://SEUUSUARIO.github.io/NOMEDOREPO"
  });

  res.json({ url: session.url });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
