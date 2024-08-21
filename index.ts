import * as mysql from 'mysql2/promise';
import * as readline from 'readline-sync';

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'gerenciamento',
    connectTimeout: 30000
};

// Função para conectar ao banco de dados
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao banco de dados MySQL');
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
}

// Classe base (superclasse) Usuario
class Usuario {
    username: string;
    senha: string;
    role: string;

    constructor(username: string, senha: string, role: string) {
        this.username = username;
        this.senha = senha;
        this.role = role;
    }

    // Método para verificar autenticação
    autenticar(username: string, senha: string): boolean {
        return this.username === username && this.senha === senha;
    }
}

// Classe Admin (herda de Usuario)
class Admin extends Usuario {
    constructor(username: string, senha: string) {
        super(username, senha, 'admin');
    }
}

// Classe Funcionario
class Funcionario {
    matricula: string;
    cpf: string;
    nome: string;
    cargo: string;
    datanascimento: string

    constructor(matricula: string, cpf: string, nome: string, cargo: string, datanascimento: string) {
        this.matricula = matricula;
        this.cpf = cpf;
        this.nome = nome;
        this.cargo = cargo;
        this.datanascimento = datanascimento;
    }
}

// Classe Projetos
class Projetos {
    codigoProjeto: string;
    nomeProjeto: string;
    dataInicio: string;
    situacaoProjeto: string;

    constructor(codigoProjeto: string, nomeProjeto: string, dataInicio: string, situacaoProjeto: string) {
        this.codigoProjeto = codigoProjeto;
        this.nomeProjeto = nomeProjeto;
        this.dataInicio = dataInicio;
        this.situacaoProjeto = situacaoProjeto;
    }
}

// Classe Alocacao
class Alocacao {
    codigoAlocacao:string
    idFuncionario: number;
    idProjeto: number;
    dataInicioAlocacao: string;

    constructor(codigoAlocacao: string, idFuncionario: number, idProjeto: number, dataInicioAlocacao: string) {
        this.codigoAlocacao = codigoAlocacao;
        this.idFuncionario = idFuncionario;
        this.idProjeto = idProjeto;
        this.dataInicioAlocacao = dataInicioAlocacao;
    }
}

// Funções de Inserção no Banco de Dados
async function inserirFuncionario(funcionario: Funcionario) {
    const connection = await connectToDatabase();
    try {
        const result = await connection.execute(
            'INSERT INTO funcionarios (matricula, cpf, nome, cargo, datanascimento) VALUES (?, ?, ?, ?, ?)',
            [funcionario.matricula, funcionario.cpf, funcionario.nome, funcionario.cargo, funcionario.datanascimento]
        );
        console.log('Funcionário inserido.');
    } catch (error) {
        console.error('Erro ao inserir funcionário:', error);
    } finally {
        await connection.end();
    }
}

async function editarFuncionario(matricula: string) {
    const connection = await connectToDatabase();
    try {
        const novoNome = readline.question('Digite o novo nome (ou pressione Enter para não alterar): ');
        if (novoNome) {
            await connection.execute(
                'UPDATE funcionarios SET nome = ? WHERE matricula = ?',
                [novoNome, matricula]
            );
            console.log('Nome atualizado com sucesso.');
        }

        const novoCargo = readline.question('Digite o novo cargo (ou pressione Enter para não alterar): ');
        if (novoCargo) {
            await connection.execute(
                'UPDATE funcionarios SET cargo = ? WHERE matricula = ?',
                [novoCargo, matricula]
            );
            console.log('Cargo atualizado com sucesso.');
        }

        if (!novoNome && !novoCargo) {
            console.log('Nenhum dado fornecido para atualizar.');
        }
    } catch (error) {
        console.error('Erro ao editar funcionário:', error);
    } finally {
        await connection.end();
    }
}

//alterações em projetos

async function inserirProjeto(projeto: Projetos) {
    const connection = await connectToDatabase();
    try {
        const result = await connection.execute(
            'INSERT INTO projetos (codigoProjeto, nomeProjeto, dataInicio, situacaoProjeto) VALUES (?, ?, ?, ?)',
            [projeto.codigoProjeto, projeto.nomeProjeto, projeto.dataInicio, projeto.situacaoProjeto]
        );
        console.log('Projeto inserido.');
    } catch (error) {
        console.error('Erro ao inserir projeto:', error);
    } finally {
        await connection.end()
    }
}


async function editarProjetos(codigoProjeto: string) {
    const connectionProjetos = await connectToDatabase();
    try {
        const novoNomeP = readline.question('Digite o novo nome do projeto (ou pressione Enter para não alterar): ');
        if (novoNomeP) {
            await connectionProjetos.execute(
                'UPDATE projetos SET nomeProjeto = ? WHERE codigoProjeto = ?',
                [novoNomeP, codigoProjeto]
            );
            console.log('Nome do projeto atualizado com sucesso.');
        }

        const novaSituacaoP = readline.question('Digite o nova situação do projeto (ou pressione Enter para não alterar): ');
        if (novaSituacaoP) {
            await connectionProjetos.execute(
                'UPDATE projetos SET situacaoProjeto = ? WHERE codigoProjeto = ?',
                [novaSituacaoP, codigoProjeto]
            );
            console.log('Cargo atualizado com sucesso.');
        }

        if (!novoNomeP && !novaSituacaoP) {
            console.log('Nenhum dado fornecido para atualizar.');
        }
    } catch (error) {
        console.error('Erro ao editar funcionário:', error);
    } finally {
        await connectionProjetos.end();
    }
}

async function inserirAlocacao(alocacao: Alocacao) {
    const connection = await connectToDatabase();
    try {
        const result = await connection.execute(
            'INSERT INTO alocacaoProjetos (codigoAlocacao, id_funcionarioA, id_projetosA, dataInicioAlocacao) VALUES (?, ?, ?, ?)',
            [alocacao.codigoAlocacao,alocacao.idFuncionario, alocacao.idProjeto, alocacao.dataInicioAlocacao]
        );
        console.log('Alocação inserida.');
    } catch (error) {
        console.error('Erro ao inserir alocação:', error);
    } finally {
        await connection.end();
    }
}

async function editarAlocacoes(codigoAlocacao: string) {
    const connectionAlocacoes = await connectToDatabase();
    try {

        const novadatainicio = readline.question('Digite uma nova data de início: ');
        if (novadatainicio) {
            await connectionAlocacoes.execute(
                'UPDATE alocacaoProjetos SET datainicioAlocacao = ? WHERE codigoAlocacao = ?',
                [novadatainicio, codigoAlocacao]
            );
            console.log('Data de inicio atualizada com sucesso.');
        }

        const novoIdFuncA = readline.question('Digite o id do novo funcionário que quer alocar (ou pressione Enter para não alterar): ');
        if (novoIdFuncA) {
            await connectionAlocacoes.execute(
                'UPDATE alocacaoProjetos SET id_funcionarioA = ? WHERE codigoAlocacao = ?',
                [novoIdFuncA, codigoAlocacao]
            );
            console.log('Nome do projeto atualizado com sucesso.');
        }

        const novaIdProjA = readline.question('Digite o id do novo projeto alocado (ou pressione Enter para não alterar): ');
        if (novaIdProjA) {
            await connectionAlocacoes.execute(
                'UPDATE alocacaoProjetos SET id_projetosA = ? WHERE codigoAlocacao = ?',
                [novaIdProjA, codigoAlocacao]
            );
            console.log('Cargo atualizado com sucesso.');
        }

        if (!novoIdFuncA && !novaIdProjA && !novadatainicio) {
            console.log('Nenhum dado fornecido para atualizar.');
        }
    } catch (error) {
        console.error('Erro ao editar alocação:', error);
    } finally {
        await connectionAlocacoes.end();
    }
}

// Função para Listar Alocações
async function listarAlocacao() {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute('SELECT * FROM alocacaoProjetos');
        console.log('Lista das alocações:');
        console.table(rows);
    } catch (error) {
        console.error('Erro ao listar alocações:', error);
    } finally {
        await connection.end();
    }
}

async function listarFuncionarios() {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute('SELECT * FROM funcionarios');
        console.log('Lista das funcionarios:');
        console.table(rows);
    } catch (error) {
        console.error('Erro ao listar funcionários:', error);
    } finally {
        await connection.end();
    }
}

async function listarProjetos() {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute('SELECT * FROM projetos');
        console.log('Lista de projetos:');

        console.table(rows);
    } catch (error) {
        console.error('Erro ao listar projetos:', error)
    } finally {
        await connection.end();
    }
}

async function listagemEspecifica(matricula:string) {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute(
            'SELECT p.nomeProjeto, p.codigoProjeto, p.datainicio, p.situacaoProjeto FROM funcionarios f INNER JOIN alocacaoProjetos ap ON f.idFuncionario = ap.id_funcionarioA INNER JOIN projetos p ON ap.id_projetosA = p.idProjeto WHERE f.matricula = ?',
            [matricula]
        )
        console.log('Aqui estão seus projetos: ')
        
        console.table(rows)
    } catch (error) {
        console.error('Erro ao listar seus projetos: ', error)
    } finally {
        await connection.end()
    }
}

async function separarCargos() {
    console.log('Você é administrador ou funcionário? \n- Admin \n- Funcionario');
    var cargousuario = readline.question('Digite o seu cargo: ').toLowerCase();

    if (cargousuario === 'admin') {
        var username = readline.question('Digite o nome de usuário: ');
        var senha = readline.question('Digite a senha: ', { hideEchoBack: true });

        if (admin.autenticar(username, senha)) {
            await mainAdm();
        } else {
            console.log('Autenticação falhou. Acesso negado.');
            await separarCargos();
        }
    } else if (cargousuario === 'funcionario') {
        await mainFunc();
    } else {
        console.log('Opção inválida! Tente novamente.');
        await separarCargos();
    }
}


async function mainFunc() {
    console.log('Você é um funcionário.');
    console.log('O que você quer fazer? \n1- Consultar meus projetos \n2- Consulta geral de alocações \n3- Sair');
    let escolhaMenuFunc = readline.question('Digite uma opção: ');
    if (escolhaMenuFunc == '1') {
        var matriculaFunc = readline.question('Digite sua matrícula: ')
        await listagemEspecifica(matriculaFunc)
        mainFunc()
    } else if (escolhaMenuFunc == '2') {
        await listarAlocacao();
        mainFunc()
    } else if (escolhaMenuFunc == '3') {
        console.log('Encerrando sistema...')
        return;
    }

}

// Exemplo de criação de um Admin específico (programador cria)
const admin = new Admin('admin', '1234');

// Função principal do menu caso seja adm
async function mainAdm() {
    console.log('Bem-vindo ao sistema de gerenciamento!');
    console.log('O que você quer fazer? \n1- Ajustes em funcionários \n2- Ajustes em projetos e alocações \n3- Consultas \n4- Sair');
    let escolha = readline.question('Digite uma opção: ');
    if (escolha == '1') {
        console.log('O que quer fazer? \n1- Adicionar funcionario \n2- Editar funcionário \n3- Retornar')
        var escolhaAfuncionarios = readline.question('Opção: ')
        if (escolhaAfuncionarios == '1') {
            const funcionarioDigitado = new Funcionario(
                readline.question('Digite uma matrícula para o funcionário: '),
                readline.question('CPF: '),
                readline.question('Nome: '),
                readline.question('Cargo: '),
                readline.question('Data de nascimento: ')
            );
            await inserirFuncionario(funcionarioDigitado);
            var escolhafunc2 = readline.question('Quer adicionar mais algum funcionário? (y/n): ')
            while (escolhafunc2 == 'y') {
                const funcionarioDigitado = new Funcionario(
                    readline.question('Digite uma matrícula para o funcionário: '),
                    readline.question('CPF: '),
                    readline.question('Nome: '),
                    readline.question('Cargo: '),
                    readline.question('Data de nascimento: ')
                );
                await inserirFuncionario(funcionarioDigitado)
                var escolhafunc2 = readline.question('Quer adicionar mais algum funcionário? (y/n): ')
            }
            mainAdm();
        } else if (escolhaAfuncionarios == '2') {
            const funcionarioEditado = readline.question('Digite a matrícula do funcionário que você quer editar: ')
            await editarFuncionario(funcionarioEditado)
            var escolhaedicao = readline.question('Quer editar mais algum funcionário? (y/n): ')
            while (escolhaedicao == 'y') {
                const funcionarioEditado = readline.question('Digite a matrícula do funcionário que você quer editar: ')
                await editarFuncionario(funcionarioEditado)
                var escolhaedicao = readline.question('Quer editar mais algum funcionário? (y/n): ')
            }
            mainAdm()
        } else if (escolhaAfuncionarios == '3') {
            mainAdm()
        } else {
            console.log('Opção inválida! Tente novamente.')
            mainAdm()
        }
    } else if (escolha == '2') {
        console.log('O que você quer fazer? \n1- Adicionar projeto \n2- Editar projeto \n3- Alocar projeto \n4- Editar alocação \n5- Retornar')
        var escolhaBprojetos = readline.question('Opção: ')
        if (escolhaBprojetos == '1') {
            const projetosDigitados = new Projetos(
                readline.question('Código do Projeto: '),
                readline.question('Digite o nome do novo projeto: '),
                readline.question('Digite a data de início (YYYY-MM-DD): '),
                readline.question('Qual a situação do projeto? ')
            );
            await inserirProjeto(projetosDigitados);
            var escolhaprojetos = readline.question('Quer adicionar mais alguem projeto? (y/n): ')
            while (escolhaprojetos == 'y') {
                const projetosDigitados = new Projetos(
                    readline.question('Código do Projeto: '),
                    readline.question('Digite o nome do novo projeto: '),
                    readline.question('Digite a data de início (YYYY-MM-DD): '),
                    readline.question('Qual a situação do projeto? ')
                );
                await inserirProjeto(projetosDigitados);
                var escolhaprojetos = readline.question('Quer adicionar mais alguem projeto? (y/n): ')
            }
            mainAdm();
        } else if (escolhaBprojetos == '2') {
            var projetoEditado = readline.question('Digite o código do projeto que você quer editar: ')
            await editarProjetos(projetoEditado)
            var escolhaedicaoprojetos = readline.question('Quer editar mais algum projeto? (y/n): ')
            while (escolhaedicaoprojetos == 'y') {
                const funcionarioEditado = readline.question('Digite a matrícula do funcionário que você quer editar: ')
                await editarFuncionario(funcionarioEditado)
                var escolhaedicaoprojetos = readline.question('Quer editar mais algum projeto? (y/n): ')
            }
            mainAdm()
        } else if (escolhaBprojetos == '3') {
            const alocacaoProjeto = new Alocacao(
                readline.question('Digite um código para a alocação: '),
                readline.questionInt('Digite o id de qual funcionário você quer alocar: '),
                readline.questionInt('Digite o id do projeto: '),
                readline.question('Digite a data de início (YYYY-MM-DD): ')
            );
            await inserirAlocacao(alocacaoProjeto);
            var escolhaalocacao = readline.question('Quer fazer mais alguma alocação? (y/n): ')
            while (escolhaalocacao == 'y') {
                const alocacaoProjeto = new Alocacao(
                    readline.question('Digite um código para a alocação: '),
                    readline.questionInt('Digite o id de qual funcionário você quer alocar: '),
                    readline.questionInt('Digite o id do projeto: '),
                    readline.question('Digite a data de início (YYYY-MM-DD): ')
                );
                await inserirAlocacao(alocacaoProjeto);
                var escolhaalocacao = readline.question('Quer fazer mais alguma alocação? (y/n): ')
            }
            mainAdm();
        } else if (escolhaBprojetos == '4') {
            const alocacaoEditada = readline.question('Digite o código da alocação você quer editar: ')
            await editarAlocacoes(alocacaoEditada)
            var escolhaedicaoalocacao = readline.question('Quer editar mais alguma alocação? (y/n): ')
            while (escolhaedicaoalocacao == 'y') {
                const alocacaoEditada = readline.question('Digite o código da alocação que você quer editar?')
                await editarAlocacoes(alocacaoEditada)
            }
            mainAdm()
        } else if (escolhaBprojetos == '5') {
            mainAdm()
        } else {
            console.log('Opção inválida! Tente novamente.')
            mainAdm()
        }
    } else if (escolha == '3') {
        console.log('O que quer consultar? \n1- Consultar funcionários \n2- Consultar Projetos \n3- Consulta geral de alocações \n4- Retornar')
        var escolhaCconsultas = readline.question('Opção: ')

        if (escolhaCconsultas == '1') {
            console.log('Consultando...')
            await listarFuncionarios()
            mainAdm()
        } else if (escolhaCconsultas == '2') {
            console.log('Consultando...')
            await listarProjetos()
            mainAdm()
        } else if (escolhaCconsultas == '3') {
            await listarAlocacao();
            mainAdm();
        } else if (escolhaCconsultas == '4') {
            console.log('Retornando...')
            mainAdm()
        } else {
            console.log('Opção inválida! Tente novamente.')
            mainAdm()
        }

    }
}

separarCargos().catch(console.error)






