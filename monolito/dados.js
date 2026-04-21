module.exports = {
  usuarios: [
    { id: 1, nome: "Amanda" },
    { id: 2, nome: "Zé" }
  ],
  produtos: [
    { id: 1, nome: "Laptop", preco: 25000 },
    { id: 2, nome: "Mouse", preco: 500 }
  ],
  pedidos: [
    { id: 1, usuarioId: 1, produtoId: 2, quantidade: 2 },
    { id: 2, usuarioId: 2, produtoId: 1, quantidade: 1 }
  ]
};
