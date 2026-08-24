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