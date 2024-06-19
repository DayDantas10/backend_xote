create table endereco(
    id int PRIMARY KEY AUTO_INCREMENT,
    rua varchar(200),
    cidade varchar(100),
    estado varchar(100)
);

create table artista(
    id int PRIMARY KEY AUTO_INCREMENT,
    id_endereco int,
    nome_artista varchar(100),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);

create table compositor(
    id int PRIMARY KEY AUTO_INCREMENT,
    id_endereco int,
    nome_compositor varchar(100),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
);

create table genero (
    id int PRIMARY KEY AUTO_INCREMENT,
    nome_genero varchar(100)
);

create table musica (
    id int PRIMARY KEY AUTO_INCREMENT,
    id_artista int,
    id_compositor int,
    id_genero int,
    letra varchar (65535),
    FOREIGN KEY (id_artista) REFERENCES artista(id),
    FOREIGN KEY (id_compositor) REFERENCES compositor(id),
    FOREIGN KEY (id_genero) REFERENCES genero(id)
);

create table entrevista(
    id int PRIMARY KEY AUTO_INCREMENT,
    id_artista int,
    nome varchar(200),
    dados_entrevista varchar(65535),
    FOREIGN KEY (id_artista) REFERENCES artista(id)
);