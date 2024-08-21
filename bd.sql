create database gerenciamento;
use gerenciamento;

create table funcionarios (
idFuncionario int primary key auto_increment unique not null,
matricula varchar(20),
cpf varchar (14),
nome varchar(60),
cargo varchar(60),
datanascimento varchar(10)
);

create table projetos(
idProjeto int primary key auto_increment not null unique,
codigoProjeto varchar(10),
nomeProjeto varchar(60),
datainicio varchar(10),
situacaoProjeto varchar(60)
);

create table alocacaoProjetos(
idAlocacao int primary key auto_increment not null unique,
codigoAlocacao varchar(10),
datainicioAlocacao varchar(10),
id_funcionarioA int,
id_projetosA int,	
foreign key (id_funcionarioA) references funcionarios(idFuncionario),
foreign key (id_projetosA) references projetos(idProjeto)
);
