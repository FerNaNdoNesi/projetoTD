CREATE TABLE "dim_data" (
	"id" serial NOT NULL,
	"dt_dia" DATE NOT NULL,
	"dia" integer NOT NULL,
	"mes" integer NOT NULL,
	"ano" integer NOT NULL,
	"dia_da_semana" character varying NOT NULL,
	"mes_desc" character varying NOT NULL,
	"mes_min" character varying NOT NULL,
	"dia_do_ano" integer NOT NULL,
	"semana_do_mes" integer NOT NULL,
	"semana_do_ano" integer NOT NULL,
	"trimestre" integer NOT NULL,
	"semestre" integer NOT NULL,
	CONSTRAINT dim_data_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "dim_indice" (
	"id" serial NOT NULL,
	"nome" character varying NOT NULL,
	CONSTRAINT dim_indice_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "dim_titulo" (
	"id" serial NOT NULL,
	"codigo" character varying NOT NULL,
	"nome" character varying NOT NULL,
	"ano" bigint NOT NULL,
	"dt_inicio" DATE NOT NULL,
	"dt_vencimento" DATE NOT NULL,
	CONSTRAINT dim_titulo_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "fat_historico_indice" (
	"id_indice" bigint NOT NULL,
	"id_data" bigint NOT NULL,
	"taxa_am" numeric NOT NULL,
	"taxa_aa" numeric NOT NULL,
	CONSTRAINT fat_historico_indice_pk PRIMARY KEY ("id_indice","id_data")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "fat_historico_titulo" (
	"id_titulo" bigint NOT NULL,
	"id_data" bigint NOT NULL,
	"taxa_compra" numeric NOT NULL,
	"taxa_venda" numeric NOT NULL,
	"pu_compra" numeric NOT NULL,
	"pu_venda" numeric NOT NULL,
	"pu_base" numeric NOT NULL,
	CONSTRAINT fat_historico_titulo_pk PRIMARY KEY ("id_titulo","id_data")
) WITH (
  OIDS=FALSE
);






ALTER TABLE "fat_historico_indice" ADD CONSTRAINT "fat_historico_indice_fk0" FOREIGN KEY ("id_indice") REFERENCES "dim_indice"("id");
ALTER TABLE "fat_historico_indice" ADD CONSTRAINT "fat_historico_indice_fk1" FOREIGN KEY ("id_data") REFERENCES "dim_data"("id");

ALTER TABLE "fat_historico_titulo" ADD CONSTRAINT "fat_historico_titulo_fk0" FOREIGN KEY ("id_titulo") REFERENCES "dim_titulo"("id");
ALTER TABLE "fat_historico_titulo" ADD CONSTRAINT "fat_historico_titulo_fk1" FOREIGN KEY ("id_data") REFERENCES "dim_data"("id");

