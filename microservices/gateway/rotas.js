const express = require("express");
const proxy = require("express-http-proxy");
const axios = require("axios");

const router = express.Router();
const usuariosProxy = proxy("http://localhost:3001");
const produtosProxy = proxy("http://localhost:3002");
const pedidosProxy = proxy("http://localhost:3003");

router.use((req, res, next) => {
  console.log(`[GATEWAY] ${req.method} ${req.url}`);
  next();
});

router.get("/usuarios", (req, res) => usuariosProxy(req, res));
router.get("/usuarios/:id", (req, res) => usuariosProxy(req, res));
router.post("/usuarios", (req, res) => usuariosProxy(req, res));

router.get("/produtos", (req, res) => produtosProxy(req, res));
router.get("/produtos/:id", (req, res) => produtosProxy(req, res));
router.post("/produtos", (req, res) => produtosProxy(req, res));

router.get("/pedidos", (req, res) => pedidosProxy(req, res));
router.get("/pedidos/:id", (req, res) => pedidosProxy(req, res));
router.post("/pedidos", (req, res) => pedidosProxy(req, res));

router.get("/pedidos-detalhados", async (req, res) => {
  try {
    console.log("[GATEWAY] Montando pedidos detalhados");
    const respostaPedidos = await axios.get("http://localhost:3003/pedidos");
    const pedidos = respostaPedidos.data;

    const resultado = await Promise.all(
      pedidos.map(async (pedido) => {
        const usuario = await axios.get(`http://localhost:3001/usuarios/${pedido.usuarioId}`);
        const produto = await axios.get(`http://localhost:3002/produtos/${pedido.produtoId}`);

        return {
          id: pedido.id,
          usuario: usuario.data.nome,
          produto: produto.data.nome,
          quantidade: pedido.quantidade,
          total: produto.data.preco * pedido.quantidade
        };
      })
    );

    res.json(resultado);
  } catch {
    res.status(500).json({ erro: "Erro ao montar pedidos detalhados" });
  }
});

module.exports = router;
