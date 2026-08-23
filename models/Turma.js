class Turma {
    constructor(nome) {
        this.nome = nome;
        this.alunos = [];
    }

    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }

    calcularMediaTurma() {
        if (this.alunos.length === 0) return 0;
        const soma = this.alunos.reduce((acc, aluno) => acc + aluno.calcularMedia(), 0);
        return soma / this.alunos.length;
    }

    getAprovados() {
        return this.alunos.filter(aluno => aluno.isAprovado());
    }

    getReprovados() {
        return this.alunos.filter(aluno => !aluno.isAprovado());
    }
}

export default Turma;
