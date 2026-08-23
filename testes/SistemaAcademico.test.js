import SistemaAcademico from "../models/SistemaAcademico";

describe("SistemaAcademico", () => {

    describe("Cadastrar Aluno", () => {
        test("deve criar uma nova turma automaticamente ao cadastrar o primeiro aluno", () => {
            var sistema = new SistemaAcademico();
            sistema.cadastrarAluno("João", [8, 7, 9], "Turma A");
 
            const turma = sistema.getTurma("Turma A");
            expect(turma).toBeDefined();
            expect(turma.nome).toBe("Turma A");
            expect(turma.alunos).toHaveLength(1);
        });

        test("deve reutilizar a turma existente ao cadastrar mais de um aluno na mesma turma", () => {
            var sistema = new SistemaAcademico();
            sistema.cadastrarAluno("João", [8, 7, 9], "Turma A");
            sistema.cadastrarAluno("Maria", [6, 5, 7], "Turma A");
        
            const turma = sistema.getTurma("Turma A");
            expect(turma.alunos).toHaveLength(2);
        });
        
    });

});