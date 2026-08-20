const mediaMinimaAprovacao = 7;
class Aluno {
    constructor(nome, notas, turma) {
        this.nome = nome;
        this.notas = notas;
        this.turma = turma;
    }

    calcularMedia() {
         const soma = this.notas.reduce((acc, nota) => acc + nota, 0);
        return soma / this.notas.length;
    }

    isAprovado() {
        return this.calcularMedia() >= mediaMinimaAprovacao;
    }

    getStatus() {
        return this.isAprovado() ? "Aprovado" : "Reprovado";
    }

   toString() {
    const notasFormatadas = this.notas.join(", ");
    const mediaFormatada = this.calcularMedia().toFixed(2);
    const status = this.getStatus();

    return 0;
}
}

export default Aluno;
