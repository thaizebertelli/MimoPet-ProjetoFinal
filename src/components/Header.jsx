import { Link } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";
import logoImg from "../assets/img/logo.svg";
import sacolaIcon from "../assets/img/iconSacola.svg";
import "../assets/styles/Header.css";

export function Header({ etapaAtual }) {
  const { totalItens } = useCarrinho();

  return (
    <header className="header-principal">
      <div className="container-header">
        <Link to="/" className="logo-container">
          <img src={logoImg} alt="MimoPet" className="logo-imagem" />
        </Link>

        <div className="acoes-header">
          <Link to="/" className="link-produtos">
            Produtos
          </Link>

          <Link to="/carrinho" className="icone-carrinho-header" aria-label="Carrinho de compras">
            <img src={sacolaIcon} alt="Carrinho" className="icone-sacola" />
            {totalItens > 0 && (
              <span className="badge-quantidade">{totalItens}</span>
            )}
          </Link>
        </div>
      </div>

      {etapaAtual && (
        <nav className="barra-progresso" aria-label="Progresso da compra">
          <span className={etapaAtual === "carrinho" ? "etapa ativa" : "etapa"}>
            Carrinho
          </span>
          <span className="separador">&gt;</span>
          <span className={etapaAtual === "pagamento" ? "etapa ativa" : "etapa"}>
            Pagamento
          </span>
          <span className="separador">&gt;</span>
          <span className={etapaAtual === "concluido" ? "etapa ativa" : "etapa"}>
            Concluído
          </span>
        </nav>
      )}
    </header>
  );
}
