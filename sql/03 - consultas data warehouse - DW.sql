
/** historico de indices*/
  select *
    from teste.fat_historico_indice f
    join teste.dim_data d on d.id = f.id_data
    join teste.dim_indice i on i.id = f.id_indice

/** historico de titulos*/
  select *
    from teste.fat_historico_titulo f
    join teste.dim_data d on d.id = f.id_data
    join teste.dim_titulo t on t.id = f.id_titulo

with

indice as (
  select d.dt_dia, i.nome, f.taxa
    from teste.fat_historico_indice f
    join teste.dim_data d on d.id = f.id_data
    join teste.dim_indice i on i.id = f.id_indice
   where nome = 'SELIC'
),

titulo as (
  select d.dt_dia, t.nome, f.taxa_compra as taxa
    from teste.fat_historico_titulo f
    join teste.dim_data d on d.id = f.id_data
    join teste.dim_titulo t on t.id = f.id_titulo
   where cod_nome = 'LTN010119'
)

  select dt_dia as "Dia", 
         i.taxa as "Selic",
         t.taxa as "Pré fixado 2019"
    from indice i
    join titulo t using (dt_dia)