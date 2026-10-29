import falhaIcon from "../assets/img/falha.svg";

import { Link } from "react-router-dom";

export function Falha() {
  return (
    <>
      <main className="container-resultado">
        <div className="icone-resultado falha">
          <img
            src={falhaIcon}
            alt="Tentativa de golpe"
            className="icone-falha-img"
          />
        </div>

        <h1 className="titulo-resultado">tentativa de golpe</h1>
        <p className="texto-resultado">
          Não foi possível concluir a compra
          <br />
          Verifique os dados e tente novamente.
        </p>

        <Link to="/pagamento" className="btn-continuar">
          Tentar novamente
        </Link>
      </main>
    </>
  );
}
