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

        test("deve listar alunos de múltiplas turmas em um único array" , () => {
            sistema.cadastrarAluno("João", [8, 7, 9], "Turma A");
            sistema.cadastrarAluno("Maria", [6, 5, 7], "Turma B");
            sistema.cadastrarAluno("Pedro", [10, 10, 10], "Turma A");
        
            const todos = sistema.listarTodosAlunos();
        
            expect(todos).toHaveLength(3);
            expect(todos.map(a => a.nome)).toEqual(
                expect.arrayContaining(["João", "Maria", "Pedro"])
            );
        });
    });

    describe("getAnaliticaGeral", () => {
        test("deve retornar valores nulos/vazios quando não há alunos" , () => {
            const resultado = sistema.getAnaliticaGeral();
 
            expect(resultado).toEqual({
                melhorAluno: null,
                piorAluno: null,
                porTurma: []
            });
        });
    });
});