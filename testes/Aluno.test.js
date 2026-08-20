import Aluno from "../models/Aluno.js";
 
describe("Aluno", () => {
  describe("calcularMedia", () => { 
    test("calcula a média com notas decimais", () => {
      const aluno = new Aluno("Pedro", [7.5, 8.3, 6.2], "3B");
      expect(aluno.calcularMedia()).toBeCloseTo(7.333, 3);
    });
 
    test("retorna NaN quando não há notas (array vazio)", () => {
      const aluno = new Aluno("Ana", [], "3B");
      expect(aluno.calcularMedia()).toBeNaN();
    });
  });
 
  describe("isAprovado", () => {
    test("retorna true quando a média é maior que 7", () => {
      const aluno = new Aluno("João", [8, 8, 8], "3A");
      expect(aluno.isAprovado()).toBe(true);
    });
 
    test("retorna true quando a média é exatamente 7 (limite)", () => {
      const aluno = new Aluno("João", [7, 7, 7], "3A");
      expect(aluno.isAprovado()).toBe(true);
    });
 
    test("retorna false quando a média é menor que 7", () => {
      const aluno = new Aluno("Carlos", [5, 6, 6], "3A");
      expect(aluno.isAprovado()).toBe(false);
    }); 
  });
 
  describe("getStatus", () => {
    test('retorna "Aprovado" quando isAprovado é true', () => {
      const aluno = new Aluno("João", [9, 9, 9], "3A");
      expect(aluno.getStatus()).toBe("Aprovado");
    });
 
    test('retorna "Reprovado" quando isAprovado é false', () => {
      const aluno = new Aluno("Carlos", [3, 4, 5], "3A");
      expect(aluno.getStatus()).toBe("Reprovado");
    });
  });
 
  describe("toString", () => {

    test("formata corretamente as informações do aluno aprovado", () => {
      const aluno = new Aluno("João", [8, 9, 7], "3A");
      const esperado = "João | Turma: 3A | Notas: [8, 9, 7] | Media: 8.00 | Aprovado";
      expect(aluno.toString()).toBe(esperado);
    });
     
      test("formata corretamente as informações do aluno reprovado", () => {
      const aluno = new Aluno("Carlos", [4, 5, 6], "3B");
      const esperado = "Carlos | Turma: 3B | Notas: [4, 5, 6] | Media: 5.00 | Reprovado";
      expect(aluno.toString()).toBe(esperado);
    });
 
  });
});
 
