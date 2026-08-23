import SistemaAcademico from "../models/SistemaAcademico";

describe("SistemaAcademico", () => {

    let sistema;
 
    beforeEach(() => {
        sistema = new SistemaAcademico();
    });

    describe("cadastrar Aluno", () => {
        test("deve criar uma nova turma automaticamente ao cadastrar o primeiro aluno", () => {
            sistema.cadastrarAluno("João", [8, 7, 9], "Turma A");
 
            const turma = sistema.getTurma("Turma A");
            expect(turma).toBeDefined();
            expect(turma.nome).toBe("Turma A");
            expect(turma.alunos).toHaveLength(1);
        });

        test("deve reutilizar a turma existente ao cadastrar mais de um aluno na mesma turma", () => {
            sistema.cadastrarAluno("João", [8, 7, 9], "Turma A");
            sistema.cadastrarAluno("Maria", [6, 5, 7], "Turma A");
        
            const turma = sistema.getTurma("Turma A");
            expect(turma.alunos).toHaveLength(2);
        });
    });

    describe("getTurma", () => {
        test("deve retornar undefined para uma turma inexistente" , () => {
            expect(sistema.getTurma("Turma Inexistente")).toBeUndefined();
        });

        test("deve retornar Turma para uma turma existente", () => {
            sistema.cadastrarAluno("João", [8, 7, 9], "Turma A");
            const turma = sistema.getTurma("Turma A");
            expect(turma).toBeDefined();
            expect(turma.nome).toBe("Turma A");
            expect(turma.alunos).toHaveLength(1);
        });
    });

    describe("listarTodosAlunos", () => {
        test("deve retornar array vazio quando não há alunos cadastrados" , () => {
            expect(sistema.listarTodosAlunos()).toEqual([]);
        });
    });

});