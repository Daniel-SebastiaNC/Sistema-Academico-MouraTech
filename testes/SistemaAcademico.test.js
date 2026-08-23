import SistemaAcademico from "../models/SistemaAcademico";
import Turma from "../models/Turma";

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
        
    });

});