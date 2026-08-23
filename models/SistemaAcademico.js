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
        return 0;
    }

    getAnaliticaGeral() {
        const todos = this.listarTodosAlunos();

        if (todos.length === 0) {
            return { melhorAluno: null, piorAluno: null, porTurma: [] };
        }

        const melhorAluno = todos.reduce((melhor, atual) =>
            atual.calcularMedia() > melhor.calcularMedia() ? atual : melhor
        );
        const piorAluno = todos.reduce((pior, atual) =>
            atual.calcularMedia() < pior.calcularMedia() ? atual : pior
        );

        const porTurma = [...this.turmas.values()].map(turma => ({
            turma: turma.nome,
            media: turma.calcularMediaTurma(),
            aprovados: turma.getAprovados().length,
            reprovados: turma.getReprovados().length
        }));

        return { melhorAluno, piorAluno, porTurma };
    }
}

export default SistemaAcademico;
