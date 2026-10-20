import { Link } from 'react-router-dom';
import { produtosIniciais } from '../data/produtos';
import { ItemCarrinho } from '../components/ItemCarrinho';
import { ResumoCompra } from '../components/ResumoCompra';

export function Carrinho() {
  return (
    <main className="container-carrinho">
      <section className="secao-produtos">
        <header className="titulo-secao">
          <h1>Seu carrinho</h1>
          <p>Confira seus produtos antes de finalizar a compra.</p>
        </header>

        <div className="lista-produtos">
          {produtosIniciais.map((produto) => (
            <ItemCarrinho key={produto.id} item={produto} />
          ))}
        </div>
      </section>

      <section className="secao-resumo">
        <ResumoCompra produtos={produtosIniciais} />
        <Link to="/pagamento" className="btn-continuar">
          Continuar Pagamento
        </Link>
      </section>
    </main>
  );
}