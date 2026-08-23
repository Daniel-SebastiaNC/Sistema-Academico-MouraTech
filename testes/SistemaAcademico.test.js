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

        test("deve calcular estatísticas por turma corretamente" , () => {
            sistema.cadastrarAluno("João", [8, 7, 9], "Turma A");   // média 8   -> aprovado
            sistema.cadastrarAluno("Maria", [4, 5, 3], "Turma A");  // média 4   -> reprovado
            sistema.cadastrarAluno("Pedro", [10, 10, 10], "Turma B"); // média 10 -> aprovado
            sistema.cadastrarAluno("Ana", [6, 6, 6], "Turma B");    // média 6   -> reprovado
        
            const { porTurma } = sistema.getAnaliticaGeral();
        
            const turmaA = porTurma.find(t => t.turma === "Turma A");
            const turmaB = porTurma.find(t => t.turma === "Turma B");
        
            expect(turmaA).toEqual({
                turma: "Turma A",
                media: 6, // (8 + 4) / 2
                aprovados: 1,
                reprovados: 1
            });
        
            expect(turmaB).toEqual({
                turma: "Turma B",
                media: 8, // (10 + 6) / 2
                aprovados: 1,
                reprovados: 1
            });
        });

        test("deve considerar aluno com média exatamente 7 como aprovado (limite mínimo)" , () => {
            sistema.cadastrarAluno("Carlos", [7, 7, 7], "Turma A");
 
            const { porTurma } = sistema.getAnaliticaGeral();
        
            expect(porTurma[0].aprovados).toBe(1);
            expect(porTurma[0].reprovados).toBe(0);
        });

        test("deve identificar corretamente o melhor e o pior aluno" , () => {
             sistema.cadastrarAluno("João", [8, 7, 9], "Turma A");   // média 8
            sistema.cadastrarAluno("Maria", [4, 5, 3], "Turma A");  // média 4
            sistema.cadastrarAluno("Pedro", [10, 10, 10], "Turma B"); // média 10
        
            const { melhorAluno, piorAluno } = sistema.getAnaliticaGeral();
        
            expect(melhorAluno.nome).toBe("Pedro");
            expect(piorAluno.nome).toBe("Maria");
        });
    });
});