import Aluno from "../models/Aluno";
 
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
  });
  }); 
 
