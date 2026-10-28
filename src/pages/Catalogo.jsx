import { useState, useMemo } from "react";
import db from "../../db.json";
import ProdutoCard from "../components/ProdutoCard";
import styles from "../assets/styles/Catalogo.module.css";
import LupaIcon from "../assets/img/iconLupa.svg";
import coracaoIcon from "../assets/img/iconCoracao.svg";
import escudoIcon from "../assets/img/iconEscudo.svg";
import caixaIcon from "../assets/img/iconCaixa.svg";

export default function Catalogo() {
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("relevantes");

  // Garante a leitura da lista de produtos no db.json
  const produtosLista = useMemo(() => {
    return Array.isArray(db) ? db : db.produtos || [];
  }, []);

  // Extrai dinamicamente as categorias pela propriedade "indicacao"
  const listaCategorias = useMemo(() => {
    const setCategorias = new Set(["Todos"]);
    produtosLista.forEach((p) => {
      if (p.indicacao) {
        setCategorias.add(p.indicacao);
      }
    });
    return Array.from(setCategorias);
  }, [produtosLista]);

  // Conta produtos por indicação
  const contarProdutosPorCategoria = (cat) => {
    if (cat === "Todos") return produtosLista.length;
    return produtosLista.filter((p) => p.indicacao === cat).length;
  };

  // Aplica a busca, a filtragem e a ordenação
  const produtosFiltrados = useMemo(() => {
    return produtosLista
      .filter((produto) => {
        const nomeMatch = produto.nome
          ? produto.nome.toLowerCase().includes(busca.toLowerCase())
          : true;
        const categoriaMatch =
          categoriaSelecionada === "Todos" ||
          produto.indicacao === categoriaSelecionada;

        return nomeMatch && categoriaMatch;
      })
      .sort((a, b) => {
        if (ordenacao === "preco-crescente") return a.preco - b.preco;
        if (ordenacao === "preco-decrescente") return b.preco - a.preco;
        if (ordenacao === "nome-az") return a.nome.localeCompare(b.nome);
        if (ordenacao === "nome-za") return b.nome.localeCompare(a.nome);
        return 0;
      });
  }, [busca, categoriaSelecionada, ordenacao, produtosLista]);

  return (
    <main className={styles.containerCatalogo}>
      <section className={styles.heroCatalogo}>
        <h1>Mimos para o seu pet</h1>
        <p>Encontre o próximo brinquedo favorito de quem você ama.</p>
      </section>

      {/* Busca */}
      <div className={styles.buscaContainer}>
        <img
          src={LupaIcon}
          alt="Ícone de busca"
          className={styles.iconeBusca}
        />
        <input
          type="text"
          placeholder="O que seu pet precisa?"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.buscaInput}
        />
        <button type="button" className={styles.btnBuscar}>
          Buscar
        </button>
      </div>

      <div className={styles.conteudoPrincipal}>
        {/* Categorias - Mobile */}
        <div className={styles.categoriasMobile}>
          {listaCategorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaSelecionada(cat)}
              className={`${styles.btnCategoriaMobile} ${
                categoriaSelecionada === cat ? styles.active : ""
              }`}
            >
              {cat === "Todos" ? "Todos" : `Para ${cat.toLowerCase()}`}
            </button>
          ))}
        </div>

        {/* Categorias - Sidebar Desktop */}
        <aside className={styles.sidebarDesktop}>
          <h3 className={styles.tituloSidebar}>Categorias</h3>
          {listaCategorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaSelecionada(cat)}
              className={`${styles.itemCategoriaDesktop} ${
                categoriaSelecionada === cat ? styles.active : ""
              }`}
            >
              <span>
                {cat === "Todos"
                  ? "Todos os produtos"
                  : `Para ${cat.toLowerCase()}`}
              </span>
              <span className={styles.badgeQtd}>
                {contarProdutosPorCategoria(cat)}
              </span>
            </button>
          ))}
        </aside>

        <section className={styles.areaProdutos}>
          <div className={styles.barraInfoFiltro}>
            <span>{produtosFiltrados.length} produtos encontrados</span>

            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className={styles.selectOrdenacao}
            >
              <option value="relevantes">Mais relevantes</option>
              <option value="preco-crescente">Menor preço</option>
              <option value="preco-decrescente">Maior preço</option>
              <option value="nome-az">Nome (A-Z)</option>
              <option value="nome-za">Nome (Z-A)</option>
            </select>
          </div>

          <div className={styles.gridProdutos}>
            {produtosFiltrados.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>

          {produtosFiltrados.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <p
                style={{
                  color: "var(--texto-suave)",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                }}
              >
                Nenhum produto encontrado
              </p>
              <button
                type="button"
                onClick={() => setBusca("")}
                style={{
                  backgroundColor: "var(--laranja-botao, #FFB86C)",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "var(--texto-escuro, #292929)",
                }}
              >
                Limpar busca
              </button>
            </div>
          )}

          <p
            style={{
              textAlign: "center",
              color: "var(--texto-suave)",
              fontSize: "0.85rem",
              marginTop: "1.5rem",
            }}
          >
            Você viu todos os mimos desta seleção.
          </p>
        </section>
      </div>

      {/* Seção de Benefícios */}
      <div className={styles.beneficiosRodape}>
        <div className={styles.beneficioItem}>
          <img src={coracaoIcon} alt="" className={styles.iconeBeneficio} />
          <div>
            <strong>Escolhidos com carinho</strong>
            <p>Mimos para o dia a dia do seu pet.</p>
          </div>
        </div>
        
        <div className={styles.beneficioItem}>
          <img src={escudoIcon} alt="" className={styles.iconeBeneficio} />
          <div>
            <strong>Compra segura</strong>
            <p>Mais tranquilidade em cada pedido.</p>
          </div>
        </div>
        
        <div className={styles.beneficioItem}>
          <img src={caixaIcon} alt="" className={styles.iconeBeneficio} />
          <div>
            <strong>Cuidado em cada entrega</strong>
            <p>Do nosso carinho para a sua casa.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
