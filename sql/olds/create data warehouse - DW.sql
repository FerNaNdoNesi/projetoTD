/**Create DW teste*/
SET lc_time='pt_BR.UTF8';

CREATE TABLE IF NOT EXISTS teste.dim_data (
	id serial NOT NULL,
	dt_dia DATE NOT NULL,
	dia integer NOT NULL,
	mes integer NOT NULL,
	ano integer NOT NULL,
	dia_da_semana character varying NOT NULL,
	mes_desc character varying NOT NULL,
	mes_min character varying NOT NULL,
	dia_do_ano integer NOT NULL,
	semana_do_mes integer NOT NULL,
	semana_do_ano integer NOT NULL,
	trimestre integer NOT NULL,
	semestre integer NOT NULL,
	CONSTRAINT dim_data_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS teste.dim_indice (
	id serial NOT NULL,
	nome character varying NOT NULL,
	CONSTRAINT dim_indice_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS teste.dim_titulo (
	id serial NOT NULL,
	cod_nome character varying NOT NULL,
	nome character varying NOT NULL,
	dt_inicio DATE NOT NULL,
	dt_vencimento DATE NOT NULL,
	CONSTRAINT dim_titulo_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS teste.fat_historico_indice (
	id_indice bigint NOT NULL,
	id_data bigint NOT NULL,
	taxa numeric NOT NULL,
	CONSTRAINT fat_historico_indice_pk PRIMARY KEY (id_indice,id_data)
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS teste.fat_historico_titulo (
	id_titulo bigint NOT NULL,
	id_data bigint NOT NULL,
	taxa_compra numeric NOT NULL,
	taxa_venda numeric NOT NULL,
	valor_compra numeric NOT NULL,
	valor_venda numeric NOT NULL,
	valor_base numeric NOT NULL,
	CONSTRAINT fat_historico_titulo_pk PRIMARY KEY (id_titulo,id_data)
) WITH (
  OIDS=FALSE
);


ALTER TABLE teste.fat_historico_indice ADD CONSTRAINT fat_historico_indice_fk0 FOREIGN KEY (id_indice) REFERENCES teste.dim_indice(id);
ALTER TABLE teste.fat_historico_indice ADD CONSTRAINT fat_historico_indice_fk1 FOREIGN KEY (id_data) REFERENCES teste.dim_data(id);

ALTER TABLE teste.fat_historico_titulo ADD CONSTRAINT fat_historico_titulo_fk0 FOREIGN KEY (id_titulo) REFERENCES teste.dim_titulo(id);
ALTER TABLE teste.fat_historico_titulo ADD CONSTRAINT fat_historico_titulo_fk1 FOREIGN KEY (id_data) REFERENCES teste.dim_data(id);

