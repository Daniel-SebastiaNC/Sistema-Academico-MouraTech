import Aluno from "../models/Aluno.js";
import Turma from "../models/Turma.js";

describe("Turma", () => {
  test("deve adicionar um aluno à turma", () => {
    const turma = new Turma("3A");
    const aluno = new Aluno("João", [8, 8, 8], "3A");
    turma.adicionarAluno(aluno);
    expect(turma.alunos).toHaveLength(1);
  });
  
  });
    test("não deve adicionar o mesmo aluno duas vezes", () => {
    const turma = new Turma("3A");

    const aluno = new Aluno("João", [8, 8, 8], "3A");

    turma.adicionarAluno(aluno);
    turma.adicionarAluno(aluno);

    expect(turma.alunos).toHaveLength(1);
  });

  test("deve calcular a média da turma", () => {
    const turma = new Turma("3A");

    const aluno1 = new Aluno("João", [8, 8, 8], "3A");
    const aluno2 = new Aluno("Maria", [6, 6, 6], "3A");

    turma.adicionarAluno(aluno1);
    turma.adicionarAluno(aluno2);

    expect(turma.calcularMediaTurma()).toBe(7);
});