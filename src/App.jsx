import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Catalogo from './pages/Catalogo';
import { DetalhesProduto } from './pages/DetalhesProduto';
import { Carrinho } from './pages/Carrinho';
import { Pagamento } from './pages/Pagamento';
import { Sucesso } from './pages/Sucesso';
import { Falha } from './pages/Falha';
import { ProdutoNaoEncontrado } from './pages/ProdutoNaoEncontrado';
import Erro404 from './pages/Erro404';

export function App() {
  const location = useLocation();

  // Define qual etapa mostrar no Header baseado na URL atual
  let etapa = null;
  if (location.pathname === '/carrinho') etapa = 'carrinho';
  if (location.pathname === '/pagamento') etapa = 'pagamento';
  if (location.pathname === '/sucesso' || location.pathname === '/falha') etapa = 'concluido';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header etapaAtual={etapa} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/produtos" element={<Catalogo />} />
          <Route path="/produtos/:id" element={<DetalhesProduto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/falha" element={<Falha />} />
          <Route path="/produto-nao-encontrado" element={<ProdutoNaoEncontrado />} />
          <Route path="*" element={<Erro404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;