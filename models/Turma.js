class Turma {
    constructor(nome) {
        this.nome = nome;
        this.alunos = [];
    }

    adicionarAluno(aluno) {
    if (!this.alunos.includes(aluno)) {
        this.alunos.push(aluno);
    }
}

    calcularMediaTurma() {
    }

    getAprovados() {
        return this.alunos.filter(aluno => aluno.isAprovado());
    }

    getReprovados() {
        return this.alunos.filter(aluno => !aluno.isAprovado());
    }
}

export default Turma;
