const express = require("express");
const router = express.Router();
const banco = require("../dados");

router.get("/", (req, res) => {
  console.log("[MONOLITO] GET /usuarios");
  res.json(banco.usuarios);
});

router.get("/:id", (req, res) => {
  console.log(`[MONOLITO] GET /usuarios/${req.params.id}`);
  const usuario = banco.usuarios.find(u => u.id === Number(req.params.id));
  if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
  res.json(usuario);
});

router.post("/", (req, res) => {
  console.log("[MONOLITO] POST /usuarios");
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });
  const novo = { id: banco.usuarios.length + 1, nome };
  banco.usuarios.push(novo);
  res.status(201).json(novo);
});

module.exports = router;
