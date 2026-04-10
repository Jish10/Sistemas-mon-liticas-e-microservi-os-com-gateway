const express = require("express");
const app = express();

const pedidos = [
  { id: 1, usuarioId: 1, produtoId: 2, quantidade: 2 },
  { id: 2, usuarioId: 2, produtoId: 1, quantidade: 1 }
];

app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

app.get("/pedidos/:id", (req, res) => {
  const id = Number(req.params.id);
  const pedido = pedidos.find((p) => p.id === id);

  if (!pedido) {
    return res.status(404).json({ erro: "Pedido não encontrado" });
  }

  res.json(pedido);
});

const PORTA = 3003;
app.listen(PORTA, () => {
  console.log(`Order Service rodando em http://localhost:${PORTA}`);
});