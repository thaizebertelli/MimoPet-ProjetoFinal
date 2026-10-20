import { createContext, useContext, useState, useEffect } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  // Inicializa o carrinho com dados do localStorage para não perder ao recarregar a página
  const [carrinho, setCarrinho] = useState(() => {
    const dadosSalvos = localStorage.getItem('@mimopet:carrinho');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  // Salva no localStorage sempre que o carrinho for alterado
  useEffect(() => {
    localStorage.setItem('@mimopet:carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  // Adiciona produto respeitando o limite de estoque
  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    setCarrinho((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.id === produto.id);

      if (itemExistente) {
        const novaQuantidade = itemExistente.quantidade + quantidade;
        
        // Impede adicionar além do estoque disponível
        if (novaQuantidade > produto.estoque) {
          alert(`Desculpe, temos apenas ${produto.estoque} unidades disponíveis em estoque.`);
          return itensAtuais;
        }

        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: novaQuantidade }
            : item
        );
      }

      // Se o produto não estava no carrinho, adiciona com a quantidade informada
      return [...itensAtuais, { ...produto, quantidade }];
    });
  };

  // Remove um produto do carrinho
  const removerDoCarrinho = (produtoId) => {
    setCarrinho((itensAtuais) => itensAtuais.filter((item) => item.id !== produtoId));
  };

  // Atualiza a quantidade de um item no carrinho
  const atualizarQuantidade = (produtoId, novaQuantidade) => {
    if (novaQuantidade < 1) return;

    setCarrinho((itensAtuais) =>
      itensAtuais.map((item) => {
        if (item.id === produtoId) {
          if (novaQuantidade > item.estoque) {
            alert(`Quantidade máxima em estoque é de ${item.estoque} unidades.`);
            return item;
          }
          return { ...item, quantidade: novaQuantidade };
        }
        return item;
      })
    );
  };

  // Limpa o carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // Cálculos derivados
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        totalItens,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook personalizado para consumir o contexto do carrinho
export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser utilizado dentro de um CarrinhoProvider');
  }
  return context;
}