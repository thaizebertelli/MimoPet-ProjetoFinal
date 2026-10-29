import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext"; // Importe seu hook do carrinho
import sucessoIcon from "../assets/img/certo.svg";

export function Sucesso() {
  const { limparCarrinho } = useCarrinho(); // Ou a função/estado que você usa para esvaziar (ex: setCarrinho([]))

  useEffect(() => {
    // Executa a limpeza do carrinho assim que a tela de Sucesso é montada
    limparCarrinho();
  }, []);

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