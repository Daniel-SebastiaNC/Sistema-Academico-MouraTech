const SistemaAcademico = require("./models/SistemaAcademico");
const { menu } = require("./modules/menu");

const sistema = new SistemaAcademico();

sistema.cadastrarAluno("Maria", [8, 7, 10], "MouraTech Dados");
sistema.cadastrarAluno("João", [4, 5, 6], "MouraTech Dados");
sistema.cadastrarAluno("Lucas", [9, 8, 7], "MouraTech Dados");

sistema.cadastrarAluno("Pedro", [9, 10, 10], "MouraTech Infra");
sistema.cadastrarAluno("Ana", [6, 5, 7], "MouraTech Infra");
sistema.cadastrarAluno("Carlos", [10, 10, 9], "MouraTech Infra");

sistema.cadastrarAluno("Abner", [10, 9, 8], "MouraTech FullStack");
sistema.cadastrarAluno("Pedro", [3, 4, 5], "MouraTech FullStack");
sistema.cadastrarAluno("Caio", [7, 8, 6], "MouraTech FullStack");

menu(sistema);
