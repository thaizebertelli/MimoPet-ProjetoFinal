import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import db from '../../db.json';
import { useCarrinho } from '../context/CarrinhoContext';
import '../assets/styles/DetalhesProduto.css';

export function DetalhesProduto() {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();
  const [quantidade, setQuantidade] = useState(1);

  const produtosLista = Array.isArray(db) ? db : db.produtos || [];
  const produto = produtosLista.find((p) => String(p.id) === String(id));

  if (!produto) {
    return (
      <div className="detalhes-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Produto não encontrado</h2>
        <Link to="/" className="link-voltar-catalogo" style={{ marginTop: '1rem' }}>
          Voltar para o catálogo
        </Link>
      </div>
    );
  }

  const precoFormatado = produto.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const incrementar = () => setQuantidade((prev) => prev + 1);
  const decrementar = () => setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdicionar = () => {
    for (let i = 0; i < quantidade; i++) {
      adicionarAoCarrinho(produto);
    }
  };

  return (
    <main className="detalhes-container">
      <nav className="breadcrumb">
        <Link to="/">Produtos</Link>
        <span>&gt;</span>
        <span>{produto.nome}</span>
      </nav>

      <div className="produto-grid-principal">
        <div className="produto-imagem-wrapper">
          <img src={produto.imagem} alt={produto.nome} className="produto-imagem-grande" />
        </div>

        <div className="produto-info-wrapper">
          <span className="categoria-detalhe">{produto.categoria}</span>
          <h1 className="titulo-detalhe">{produto.nome}</h1>
          <p className="descricao-detalhe">{produto.descricao}</p>

          <div className="preco-detalhe-wrapper">
            <span className="preco-detalhe">{precoFormatado}</span>
            <span className="subpreco-detalhe">à vista no cartão</span>
          </div>

          <div className="badge-estoque">
            <span>✓ Em estoque • {produto.estoque || 10} unidades disponíveis</span>
          </div>

          <div className="quantidade-container">
            <span className="quantidade-label">Quantidade</span>
            <div className="controle-quantidade">
              <button type="button" onClick={decrementar} className="btn-qtd">-</button>
              <span className="valor-qtd">{quantidade}</span>
              <button type="button" onClick={incrementar} className="btn-qtd">+</button>
            </div>
          </div>

          <button type="button" onClick={handleAdicionar} className="btn-adicionar-grande">
            🛒 Adicionar ao carrinho
          </button>
        </div>
      </div>

      <div className="secoes-inferiores-grid">
        <div className="bloco-info">
          <h3>Conselho de uso</h3>
          <p>{produto.conselhoUso || 'Ofereça sob supervisão do tutor.'}</p>
        </div>

        <div className="bloco-info">
          <h3>Detalhes do mimo</h3>
          <div className="detalhes-tabela">
            <div className="linha-tabela">
              <span>Indicação</span>
              <span>{produto.indicacao}</span>
            </div>
            <div className="linha-tabela">
              <span>Formato</span>
              <span>{produto.formato || 'N/A'}</span>
            </div>
            <div className="linha-tabela">
              <span>Conteúdo</span>
              <span>{produto.conteudo || '1 unidade'}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}