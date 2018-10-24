--Criação do banco
CREATE DATABASE MeuMundo;

-- Dia semana
CREATE TABLE DiaSemana
(
 DiaSemanaId INT PRIMARY KEY,
 Enum VARCHAR(20) NOT NULL,
 Descricao VARCHAR(40) NOT NULL
);

INSERT INTO DiaSemana (DiaSemanaId, Enum, Descricao) VALUES (0,'NaoDefinido','Não definido');
INSERT INTO DiaSemana (DiaSemanaId, Enum, Descricao) VALUES (1, 'Domingo','Domingo');
INSERT INTO DiaSemana (DiaSemanaId, Enum, Descricao) VALUES (2, 'Segunda','Segunda-feira');
INSERT INTO DiaSemana (DiaSemanaId, Enum, Descricao) VALUES (3, 'Terca','Terça-feira');
INSERT INTO DiaSemana (DiaSemanaId, Enum, Descricao) VALUES (4, 'Quarta','Quarta-feira');
INSERT INTO DiaSemana (DiaSemanaId, Enum, Descricao) VALUES (5, 'Quinta','Quinta-feira');
INSERT INTO DiaSemana (DiaSemanaId, Enum, Descricao) VALUES (6, 'Sexta','Sexta-feira ');
INSERT INTO DiaSemana (DiaSemanaId, Enum, Descricao) VALUES (7, 'Sabado','Sábado');

-- Tipo Notificação
CREATE TABLE TipoNotificacao
(
	TipoNotificacaoId INT PRIMARY KEY,
	Enum VARCHAR(40),
	Descricao VARCHAR(100)
);

INSERT INTO TipoNotificacao (TipoNotificacaoId, Enum, Descricao) VALUES (0,'NaoDefinido','Não realiza nada');
INSERT INTO TipoNotificacao (TipoNotificacaoId, Enum, Descricao) VALUES (1,'Mensagem',' Realiza apenas visualização da mensagem');
INSERT INTO TipoNotificacao (TipoNotificacaoId, Enum, Descricao) VALUES (2,'Vibrar','Realiza vibração no disposítivo');
INSERT INTO TipoNotificacao (TipoNotificacaoId, Enum, Descricao) VALUES (3,'Som','Realiza efeito sonoro no disposítivo');

-- Agenda
CREATE TABLE Agenda
(
	AgendaId INT IDENTITY PRIMARY KEY,
	DiaSemanaId INT NOT NULL,
	TipoNotificacaoId INT NOT NULL,
	Hora TIME NOT NULL,
	Duracao TIME NOT NULL,
	Descricao VARCHAR(100) NOT NULL,
	Mensagem TEXT NOT NULL,

	FOREIGN KEY (DiaSemanaId) REFERENCES DiaSemana(DiaSemanaId),
	FOREIGN KEY (TipoNotificacaoId) REFERENCES TipoNotificacao (TipoNotificacaoId)
);

