import infoIcon from "../assets/img/info.svg";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResumoCompra } from "../components/ResumoCompra";
import { produtosIniciais } from "../data/produtos";
import { usePagamento } from "../hooks/usePagamento";

// Funções de Máscara e Filtro
const formatarNumeroCartao = (val) => {
  const apenasNumeros = val.replace(/\D/g, "").slice(0, 16);
  return apenasNumeros.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

const formatarValidade = (val) => {
  const apenasNumeros = val.replace(/\D/g, "").slice(0, 4);
  if (apenasNumeros.length >= 3) {
    return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`;
  }
  return apenasNumeros;
};

const formatarCVV = (val) => val.replace(/\D/g, "").slice(0, 3);

const formatarTitular = (val) => val.replace(/[^a-zA-Z\s]/g, "").slice(0, 50);

// Esquema de Validação Zod
const pagamentoSchema = z.object({
  numero: z
    .string()
    .transform((val) => val.replace(/\s/g, ""))
    .refine((val) => val.length === 16, "O cartão deve possuir 16 dígitos"),
  cvv: z.string().regex(/^\d{3}$/, "Deve possuir 3 dígitos"),
  validade: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Informe uma data válida"),
  titular: z.string().min(1, "Informe o nome do titular"),
});

export function Pagamento() {
  const { processarCompra, processando } = usePagamento();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pagamentoSchema),
  });

  return (
    <main className="container-carrinho">
      <section className="secao-produtos">
        <header className="titulo-secao-pagamento">
          <h1>Pagamento</h1>
          <p>Preencha os dados abaixo para finalizar seu pedido</p>
        </header>

        <form
          onSubmit={handleSubmit(processarCompra)}
          className="form-pagamento"
        >
          <h2 className="subtitulo-form">Informações do cartão</h2>

          <div className="campo-linha">
            <label htmlFor="numero">Número do cartão</label>
            <input
              id="numero"
              type="text"
              placeholder="0000 0000 0000 0000"
              {...register("numero")}
              onChange={(e) => {
                const formatado = formatarNumeroCartao(e.target.value);
                setValue("numero", formatado, { shouldValidate: true });
              }}
            />
            {errors.numero && (
              <span className="erro-texto">{errors.numero.message}</span>
            )}
          </div>

          <div className="linha-dupla-cartao">
            <div className="campo-linha">
              <label htmlFor="cvv">
                CVV{" "}
                <img
                  src={infoIcon}
                  alt="Informação"
                  className="icone-info-img"
                />
              </label>
              <input
                id="cvv"
                type="text"
                placeholder="000"
                {...register("cvv")}
                onChange={(e) => {
                  const formatado = formatarCVV(e.target.value);
                  setValue("cvv", formatado, { shouldValidate: true });
                }}
              />
              {errors.cvv && (
                <span className="erro-texto">{errors.cvv.message}</span>
              )}
            </div>

            <div className="campo-linha">
              <label htmlFor="validade">Validade</label>
              <input
                id="validade"
                type="text"
                placeholder="MM/AA"
                {...register("validade")}
                onChange={(e) => {
                  const formatado = formatarValidade(e.target.value);
                  setValue("validade", formatado, { shouldValidate: true });
                }}
              />
              {errors.validade && (
                <span className="erro-texto">{errors.validade.message}</span>
              )}
            </div>
          </div>

          <div className="campo-linha">
            <label htmlFor="titular">Titular do cartão</label>
            <input
              id="titular"
              type="text"
              placeholder="Nome no cartão"
              {...register("titular")}
              onChange={(e) => {
                const formatado = formatarTitular(e.target.value);
                setValue("titular", formatado, { shouldValidate: true });
              }}
            />
            {errors.titular && (
              <span className="erro-texto">{errors.titular.message}</span>
            )}
          </div>

          {processando ? (
            <div className="card-processando">
              <div className="conteudo-processando">
                <span className="spinner-carregando"></span>
                <span>Processando compra</span>
              </div>
              <p className="subtexto-processando">
                Aguarde enquanto finalizamos seu pedido.
              </p>
            </div>
          ) : (
            <button type="submit" className="btn-continuar">
              Finalizar Compra
            </button>
          )}
        </form>
      </section>

      <section className="secao-resumo">
        <ResumoCompra produtos={produtosIniciais} />
      </section>
    </main>
  );
}