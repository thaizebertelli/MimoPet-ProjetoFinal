// Calcula o valor total de todos os itens somando (preço * quantidade)
export function calcularTotalCarrinho(itens) {
  if (!Array.isArray(itens)) return 0;
  
  return itens.reduce((total, item) => {
    const preco = Number(item.preco) || 0;
    const quantidade = Number(item.quantidade) || 0;
    return total + (preco * quantidade);
  }, 0);
}