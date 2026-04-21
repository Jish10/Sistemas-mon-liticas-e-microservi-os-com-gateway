const express = require("express");
const router = express.Router();
const banco = require("../dados");

router.get("/", (req, res) => {
  console.log("[MONOLITO] GET /produtos");
  res.json(banco.produtos);
});

router.get("/:id", (req, res) => {
  console.log(`[MONOLITO] GET /produtos/${req.params.id}`);
  const produto = banco.produtos.find(p => p.id === Number(req.params.id));
  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
  res.json(produto);
});

router.post("/", (req, res) => {
  console.log("[MONOLITO] POST /produtos");
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
  const novo = { id: banco.produtos.length + 1, nome, preco };
  banco.produtos.push(novo);
  res.status(201).json(novo);
});

module.exports = router;
