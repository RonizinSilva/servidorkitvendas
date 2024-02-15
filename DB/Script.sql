create database kitvendas 
default character set utf8
default collate utf8_general_ci;

CREATE USER 'roni'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'roni'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

create table evento(
    id_evento int not null auto_increment,
    nome varchar(100) not null,
    status boolean not null,

    primary key(id_evento)
)default charset = utf8;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    id_evento INT NOT NULL,
    token_reset_senha VARCHAR(255),
    data_expiracao_token DATETIME,
    FOREIGN KEY (id_evento) REFERENCES evento(id_evento)
);

CREATE TABLE api_keys(
    nome_aplicacao varchar(100) not null,
    chave_api varchar(500) not null
);
    
    primary key(id_usuario),
    foreign key(id_evento) references evento(id_evento)
) default charset = utf8;

create table categoria(
    id_categoria int not null auto_increment,
    descricao varchar(100) not null,
    id_evento int not null,

    primary key(id_categoria),
    foreign key(id_evento) references evento(id_evento)

) default charset = utf8;


create table produto(
	id_produto int not null auto_increment,
	descricao varchar(100),
    preco_produto decimal(12,2) default(0),
    cat_produto int not null,
    id_evento int not null, 
    
    primary key(id_produto),
    foreign key(cat_produto) references categoria(id_categoria),
    foreign key(id_evento) references evento(id_evento)
) default charset = utf8;

create table caixa(
	id_caixa int not null auto_increment,
	descricao varchar(100),
    data_abertura date,
    data_fechado date,
    valor decimal(12,2),
    id_evento int,

    primary key (id_caixa),
    foreign key(id_evento) references evento(id_evento)

)default charset = utf8;

INSERT INTO EVENTO (NOME, STATUS) values ('Implantação', 1);

INSERT INTO TAB_USUARIO (EMAIL, SENHA, NOME, ID_EVENTO)
VALUES('roni@viaconect.com', '123', 'Roni Silva', 1);

INSERT INTO CATEGORIA (DESCRICAO, ID_EVENTO) values('Geral', 1);


