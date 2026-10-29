import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import { ResumoCompra } from '../components/ResumoCompra';

import lixeiraIcon from "../assets/img/iconLixo.svg";
import menosIcon from "../assets/img/iconMenos.svg";
import maisIcon from "../assets/img/iconMais.svg";

export function Carrinho() {
  const { 
    carrinho, 
    removerDoCarrinho, 
    atualizarQuantidade, 
    limparCarrinho, 
    valorTotal 
  } = useCarrinho();

  return (
    <main className="container-carrinho">
      <section className="secao-produtos">
        <header className="titulo-secao">
          <h1>Seu carrinho</h1>
          <p>Confira seus produtos antes de finalizar a compra.</p>
        </header>

        {/* Botão de Excluir Tudo */}
        {carrinho.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button
              type="button"
              onClick={limparCarrinho}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--vermelho-principal)',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <img src={lixeiraIcon} alt="Excluir tudo" style={{ width: '16px', height: '16px' }} /> 
              Excluir tudo
            </button>
          </div>
        )}

        <div className="lista-produtos">
          {carrinho.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#fff', borderRadius: '12px' }}>
              <p style={{ color: 'var(--texto-suave)', marginBottom: '1rem' }}>Seu carrinho está vazio.</p>
              <Link
                to="/"
                style={{
                  color: 'var(--roxo-principal)',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}
              >
                Voltar para o catálogo
              </Link>
            </div>
          ) : (
            carrinho.map((item) => {
              const precoUnitarioFormatado = item.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });

              const subtotalFormatado = (item.preco * item.quantidade).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });

              return (
                <div key={item.id} className="card-produto">
                  <img src={item.imagem} alt={item.nome} className="imagem-produto" />

                  <div className="detalhes-produto">
                    <h3 className="nome-produto">{item.nome}</h3>
                    <span className="preco-unitario">{precoUnitarioFormatado} cada</span>

                    <div className="controles-quantidade">
                      <button
                        type="button"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      >
                        <img src={menosIcon} alt="Diminuir quantidade" className="icone-qtd" />
                      </button>

                      <span className="numero-quantidade">{item.quantidade}</span>

                      <button
                        type="button"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      >
                        <img src={maisIcon} alt="Aumentar quantidade" className="icone-qtd" />
                      </button>
                    </div>

                    <span className="subtotal-item">Subtotal: {subtotalFormatado}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removerDoCarrinho(item.id)}
                    className="btn-remover"
                    title="Remover item"
                  >
                    <img src={lixeiraIcon} alt="Remover" className="icone-lixeira" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Resumo da Compra */}
      {carrinho.length > 0 && (
        <section className="secao-resumo">
          <ResumoCompra produtos={carrinho} />
          <Link to="/pagamento" className="btn-continuar">
            Continuar Pagamento
          </Link>
        </section>
      )}
    </main>
  );
}