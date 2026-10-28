import { Link } from 'react-router-dom';
import styles from '../assets/styles/ProdutoNaoEncontrado.module.css';
import caixaIcon from '../assets/img/iconCaixa.svg';

export function ProdutoNaoEncontrado() {
  return (
    <main className={styles.paginaContainer}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Produtos</Link>
        <span>&gt;</span>
        <span>Produto não encontrado</span>
      </nav>

      <div className={styles.conteudoCentral}>
        <div className={styles.circuloIlustracao}>
          <img src={caixaIcon} alt="Produto não encontrado" className={styles.imgIlustracao} />
        </div>

        <div className={styles.infoWrapper}>
          <span className={styles.subtituloTopo}>MIMO NÃO LOCALIZADO</span>
          
          <h1 className={styles.titulo}>Produto não encontrado</h1>
          
          <p className={styles.descricao}>
            Esse produto não está disponível ou foi removido da loja. Mas ainda temos muitos mimos para o seu pet!
          </p>

          {/* Bloco isolado para o botão e o texto de rodapé ficarem um abaixo do outro com segurança */}
          <div className={styles.acoesWrapper}>
            <Link to="/" className={styles.btnVoltar}>
              ← Voltar ao catálogo
            </Link>
            <span className={styles.rodapeNota}>Encontre um novo favorito no catálogo.</span>
          </div>
        </div>
      </div>
    </main>
  );
}