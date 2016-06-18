/**Popula DW teste*/


/*

SET lc_time='pt_BR.UTF8';

CREATE TABLE IF NOT EXISTS teste.dim_data (
  id		SERIAL not null,
  dt_dia	date not null,
  dia		integer not null,
  mes		integer not null,
  ano		integer not null,
  dia_da_semana	varchar not null,
  mes_desc	varchar not null,
  dia_do_ano	integer not null,
  semana_do_mes	integer not null,
  semana_do_ano	integer not null,
  trimestre	integer not null,
  semestre	integer not null,
  CONSTRAINT key_dim_data PRIMARY KEY(id)
);

SET lc_time='pt_BR.UTF8';

INSERT INTO teste.dim_data (dt_dia, dia, mes, ano, dia_da_semana, mes_desc, dia_do_ano, semana_do_mes, semana_do_ano, trimestre, semestre)
SELECT dt_dia, dia, mes, ano, dia_da_semana, mes_desc, dia_do_ano, semana_do_mes, semana_do_ano, trimestre, semestre FROM(
  select to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'DD/MM/yyyy')::date as dt_dia,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'DD')::integer as dia,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'MM')::integer as mes,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'yyyy')::integer as ano,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'TMday') as dia_da_semana,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'TMMonth') as mes_desc,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'DDD')::integer as dia_do_ano,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'w')::integer as semana_do_mes,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'ww')::integer as semana_do_ano,
         to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'Q')::integer as trimestre,
         ceil(to_char(generate_series(dt_inicio, dt_fim, '1 day'), 'Q')::numeric/2)::integer as semestre
    from (select '01/01/1990'::date as dt_inicio, '31/12/2050'::date as dt_fim) as periodos) AS valores;

select * from teste.dim_data where dt_dia = '31/12/2015'::date order by 1 desc
*/

-- insert into teste.dim_indice (nome) values ('SELIC');
-- insert into teste.dim_indice (nome) values ('IPCA');
-- insert into teste.dim_titulo (cod_nome, nome, dt_inicio, dt_vencimento) values ('LTN010119', 'Pré fixado 2019', '26/01/2016', '01/01/2019');
-- insert into teste.dim_titulo (cod_nome, nome, dt_inicio, dt_vencimento) values ('LTN010123', 'Pré fixado 2023', '26/01/2016', '01/01/2023');
-- insert into teste.dim_titulo (cod_nome, nome, dt_inicio, dt_vencimento) values ('NTN-BPrincipal150519', 'IPCA+ 2019', '14/01/2013', '15/05/2019');