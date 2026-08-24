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
    if (this.alunos.length === 0) return 0;

    const soma = this.alunos.reduce(
        (acc, aluno) => acc + aluno.calcularMedia(),
        0
    );

    return Math.round((soma / this.alunos.length) * 100) / 100;
}

    getAprovados() {
    return this.alunos
        .filter(aluno => aluno.isAprovado())
        .sort((a, b) => {
            const diferencaMedia = b.calcularMedia() - a.calcularMedia();
            if (diferencaMedia !== 0) return diferencaMedia;
            return a.nome.localeCompare(b.nome);
        });
}

    getReprovados() {
    return this.alunos
        .filter(aluno => !aluno.isAprovado())
        .sort((a, b) => a.calcularMedia() - b.calcularMedia());
    }
}

export default Turma;
