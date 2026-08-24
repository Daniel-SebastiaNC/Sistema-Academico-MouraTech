import Aluno from "../models/Aluno.js";
import Turma from "../models/Turma.js";

describe("Turma", () => {

    test("deve adicionar um aluno à turma", () => {
        const turma = new Turma("3A");
        const aluno = new Aluno("João", [8, 8, 8], "3A");

        turma.adicionarAluno(aluno);

        expect(turma.alunos).toHaveLength(1);
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
    
    test("deve retornar a média da turma arredondada com 2 casas decimais", () => {
    const turma = new Turma("3A");

    const aluno1 = new Aluno("João", [8, 8, 7], "3A");
    const aluno2 = new Aluno("Maria", [6, 6, 5], "3A");

    turma.adicionarAluno(aluno1);
    turma.adicionarAluno(aluno2);

    expect(turma.calcularMediaTurma()).toBe(6.67);
  });

    test("getAprovados deve retornar os aprovados ordenados por média (maior para menor)", () => {
    const turma = new Turma("3A");

    const aluno1 = new Aluno("João", [8, 8, 9], "3A");
    const aluno2 = new Aluno("Maria", [9, 9, 9], "3A");  
    const aluno3 = new Aluno("Pedro", [8, 8, 8], "3A");  

    turma.adicionarAluno(aluno1);
    turma.adicionarAluno(aluno2);
    turma.adicionarAluno(aluno3);

    const aprovados = turma.getAprovados();

    expect(aprovados).toEqual([aluno2, aluno1, aluno3]);
  });

  test("getAprovados deve desempatar por nome quando as médias forem iguais", () => {
    const turma = new Turma("3A");

    const aluno1 = new Aluno("Zeca", [8, 8, 8], "3A");  // média 8
    const aluno2 = new Aluno("Ana", [8, 8, 8], "3A");    // média 8, vai igualar Zeca

    turma.adicionarAluno(aluno1);
    turma.adicionarAluno(aluno2);

    const aprovados = turma.getAprovados();

    expect(aprovados).toEqual([aluno2, aluno1]); //aqui Ana é pra ser antes de Zeca, por ordem alfabética
  });

  test("getReprovados deve retornar apenas os alunos reprovados", () => {
    const turma = new Turma("3A");

    const aprovado = new Aluno("João", [8, 8, 8], "3A");
    const reprovado = new Aluno("Maria", [4, 4, 4], "3A");

    turma.adicionarAluno(aprovado);
    turma.adicionarAluno(reprovado);

    const reprovados = turma.getReprovados();

    expect(reprovados).toHaveLength(1);
    expect(reprovados).toContain(reprovado);
  });
});