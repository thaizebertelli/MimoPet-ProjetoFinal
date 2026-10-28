import { Link } from "react-router-dom";
import styles from "../assets/styles/ProdutoNaoEncontrado.module.css";
import imagem404 from "../assets/img/404.svg";

export default function Erro404() {
  return (
    <main className={styles.paginaContainer}>
      {/* Breadcrumb padrão de navegação */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Produtos</Link>
        <span>&gt;</span>
        <span>Página não encontrada</span>
      </nav>

      <div className={styles.conteudoCentral}>
        {/* Círculo roxo com a imagem 404.svg no lugar da caixa */}
        <div className={styles.circuloIlustracao}>
          <img
            src={imagem404}
            alt="Erro 404 - Página não encontrada"
            className={styles.imgIlustracao}
            style={{
              width: "420px",
              height: "400px",
              opacity: 1,
            }} /* Ajuste os valores como preferir */
          />
        </div>

        {/* Textos e botões alinhados com o mesmo padrão */}
        <div className={styles.infoWrapper}>
          <span className={styles.subtituloTopo}>Página não encontrada</span>

          <h1 className={styles.titulo}>Ops! Esse caminho não existe.</h1>

          <p className={styles.descricao}>
            Parece que seguimos a pegada errada. O endereço que você acessou não
            existe ou mudou de lugar.
          </p>

          <div className={styles.acoesWrapper}>
            <Link to="/" className={styles.btnVoltar}>
              ← Voltar ao catálogo
            </Link>

            <span className={styles.rodapeNota}>
              Os melhores mimos estão no caminho certo.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
