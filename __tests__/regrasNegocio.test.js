import { describe, it, expect } from "vitest"; // ou 'jest' dependendo do que estiver usando
import { formatarMoeda } from "../src/utils/formatador";
import { verificarDigitosIguais } from "../src/utils/Pagamento";
import { calcularTotalCarrinho } from "../src/utils/carrinhoUtils";

describe("Testes Unitários de Regras de Negócio (RF17)", () => {
  // 1. Testes para formatarMoeda
  describe("formatarMoeda", () => {
    it("deve formatar um número corretamente para o padrão de moeda BRL (Caminho feliz)", () => {
      const resultado = formatarMoeda(150.5);
      // Removemos espaços invisíveis para comparar apenas os caracteres legíveis
      expect(resultado.replace(/\s+/g, " ")).toBe("R$ 150,50");
    });

    it("deve formatar o valor zero corretamente (Caminho triste/limite)", () => {
      const resultado = formatarMoeda(0);
      expect(resultado.replace(/\s+/g, " ")).toBe("R$ 0,00");
    });
  });

  // 2. Testes para verificarDigitosIguais (Regra do golpe)
  describe("verificarDigitosIguais", () => {
    it("deve retornar true se todos os 16 dígitos do cartão forem iguais (Caminho feliz)", () => {
      expect(verificarDigitosIguais("1111-1111-1111-1111")).toBe(true);
    });

    it("deve retornar false se o cartão tiver menos de 16 dígitos (Caminho triste)", () => {
      expect(verificarDigitosIguais("1111-1111")).toBe(false);
    });

    it("deve retornar false se os dígitos forem variados (Caminho triste)", () => {
      expect(verificarDigitosIguais("1234-5678-9012-3456")).toBe(false);
    });
  });

  // 3. Testes para calcularTotalCarrinho
  describe("calcularTotalCarrinho", () => {
    it("deve calcular corretamente a soma total dos itens do carrinho (Caminho feliz)", () => {
      const itensMock = [
        { preco: 50, quantidade: 2 }, // 100
        { preco: 30, quantidade: 1 }, // 30
      ];
      expect(calcularTotalCarrinho(itensMock)).toBe(130);
    });

    it("deve retornar 0 se o carrinho estiver vazio ou receber dados inválidos (Caminho triste)", () => {
      expect(calcularTotalCarrinho([])).toBe(0);
      expect(calcularTotalCarrinho(null)).toBe(0);
    });
  });
});
