const express = require("express");
const router = express.Router();
const banco = require("../dados");

router.get("/detalhados", (req, res) => {
  console.log("[MONOLITO] GET /pedidos/detalhados");
  const lista = banco.pedidos.map(pedido => {
    const usuario = banco.usuarios.find(u => u.id === pedido.usuarioId);
    const produto = banco.produtos.find(p => p.id === pedido.produtoId);
    return {
      id: pedido.id,
      usuario: usuario ? usuario.nome : "Não encontrado",
      produto: produto ? produto.nome : "Não encontrado",
      quantidade: pedido.quantidade,
      total: produto ? produto.preco * pedido.quantidade : 0
    };
  });
  res.json(lista);
});

router.get("/", (req, res) => {
  console.log("[MONOLITO] GET /pedidos");
  res.json(banco.pedidos);
});

router.get("/:id", (req, res) => {
  console.log(`[MONOLITO] GET /pedidos/${req.params.id}`);
  const pedido = banco.pedidos.find(p => p.id === Number(req.params.id));
  if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
  res.json(pedido);
});

router.post("/", (req, res) => {
  console.log("[MONOLITO] POST /pedidos");
  const { usuarioId, produtoId, quantidade } = req.body;
  if (!usuarioId || !produtoId || !quantidade) {
    return res.status(400).json({ erro: "usuarioId, produtoId e quantidade são obrigatórios" });
  }
  const novo = { id: banco.pedidos.length + 1, usuarioId, produtoId, quantidade };
  banco.pedidos.push(novo);
  res.status(201).json(novo);
});

module.exports = router;
