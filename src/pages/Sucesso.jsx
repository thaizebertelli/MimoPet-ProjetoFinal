import { Link } from "react-router-dom";
import sucessoIcon from "../assets/img/certo.svg";

export function Sucesso() {
  return (
    <main className="container-resultado">
      <div className="icone-resultado sucesso">
        <img
          src={sucessoIcon}
          alt="Compra Aprovada"
          className="icone-sucesso-img"
        />
      </div>

      <h1 className="titulo-resultado">Compra Aprovada!</h1>
      <p className="texto-resultado">
        Obrigado por escolher a MimoPet!
        <br />
        Seu pet já está esperando pelos mimos.
      </p>

      <Link to="/" className="btn-continuar">
        Voltar para a loja
      </Link>
    </main>
  );
}