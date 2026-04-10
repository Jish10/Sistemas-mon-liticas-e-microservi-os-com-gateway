const express = require("express");
const app = express();

const produtos = [
  { id: 1, nome: "Laptop", preco: 2500 },
  { id: 2, nome: "Mouse", preco: 50 }
];

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.json(produto);
});

const PORTA = 3002;
app.listen(PORTA, () => {
  console.log(`Servico de produto rodando em http://localhost:${PORTA}`);
});