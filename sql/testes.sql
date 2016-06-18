  select *
    from teste.dim_titulo
    where ano = 2015
order by nome

  select f.*, dt_dia, nome
    from teste.fat_historico_titulo f
    join teste.dim_titulo t on t.id = f.id_titulo
    join teste.dim_data d on d.id = f.id_data
where t.ano = 2019
order by dt_dia

-- drop table teste.fat_historico_titulo
-- drop table teste.dim_titulo

-- CREATE TABLE teste.dim_titulo (
-- 	"id" serial NOT NULL,
-- 	"codigo" character varying NOT NULL,
-- 	"nome" character varying NOT NULL,
-- 	"ano" bigint NOT NULL,
-- 	"dt_inicio" DATE,
-- 	"dt_vencimento" DATE NOT NULL,
-- 	CONSTRAINT dim_titulo_pk PRIMARY KEY ("id")
-- ) WITH (
--   OIDS=FALSE
-- );




-- CREATE TABLE teste.fat_historico_titulo (
-- 	"id_titulo" bigint NOT NULL,
-- 	"id_data" bigint NOT NULL,
-- 	"taxa_compra" numeric NOT NULL,
-- 	"taxa_venda" numeric NOT NULL,
-- 	"pu_compra" numeric NOT NULL,
-- 	"pu_venda" numeric NOT NULL,
-- 	"pu_base" numeric,
-- 	CONSTRAINT fat_historico_titulo_pk PRIMARY KEY ("id_titulo","id_data")
-- ) WITH (
--   OIDS=FALSE
-- );



-- ALTER TABLE teste.fat_historico_titulo ADD CONSTRAINT "fat_historico_titulo_fk0" FOREIGN KEY ("id_titulo") REFERENCES teste.dim_titulo("id");
-- ALTER TABLE teste.fat_historico_titulo ADD CONSTRAINT "fat_historico_titulo_fk1" FOREIGN KEY ("id_data") REFERENCES teste.dim_data("id");
