import Aluno from "../models/Aluno";
 
describe("Aluno", () => {
  describe("calcularMedia", () => { 
      test("retorna NaN quando não há notas (array vazio)", () => {
      const aluno = new Aluno("Ana", [], "3B");
      expect(aluno.calcularMedia()).toBeNaN();
    });
  }); 
});
 
