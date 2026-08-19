class Aluno {
    constructor(nome, notas, turma) {
        this.nome = nome;
        this.notas = notas;
        this.turma = turma;
    }

    calcularMedia() {
         return 0;
    }

    isAprovado() {
        return this.calcularMedia() >= 7;
    }

    getStatus() {
        return this.isAprovado() ? "Aprovado" : "Reprovado";
    }

    toString() {
        return `${this.nome} | Turma: ${this.turma} | Notas: [${this.notas.join(", ")}] | Media: ${this.calcularMedia().toFixed(2)} | ${this.getStatus()}`;
    }
}

export default Aluno;
