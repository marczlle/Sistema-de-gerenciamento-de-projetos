"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql2/promise");
var readline = require("readline-sync");
// Configuração do banco de dados
var dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'gerenciamento',
    connectTimeout: 30000
};
// Função para conectar ao banco de dados
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mysql.createConnection(dbConfig)];
                case 1:
                    connection = _a.sent();
                    console.log('Conectado ao banco de dados MySQL');
                    return [2 /*return*/, connection];
                case 2:
                    error_1 = _a.sent();
                    console.error('Erro ao conectar ao banco de dados:', error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Classe base (superclasse) Usuario
var Usuario = /** @class */ (function () {
    function Usuario(username, senha, role) {
        this.username = username;
        this.senha = senha;
        this.role = role;
    }
    // Método para verificar autenticação
    Usuario.prototype.autenticar = function (username, senha) {
        return this.username === username && this.senha === senha;
    };
    return Usuario;
}());
// Classe Admin (herda de Usuario)
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(username, senha) {
        return _super.call(this, username, senha, 'admin') || this;
    }
    return Admin;
}(Usuario));
// Classe Funcionario
var Funcionario = /** @class */ (function () {
    function Funcionario(matricula, cpf, nome, cargo, datanascimento) {
        this.matricula = matricula;
        this.cpf = cpf;
        this.nome = nome;
        this.cargo = cargo;
        this.datanascimento = datanascimento;
    }
    return Funcionario;
}());
// Classe Projetos
var Projetos = /** @class */ (function () {
    function Projetos(codigoProjeto, nomeProjeto, dataInicio, situacaoProjeto) {
        this.codigoProjeto = codigoProjeto;
        this.nomeProjeto = nomeProjeto;
        this.dataInicio = dataInicio;
        this.situacaoProjeto = situacaoProjeto;
    }
    return Projetos;
}());
// Classe Alocacao
var Alocacao = /** @class */ (function () {
    function Alocacao(codigoAlocacao, idFuncionario, idProjeto, dataInicioAlocacao) {
        this.codigoAlocacao = codigoAlocacao;
        this.idFuncionario = idFuncionario;
        this.idProjeto = idProjeto;
        this.dataInicioAlocacao = dataInicioAlocacao;
    }
    return Alocacao;
}());
// Funções de Inserção no Banco de Dados
function inserirFuncionario(funcionario) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 7]);
                    return [4 /*yield*/, connection.execute('INSERT INTO funcionarios (matricula, cpf, nome, cargo, datanascimento) VALUES (?, ?, ?, ?, ?)', [funcionario.matricula, funcionario.cpf, funcionario.nome, funcionario.cargo, funcionario.datanascimento])];
                case 3:
                    result = _a.sent();
                    console.log('Funcionário inserido.');
                    return [3 /*break*/, 7];
                case 4:
                    error_2 = _a.sent();
                    console.error('Erro ao inserir funcionário:', error_2);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, connection.end()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function editarFuncionario(matricula) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, novoNome, novoCargo, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, 8, 10]);
                    novoNome = readline.question('Digite o novo nome (ou pressione Enter para não alterar): ');
                    if (!novoNome) return [3 /*break*/, 4];
                    return [4 /*yield*/, connection.execute('UPDATE funcionarios SET nome = ? WHERE matricula = ?', [novoNome, matricula])];
                case 3:
                    _a.sent();
                    console.log('Nome atualizado com sucesso.');
                    _a.label = 4;
                case 4:
                    novoCargo = readline.question('Digite o novo cargo (ou pressione Enter para não alterar): ');
                    if (!novoCargo) return [3 /*break*/, 6];
                    return [4 /*yield*/, connection.execute('UPDATE funcionarios SET cargo = ? WHERE matricula = ?', [novoCargo, matricula])];
                case 5:
                    _a.sent();
                    console.log('Cargo atualizado com sucesso.');
                    _a.label = 6;
                case 6:
                    if (!novoNome && !novoCargo) {
                        console.log('Nenhum dado fornecido para atualizar.');
                    }
                    return [3 /*break*/, 10];
                case 7:
                    error_3 = _a.sent();
                    console.error('Erro ao editar funcionário:', error_3);
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, connection.end()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
//alterações em projetos
function inserirProjeto(projeto) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 7]);
                    return [4 /*yield*/, connection.execute('INSERT INTO projetos (codigoProjeto, nomeProjeto, dataInicio, situacaoProjeto) VALUES (?, ?, ?, ?)', [projeto.codigoProjeto, projeto.nomeProjeto, projeto.dataInicio, projeto.situacaoProjeto])];
                case 3:
                    result = _a.sent();
                    console.log('Projeto inserido.');
                    return [3 /*break*/, 7];
                case 4:
                    error_4 = _a.sent();
                    console.error('Erro ao inserir projeto:', error_4);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, connection.end()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function editarProjetos(codigoProjeto) {
    return __awaiter(this, void 0, void 0, function () {
        var connectionProjetos, novoNomeP, novaSituacaoP, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connectionProjetos = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, 8, 10]);
                    novoNomeP = readline.question('Digite o novo nome do projeto (ou pressione Enter para não alterar): ');
                    if (!novoNomeP) return [3 /*break*/, 4];
                    return [4 /*yield*/, connectionProjetos.execute('UPDATE projetos SET nomeProjeto = ? WHERE codigoProjeto = ?', [novoNomeP, codigoProjeto])];
                case 3:
                    _a.sent();
                    console.log('Nome do projeto atualizado com sucesso.');
                    _a.label = 4;
                case 4:
                    novaSituacaoP = readline.question('Digite o nova situação do projeto (ou pressione Enter para não alterar): ');
                    if (!novaSituacaoP) return [3 /*break*/, 6];
                    return [4 /*yield*/, connectionProjetos.execute('UPDATE projetos SET situacaoProjeto = ? WHERE codigoProjeto = ?', [novaSituacaoP, codigoProjeto])];
                case 5:
                    _a.sent();
                    console.log('Cargo atualizado com sucesso.');
                    _a.label = 6;
                case 6:
                    if (!novoNomeP && !novaSituacaoP) {
                        console.log('Nenhum dado fornecido para atualizar.');
                    }
                    return [3 /*break*/, 10];
                case 7:
                    error_5 = _a.sent();
                    console.error('Erro ao editar funcionário:', error_5);
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, connectionProjetos.end()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function inserirAlocacao(alocacao) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 7]);
                    return [4 /*yield*/, connection.execute('INSERT INTO alocacaoProjetos (codigoAlocacao, id_funcionarioA, id_projetosA, dataInicioAlocacao) VALUES (?, ?, ?, ?)', [alocacao.codigoAlocacao, alocacao.idFuncionario, alocacao.idProjeto, alocacao.dataInicioAlocacao])];
                case 3:
                    result = _a.sent();
                    console.log('Alocação inserida.');
                    return [3 /*break*/, 7];
                case 4:
                    error_6 = _a.sent();
                    console.error('Erro ao inserir alocação:', error_6);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, connection.end()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function editarAlocacoes(codigoAlocacao) {
    return __awaiter(this, void 0, void 0, function () {
        var connectionAlocacoes, novadatainicio, novoIdFuncA, novaIdProjA, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connectionAlocacoes = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 9, 10, 12]);
                    novadatainicio = readline.question('Digite uma nova data de início: ');
                    if (!novadatainicio) return [3 /*break*/, 4];
                    return [4 /*yield*/, connectionAlocacoes.execute('UPDATE alocacaoProjetos SET datainicioAlocacao = ? WHERE codigoAlocacao = ?', [novadatainicio, codigoAlocacao])];
                case 3:
                    _a.sent();
                    console.log('Data de inicio atualizada com sucesso.');
                    _a.label = 4;
                case 4:
                    novoIdFuncA = readline.question('Digite o id do novo funcionário que quer alocar (ou pressione Enter para não alterar): ');
                    if (!novoIdFuncA) return [3 /*break*/, 6];
                    return [4 /*yield*/, connectionAlocacoes.execute('UPDATE alocacaoProjetos SET id_funcionarioA = ? WHERE codigoAlocacao = ?', [novoIdFuncA, codigoAlocacao])];
                case 5:
                    _a.sent();
                    console.log('Nome do projeto atualizado com sucesso.');
                    _a.label = 6;
                case 6:
                    novaIdProjA = readline.question('Digite o id do novo projeto alocado (ou pressione Enter para não alterar): ');
                    if (!novaIdProjA) return [3 /*break*/, 8];
                    return [4 /*yield*/, connectionAlocacoes.execute('UPDATE alocacaoProjetos SET id_projetosA = ? WHERE codigoAlocacao = ?', [novaIdProjA, codigoAlocacao])];
                case 7:
                    _a.sent();
                    console.log('Cargo atualizado com sucesso.');
                    _a.label = 8;
                case 8:
                    if (!novoIdFuncA && !novaIdProjA && !novadatainicio) {
                        console.log('Nenhum dado fornecido para atualizar.');
                    }
                    return [3 /*break*/, 12];
                case 9:
                    error_7 = _a.sent();
                    console.error('Erro ao editar alocação:', error_7);
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, connectionAlocacoes.end()];
                case 11:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
// Função para Listar Alocações
function listarAlocacao() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, rows, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 7]);
                    return [4 /*yield*/, connection.execute('SELECT * FROM alocacaoProjetos')];
                case 3:
                    rows = (_a.sent())[0];
                    console.log('Lista das alocações:');
                    console.table(rows);
                    return [3 /*break*/, 7];
                case 4:
                    error_8 = _a.sent();
                    console.error('Erro ao listar alocações:', error_8);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, connection.end()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function listarFuncionarios() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, rows, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 7]);
                    return [4 /*yield*/, connection.execute('SELECT * FROM funcionarios')];
                case 3:
                    rows = (_a.sent())[0];
                    console.log('Lista das funcionarios:');
                    console.table(rows);
                    return [3 /*break*/, 7];
                case 4:
                    error_9 = _a.sent();
                    console.error('Erro ao listar funcionários:', error_9);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, connection.end()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function listarProjetos() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, rows, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 7]);
                    return [4 /*yield*/, connection.execute('SELECT * FROM projetos')];
                case 3:
                    rows = (_a.sent())[0];
                    console.log('Lista de projetos:');
                    console.table(rows);
                    return [3 /*break*/, 7];
                case 4:
                    error_10 = _a.sent();
                    console.error('Erro ao listar projetos:', error_10);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, connection.end()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function listagemEspecifica(matricula) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, rows, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectToDatabase()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 7]);
                    return [4 /*yield*/, connection.execute('SELECT p.nomeProjeto, p.codigoProjeto, p.datainicio, p.situacaoProjeto FROM funcionarios f INNER JOIN alocacaoProjetos ap ON f.idFuncionario = ap.id_funcionarioA INNER JOIN projetos p ON ap.id_projetosA = p.idProjeto WHERE f.matricula = ?', [matricula])];
                case 3:
                    rows = (_a.sent())[0];
                    console.log('Aqui estão seus projetos: ');
                    console.table(rows);
                    return [3 /*break*/, 7];
                case 4:
                    error_11 = _a.sent();
                    console.error('Erro ao listar seus projetos: ', error_11);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, connection.end()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function separarCargos() {
    return __awaiter(this, void 0, void 0, function () {
        var cargousuario, username, senha;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Você é administrador ou funcionário? \n- Admin \n- Funcionario');
                    cargousuario = readline.question('Digite o seu cargo: ').toLowerCase();
                    if (!(cargousuario === 'admin')) return [3 /*break*/, 5];
                    username = readline.question('Digite o nome de usuário: ');
                    senha = readline.question('Digite a senha: ', { hideEchoBack: true });
                    if (!admin.autenticar(username, senha)) return [3 /*break*/, 2];
                    return [4 /*yield*/, mainAdm()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    console.log('Autenticação falhou. Acesso negado.');
                    return [4 /*yield*/, separarCargos()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!(cargousuario === 'funcionario')) return [3 /*break*/, 7];
                    return [4 /*yield*/, mainFunc()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    console.log('Opção inválida! Tente novamente.');
                    return [4 /*yield*/, separarCargos()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function mainFunc() {
    return __awaiter(this, void 0, void 0, function () {
        var escolhaMenuFunc, matriculaFunc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Você é um funcionário.');
                    console.log('O que você quer fazer? \n1- Consultar meus projetos \n2- Consulta geral de alocações \n3- Sair');
                    escolhaMenuFunc = readline.question('Digite uma opção: ');
                    if (!(escolhaMenuFunc == '1')) return [3 /*break*/, 2];
                    matriculaFunc = readline.question('Digite sua matrícula: ');
                    return [4 /*yield*/, listagemEspecifica(matriculaFunc)];
                case 1:
                    _a.sent();
                    mainFunc();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(escolhaMenuFunc == '2')) return [3 /*break*/, 4];
                    return [4 /*yield*/, listarAlocacao()];
                case 3:
                    _a.sent();
                    mainFunc();
                    return [3 /*break*/, 5];
                case 4:
                    if (escolhaMenuFunc == '3') {
                        console.log('Encerrando sistema...');
                        return [2 /*return*/];
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Exemplo de criação de um Admin específico (programador cria)
var admin = new Admin('admin', '1234');
// Função principal do menu caso seja adm
function mainAdm() {
    return __awaiter(this, void 0, void 0, function () {
        var escolha, escolhaAfuncionarios, funcionarioDigitado, escolhafunc2, funcionarioDigitado_1, escolhafunc2, funcionarioEditado, escolhaedicao, funcionarioEditado_1, escolhaedicao, escolhaBprojetos, projetosDigitados, escolhaprojetos, projetosDigitados_1, escolhaprojetos, projetoEditado, escolhaedicaoprojetos, funcionarioEditado, escolhaedicaoprojetos, alocacaoProjeto, escolhaalocacao, alocacaoProjeto_1, escolhaalocacao, alocacaoEditada, escolhaedicaoalocacao, alocacaoEditada_1, escolhaCconsultas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Bem-vindo ao sistema de gerenciamento!');
                    console.log('O que você quer fazer? \n1- Ajustes em funcionários \n2- Ajustes em projetos e alocações \n3- Consultas \n4- Sair');
                    escolha = readline.question('Digite uma opção: ');
                    if (!(escolha == '1')) return [3 /*break*/, 12];
                    console.log('O que quer fazer? \n1- Adicionar funcionario \n2- Editar funcionário \n3- Retornar');
                    escolhaAfuncionarios = readline.question('Opção: ');
                    if (!(escolhaAfuncionarios == '1')) return [3 /*break*/, 5];
                    funcionarioDigitado = new Funcionario(readline.question('Digite uma matrícula para o funcionário: '), readline.question('CPF: '), readline.question('Nome: '), readline.question('Cargo: '), readline.question('Data de nascimento: '));
                    return [4 /*yield*/, inserirFuncionario(funcionarioDigitado)];
                case 1:
                    _a.sent();
                    escolhafunc2 = readline.question('Quer adicionar mais algum funcionário? (y/n): ');
                    _a.label = 2;
                case 2:
                    if (!(escolhafunc2 == 'y')) return [3 /*break*/, 4];
                    funcionarioDigitado_1 = new Funcionario(readline.question('Digite uma matrícula para o funcionário: '), readline.question('CPF: '), readline.question('Nome: '), readline.question('Cargo: '), readline.question('Data de nascimento: '));
                    return [4 /*yield*/, inserirFuncionario(funcionarioDigitado_1)];
                case 3:
                    _a.sent();
                    escolhafunc2 = readline.question('Quer adicionar mais algum funcionário? (y/n): ');
                    return [3 /*break*/, 2];
                case 4:
                    mainAdm();
                    return [3 /*break*/, 11];
                case 5:
                    if (!(escolhaAfuncionarios == '2')) return [3 /*break*/, 10];
                    funcionarioEditado = readline.question('Digite a matrícula do funcionário que você quer editar: ');
                    return [4 /*yield*/, editarFuncionario(funcionarioEditado)];
                case 6:
                    _a.sent();
                    escolhaedicao = readline.question('Quer editar mais algum funcionário? (y/n): ');
                    _a.label = 7;
                case 7:
                    if (!(escolhaedicao == 'y')) return [3 /*break*/, 9];
                    funcionarioEditado_1 = readline.question('Digite a matrícula do funcionário que você quer editar: ');
                    return [4 /*yield*/, editarFuncionario(funcionarioEditado_1)];
                case 8:
                    _a.sent();
                    escolhaedicao = readline.question('Quer editar mais algum funcionário? (y/n): ');
                    return [3 /*break*/, 7];
                case 9:
                    mainAdm();
                    return [3 /*break*/, 11];
                case 10:
                    if (escolhaAfuncionarios == '3') {
                        mainAdm();
                    }
                    else {
                        console.log('Opção inválida! Tente novamente.');
                        mainAdm();
                    }
                    _a.label = 11;
                case 11: return [3 /*break*/, 41];
                case 12:
                    if (!(escolha == '2')) return [3 /*break*/, 34];
                    console.log('O que você quer fazer? \n1- Adicionar projeto \n2- Editar projeto \n3- Alocar projeto \n4- Editar alocação \n5- Retornar');
                    escolhaBprojetos = readline.question('Opção: ');
                    if (!(escolhaBprojetos == '1')) return [3 /*break*/, 17];
                    projetosDigitados = new Projetos(readline.question('Código do Projeto: '), readline.question('Digite o nome do novo projeto: '), readline.question('Digite a data de início (YYYY-MM-DD): '), readline.question('Qual a situação do projeto? '));
                    return [4 /*yield*/, inserirProjeto(projetosDigitados)];
                case 13:
                    _a.sent();
                    escolhaprojetos = readline.question('Quer adicionar mais alguem projeto? (y/n): ');
                    _a.label = 14;
                case 14:
                    if (!(escolhaprojetos == 'y')) return [3 /*break*/, 16];
                    projetosDigitados_1 = new Projetos(readline.question('Código do Projeto: '), readline.question('Digite o nome do novo projeto: '), readline.question('Digite a data de início (YYYY-MM-DD): '), readline.question('Qual a situação do projeto? '));
                    return [4 /*yield*/, inserirProjeto(projetosDigitados_1)];
                case 15:
                    _a.sent();
                    escolhaprojetos = readline.question('Quer adicionar mais alguem projeto? (y/n): ');
                    return [3 /*break*/, 14];
                case 16:
                    mainAdm();
                    return [3 /*break*/, 33];
                case 17:
                    if (!(escolhaBprojetos == '2')) return [3 /*break*/, 22];
                    projetoEditado = readline.question('Digite o código do projeto que você quer editar: ');
                    return [4 /*yield*/, editarProjetos(projetoEditado)];
                case 18:
                    _a.sent();
                    escolhaedicaoprojetos = readline.question('Quer editar mais algum projeto? (y/n): ');
                    _a.label = 19;
                case 19:
                    if (!(escolhaedicaoprojetos == 'y')) return [3 /*break*/, 21];
                    funcionarioEditado = readline.question('Digite a matrícula do funcionário que você quer editar: ');
                    return [4 /*yield*/, editarFuncionario(funcionarioEditado)];
                case 20:
                    _a.sent();
                    escolhaedicaoprojetos = readline.question('Quer editar mais algum projeto? (y/n): ');
                    return [3 /*break*/, 19];
                case 21:
                    mainAdm();
                    return [3 /*break*/, 33];
                case 22:
                    if (!(escolhaBprojetos == '3')) return [3 /*break*/, 27];
                    alocacaoProjeto = new Alocacao(readline.question('Digite um código para a alocação: '), readline.questionInt('Digite o id de qual funcionário você quer alocar: '), readline.questionInt('Digite o id do projeto: '), readline.question('Digite a data de início (YYYY-MM-DD): '));
                    return [4 /*yield*/, inserirAlocacao(alocacaoProjeto)];
                case 23:
                    _a.sent();
                    escolhaalocacao = readline.question('Quer fazer mais alguma alocação? (y/n): ');
                    _a.label = 24;
                case 24:
                    if (!(escolhaalocacao == 'y')) return [3 /*break*/, 26];
                    alocacaoProjeto_1 = new Alocacao(readline.question('Digite um código para a alocação: '), readline.questionInt('Digite o id de qual funcionário você quer alocar: '), readline.questionInt('Digite o id do projeto: '), readline.question('Digite a data de início (YYYY-MM-DD): '));
                    return [4 /*yield*/, inserirAlocacao(alocacaoProjeto_1)];
                case 25:
                    _a.sent();
                    escolhaalocacao = readline.question('Quer fazer mais alguma alocação? (y/n): ');
                    return [3 /*break*/, 24];
                case 26:
                    mainAdm();
                    return [3 /*break*/, 33];
                case 27:
                    if (!(escolhaBprojetos == '4')) return [3 /*break*/, 32];
                    alocacaoEditada = readline.question('Digite o código da alocação você quer editar: ');
                    return [4 /*yield*/, editarAlocacoes(alocacaoEditada)];
                case 28:
                    _a.sent();
                    escolhaedicaoalocacao = readline.question('Quer editar mais alguma alocação? (y/n): ');
                    _a.label = 29;
                case 29:
                    if (!(escolhaedicaoalocacao == 'y')) return [3 /*break*/, 31];
                    alocacaoEditada_1 = readline.question('Digite o código da alocação que você quer editar?');
                    return [4 /*yield*/, editarAlocacoes(alocacaoEditada_1)];
                case 30:
                    _a.sent();
                    return [3 /*break*/, 29];
                case 31:
                    mainAdm();
                    return [3 /*break*/, 33];
                case 32:
                    if (escolhaBprojetos == '5') {
                        mainAdm();
                    }
                    else {
                        console.log('Opção inválida! Tente novamente.');
                        mainAdm();
                    }
                    _a.label = 33;
                case 33: return [3 /*break*/, 41];
                case 34:
                    if (!(escolha == '3')) return [3 /*break*/, 41];
                    console.log('O que quer consultar? \n1- Consultar funcionários \n2- Consultar Projetos \n3- Consulta geral de alocações \n4- Retornar');
                    escolhaCconsultas = readline.question('Opção: ');
                    if (!(escolhaCconsultas == '1')) return [3 /*break*/, 36];
                    console.log('Consultando...');
                    return [4 /*yield*/, listarFuncionarios()];
                case 35:
                    _a.sent();
                    mainAdm();
                    return [3 /*break*/, 41];
                case 36:
                    if (!(escolhaCconsultas == '2')) return [3 /*break*/, 38];
                    console.log('Consultando...');
                    return [4 /*yield*/, listarProjetos()];
                case 37:
                    _a.sent();
                    mainAdm();
                    return [3 /*break*/, 41];
                case 38:
                    if (!(escolhaCconsultas == '3')) return [3 /*break*/, 40];
                    return [4 /*yield*/, listarAlocacao()];
                case 39:
                    _a.sent();
                    mainAdm();
                    return [3 /*break*/, 41];
                case 40:
                    if (escolhaCconsultas == '4') {
                        console.log('Retornando...');
                        mainAdm();
                    }
                    else {
                        console.log('Opção inválida! Tente novamente.');
                        mainAdm();
                    }
                    _a.label = 41;
                case 41: return [2 /*return*/];
            }
        });
    });
}
separarCargos().catch(console.error);
