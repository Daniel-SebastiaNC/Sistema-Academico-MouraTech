import Aluno from "./Aluno.js";
import Turma from "./Turma.js";

class SistemaAcademico {
    constructor() {
        this.turmas = new Map();
    }

    cadastrarAluno(nome, notas, nomeTurma) {
        if (!this.turmas.has(nomeTurma)) {
            this.turmas.set(nomeTurma, new Turma(nomeTurma));
        }

        const aluno = new Aluno(nome, notas, nomeTurma);
        this.turmas.get(nomeTurma).adicionarAluno(aluno);
        return aluno;
    }

    getTurma(nomeTurma) {
        return this.turmas.get(nomeTurma);
    }

    listarTodosAlunos() {
        return [...this.turmas.values()].flatMap(turma => turma.alunos);
    }

    getAnaliticaGeral() {
        return { melhorAluno: null, piorAluno: null, porTurma: [] };
    }
}

export default SistemaAcademico;
