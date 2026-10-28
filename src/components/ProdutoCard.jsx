import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import styles from '../assets/styles/ProdutoCard.module.css';
import CarrinhoIcon from "../assets/img/iconCarrinho.svg";

export default function ProdutoCard({ produto }) {
  const { adicionarAoCarrinho } = useCarrinho();

  const precoFormatado = produto.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className={styles.cardProduto}>
      <div className={styles.topoCard}>
        <div className={styles.imagemContainer}>
          <img src={produto.imagem} alt={produto.nome} className={styles.imagemProduto} />
        </div>

        <div className={styles.conteudoProduto}>
          <span className={styles.categoriaProduto}>
            {produto.categoria || 'Brinquedos para pets'}
          </span>
          <h3 className={styles.nomeProduto}>{produto.nome}</h3>
          
          {produto.descricao && (
            <p className={styles.descricaoCurta}>{produto.descricao}</p>
          )}

          <p className={styles.precoProduto}>{precoFormatado}</p>

          <Link to={`/produtos/${produto.id}`} className={styles.linkDetalhesMobile}>
            Ver detalhes
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => adicionarAoCarrinho(produto)}
        className={styles.btnAdicionarCarrinho}
      >
        <img src={CarrinhoIcon} alt="" className={styles.iconeCarrinho} /> 
        Adicionar ao carrinho
      </button>

      <Link to={`/produtos/${produto.id}`} className={styles.linkDetalhesDesktop}>
        Ver detalhes &rarr;
      </Link>
    </div>
  );
}