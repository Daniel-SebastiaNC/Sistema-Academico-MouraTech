const bancoDeDadosAlunos = [
    {
        id: 1,
        nome: "Maria Silva",
        notas: [8, 7, 10],
        turma: "MouraTech Dados"
    },
    {
        id: 2,
        nome: "João Pedro",
        notas: [4, 5, 6],
        turma: "MouraTech Infra"
    },
    {
        id: 3,
        nome: "Lucas Souza",
        notas: [9, 8, 7],
        turma: "MouraTech FullStack"
    }
];

function buscarAluno(id) {
    return new Promise((resolve, reject) => {
     
        setTimeout(() => {
            const alunoEncontrado = bancoDeDadosAlunos.find(aluno => aluno.id === Number(id));

            if (alunoEncontrado) {
                resolve(alunoEncontrado);
            } else {
                reject(new Error(`Aluno com ID ${id} não foi encontrado na base de dados.`));
            }
        }, 1000);
    });
}

function cadastrarAluno(nomeOuAluno, notas, turma) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let nome, notasAluno, turmaAluno;

            if (typeof nomeOuAluno === "object" && nomeOuAluno !== null) {
                nome = nomeOuAluno.nome;
                notasAluno = nomeOuAluno.notas;
                turmaAluno = nomeOuAluno.turma;
            } else {
                nome = nomeOuAluno;
                notasAluno = notas;
                turmaAluno = turma;
            }

            if (!nome || typeof nome !== "string" || nome.trim() === "") {
                reject(new Error("Nome do aluno é obrigatório."));
                return;
            }

            if (!Array.isArray(notasAluno) || notasAluno.length === 0 || notasAluno.some(n => typeof n !== "number" || isNaN(n) || n < 0 || n > 10)) {
                reject(new Error("Notas inválidas! Devem ser números entre 0 e 10."));
                return;
            }

            if (!turmaAluno || typeof turmaAluno !== "string" || turmaAluno.trim() === "") {
                reject(new Error("Turma do aluno é obrigatória."));
                return;
            }

            const novoId = bancoDeDadosAlunos.length > 0
                ? Math.max(...bancoDeDadosAlunos.map(a => a.id)) + 1
                : 1;

            const novoAluno = {
                id: novoId,
                nome: nome.trim(),
                notas: notasAluno,
                turma: turmaAluno.trim()
            };

            bancoDeDadosAlunos.push(novoAluno);
            resolve(novoAluno);
        }, 1000);
    });
}

function analisarTurma(nomeTurma) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!nomeTurma || typeof nomeTurma !== "string" || nomeTurma.trim() === "") {
                reject(new Error("Nome da turma é obrigatório para análise."));
                return;
            }

            const alunosTurma = bancoDeDadosAlunos.filter(
                aluno => aluno.turma.trim().toLowerCase() === nomeTurma.trim().toLowerCase()
            );

            if (alunosTurma.length === 0) {
                reject(new Error(`Nenhum aluno encontrado para a turma "${nomeTurma}".`));
                return;
            }

            const alunosProcessados = alunosTurma.map(aluno => {
                const soma = aluno.notas.reduce((acc, nota) => acc + nota, 0);
                const media = soma / aluno.notas.length;
                const status = media >= 7 ? "Aprovado" : "Reprovado";
                return {
                    id: aluno.id,
                    nome: aluno.nome,
                    notas: aluno.notas,
                    media: Number(media.toFixed(2)),
                    status
                };
            });

            const aprovados = alunosProcessados.filter(aluno => aluno.status === "Aprovado");
            const reprovados = alunosProcessados.filter(aluno => aluno.status === "Reprovado");

            const somaMedias = alunosProcessados.reduce((acc, aluno) => acc + aluno.media, 0);
            const mediaTurma = Number((somaMedias / alunosProcessados.length).toFixed(2));

            resolve({
                turma: nomeTurma,
                totalAlunos: alunosProcessados.length,
                mediaTurma,
                alunos: alunosProcessados,
                aprovados,
                reprovados
            });
        }, 1000);
    });
}

export { buscarAluno, cadastrarAluno, analisarTurma, bancoDeDadosAlunos };
export default buscarAluno;
