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
  }); 
});
 
