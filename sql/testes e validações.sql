  select *
    from dim_titulo
    where ano = 2019
order by nome

  select f.*, dt_dia, nome
    from fat_historico_titulo f
    join dim_titulo t on t.id = f.id_titulo
    join dim_data d on d.id = f.id_data
where nome = 'Tesouro Selic 2017'
order by dt_dia

select * from fat_historico_titulo
select * from dim_titulo


  select codigo, nome, dt_dia, --f.*
         taxa_compra,
         taxa_venda,
         pu_compra,
         pu_venda,
         pu_base
    from fat_historico_titulo f
    join dim_titulo t on t.id = f.id_titulo
    join dim_data d on d.id = f.id_data
where nome = 'Tesouro IPCA+ 2019'
order by dt_dia