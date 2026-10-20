import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import styles from '../assets/styles/ProdutoCard.module.css';

export default function ProdutoCard({ produto }) {
  const { adicionarAoCarrinho } = useCarrinho();

  const precoFormatado = produto.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className={styles.card}>
      <div className={styles.imagemContainer}>
        <img src={produto.imagem} alt={produto.nome} className={styles.imagem} />
      </div>

      <div className={styles.conteudo}>
        <span className={styles.categoria}>{produto.categoria}</span>
        <h3 className={styles.nome}>{produto.nome}</h3>
        <p className={styles.preco}>{precoFormatado}</p>

        <Link to={`/produtos/${produto.id}`} className={styles.linkDetalhes}>
          Ver detalhes &rarr;
        </Link>

        <button
          type="button"
          onClick={() => adicionarAoCarrinho(produto)}
          className={styles.btnAdicionar}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}