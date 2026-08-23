import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (str) => new Promise(resolve => rl.question(str, resolve));

const TURMAS = {
    1: "MouraTech Dados",
    2: "MouraTech Infra",
    3: "MouraTech FullStack"
};

async function pedirNome() {
    let nome = await question("  Digite o nome do aluno: ");
    return nome.trim();
}

async function pedirNotas() {
    const notasAluno = [];

    for (let i = 1; i <= 3; i++) {
        let nota = parseFloat(await question(`  Digite a ${i}ª nota: `));
        while (isNaN(nota) || nota < 0 || nota > 10) {
            console.log("  [!] Nota invalida! Digite um valor entre 0 e 10.");
            nota = parseFloat(await question(`  Digite a ${i}ª nota: `));
        }
        notasAluno.push(nota);
    }

    return notasAluno;
}

async function pedirTurma() {
    while (true) {
        console.log("\n  Opções de Turma:");
        console.log("  1 - MouraTech Dados");
        console.log("  2 - MouraTech Infra");
        console.log("  3 - MouraTech FullStack");

        let opcao = parseInt(await question("  Escolha a turma (1, 2 ou 3): "));

        if (TURMAS[opcao]) {
            return TURMAS[opcao];
        } else {
            console.log("\n  [!] Opcao invalida! Tente novamente.");
        }
    }
}

async function aguardarContinuar() {
    await question("\n  Pressione Enter para continuar...");
}

async function menu(sistema) {
    let opcao = 0;

    while (opcao !== 5) {
        console.clear();
        console.log(`${"=".repeat(50)}`);
        console.log(`   SISTEMA DE ANALISE DE NOTAS`);
        console.log(`${"=".repeat(50)}`);
        console.log(`   1 - Cadastrar Aluno`);
        console.log(`   2 - Analisar Turma`);
        console.log(`   3 - Ver Analitica Geral`);
        console.log(`   4 - Listar Todos os Alunos`);
        console.log(`   5 - Sair`);
        console.log(`${"=".repeat(50)}`);

        let resposta = await question("  Escolha uma opção: ");
        opcao = parseInt(resposta);

        switch (opcao) {
            case 1:
                await menuCadastrar(sistema);
                break;

            case 2:
                await menuAnalisarTurma(sistema);
                break;

            case 3:
                console.clear();
                exibirAnalitica(sistema);
                await aguardarContinuar();
                break;

            case 4:
                await menuListarAlunos(sistema);
                break;

            case 5:
                console.clear();
                console.log(`\n${"=".repeat(50)}`);
                console.log(`   Encerrando programa... Ate logo!`);
                console.log(`${"=".repeat(50)}\n`);
                rl.close();
                break;

            default:
                console.log("\n  [!] Opcao invalida! Tente novamente.");
                await aguardarContinuar();
        }
    }
}

async function menuCadastrar(sistema) {
    console.clear();
    console.log(`\n${"-".repeat(40)}`);
    console.log(`   CADASTRAR ALUNO`);
    console.log(`${"-".repeat(40)}\n`);

    let nome = await pedirNome();
    let notas = await pedirNotas();
    let turma = await pedirTurma();

    sistema.cadastrarAluno(nome, notas, turma);

    console.log(`\n  [+] Aluno "${nome}" cadastrado com sucesso!`);
    await aguardarContinuar();
}

async function menuAnalisarTurma(sistema) {
    console.clear();
    console.log(`\n${"-".repeat(40)}`);
    console.log(`   ANALISAR TURMA`);
    console.log(`${"-".repeat(40)}`);
    console.log("  1 - MouraTech Dados");
    console.log("  2 - MouraTech Infra");
    console.log("  3 - MouraTech FullStack");

    let escolha = parseInt(await question("  Escolha a turma (1, 2 ou 3): "));
    let nomeTurma = TURMAS[escolha];

    if (nomeTurma) {
        exibirAnaliseTurma(sistema, nomeTurma);
    } else {
        console.log("\n  [!] Turma invalida!");
    }
    await aguardarContinuar();
}

function exibirAnaliseTurma(sistema, nomeTurma) {
    const turma = sistema.getTurma(nomeTurma);

    console.log(`\n${"=".repeat(45)}`);
    console.log(`   ANALISE DA TURMA: ${nomeTurma}`);
    console.log(`${"=".repeat(45)}`);

    if (!turma || turma.alunos.length === 0) {
        console.log("\n  Nenhum aluno cadastrado nesta turma.");
    } else {
        for (const aluno of turma.alunos) {
            console.log(`  - ${aluno.nome} | Media: ${aluno.calcularMedia().toFixed(2)} | ${aluno.getStatus()}`);
        }
        console.log(`${"-".repeat(45)}`);
        console.log(`  Aprovados:  ${turma.getAprovados().length}`);
        console.log(`  Reprovados: ${turma.getReprovados().length}`);
    }

    console.log(`${"=".repeat(45)}\n`);
}

function exibirAnalitica(sistema) {
    const { melhorAluno, piorAluno, porTurma } = sistema.getAnaliticaGeral();

    if (!melhorAluno) {
        console.log("\n  Nenhum aluno cadastrado para gerar analitica.\n");
        return;
    }

    console.log(`\n${"=".repeat(50)}`);
    console.log(`   ANALITICA GERAL`);
    console.log(`${"=".repeat(50)}`);

    console.log(`\n  Maior Media:`);
    console.log(`     ${melhorAluno.nome} - ${melhorAluno.calcularMedia().toFixed(2)}`);

    console.log(`\n  Menor Media:`);
    console.log(`     ${piorAluno.nome} - ${piorAluno.calcularMedia().toFixed(2)}`);

    console.log(`\n${"-".repeat(50)}`);
    console.log(`   RESUMO POR TURMA`);
    console.log(`${"-".repeat(50)}`);

    for (const { turma, media, aprovados, reprovados } of porTurma) {
        console.log(`\n  Turma: ${turma}`);
        console.log(`     Media Geral:  ${media.toFixed(2)}`);
        console.log(`     Aprovados:  ${aprovados}`);
        console.log(`     Reprovados: ${reprovados}`);
        console.log(`     ${"-".repeat(30)}`);
    }

    console.log(`\n${"=".repeat(50)}\n`);
}

async function menuListarAlunos(sistema) {
    console.clear();
    console.log(`\n${"-".repeat(50)}`);
    console.log(`   TODOS OS ALUNOS CADASTRADOS`);
    console.log(`${"-".repeat(50)}`);

    const alunos = sistema.listarTodosAlunos();

    if (alunos.length === 0) {
        console.log("\n  Nenhum aluno cadastrado.");
    } else {
        for (const aluno of alunos) {
            console.log(`  - ${aluno.toString()}`);
        }
    }

    console.log(`${"-".repeat(50)}\n`);
    await aguardarContinuar();
}

export{ menu };
