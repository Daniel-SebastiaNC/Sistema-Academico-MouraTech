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

export { buscarAluno, bancoDeDadosAlunos };
export default buscarAluno;
