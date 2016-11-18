with

lista_titulo as (
  select substring(nome,0,20), codigo, nome, *
    from teste.dim_titulo t
    where case when substring(nome,0,20) = 'Tesouro IPCA+ com J'
               then dt_vencimento > (CURRENT_DATE + interval '10 year')
               else dt_vencimento > (CURRENT_DATE + interval '2 year')
           end
      and substring(codigo,0,6) <> 'NTN-C'
order by nome
),

indice as (
  select d.dt_dia, i.nome, f.taxa
    from teste.fat_historico_indice f
    join teste.dim_data d on d.id = f.id_data
    join teste.dim_indice i on i.id = f.id_indice
   where nome = 'SELIC'
),

titulo as (
  select f.*, dt_dia, nome, codigo
    from teste.fat_historico_titulo f
    join teste.dim_titulo t on t.id = f.id_titulo
    join teste.dim_data d on d.id = f.id_data
where nome = 'Tesouro Prefixado 2019'
  and dt_dia between '01/01/2016' and CURRENT_DATE
)

  select dt_dia as "Dia", 
         i.taxa*100 as "Selic",
         (taxa_compra*100) as "Tesouro Prefixado 2019"
    from titulo t
    join indice i using (dt_dia)
order by dt_dia