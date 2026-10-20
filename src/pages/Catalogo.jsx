import { useState, useEffect } from 'react';
import { buscarProdutos } from '../services/api';
import ProdutoCard from '../components/ProdutoCard';
import styles from '../assets/styles/Catalogo.module.css';

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarProdutos();
        setProdutos(dados);
      } catch (error) {
        console.error('Falha ao carregar produtos:', error);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // Filtragem dinâmica por nome e indicação/categoria
  const produtosFiltrados = produtos.filter((prod) => {
    const atendeBusca = prod.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const atendeCategoria =
      categoriaSelecionada === 'Todos' || prod.indicacao === categoriaSelecionada;
    return atendeBusca && atendeCategoria;
  });

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>Mimos para o seu pet</h1>
        <p>Encontre o próximo brinquedo favorito de quem você ama.</p>

        <div className={styles.buscaContainer}>
          <input
            type="text"
            placeholder="O que seu pet precisa?"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className={styles.inputBusca}
          />
        </div>
      </section>

      <section className={styles.conteudoPrincipal}>
        {/* Filtros em Abas (Mobile First) / Lateral (Desktop) */}
        <aside className={styles.filtros}>
          <button
            type="button"
            className={categoriaSelecionada === 'Todos' ? styles.ativo : ''}
            onClick={() => setCategoriaSelecionada('Todos')}
          >
            Todos
          </button>
          <button
            type="button"
            className={categoriaSelecionada === 'Cães' ? styles.ativo : ''}
            onClick={() => setCategoriaSelecionada('Cães')}
          >
            Cães
          </button>
          <button
            type="button"
            className={categoriaSelecionada === 'Gatos' ? styles.ativo : ''}
            onClick={() => setCategoriaSelecionada('Gatos')}
          >
            Gatos
          </button>
        </aside>

        <div className={styles.vitrine}>
          <div className={styles.infoContagem}>
            <span>{produtosFiltrados.length} produtos encontrados</span>
          </div>

          {carregando ? (
            <p className={styles.carregando}>Carregando mimos...</p>
          ) : (
            <div className={styles.gridProdutos}>
              {produtosFiltrados.map((prod) => (
                <ProdutoCard key={prod.id} produto={prod} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}