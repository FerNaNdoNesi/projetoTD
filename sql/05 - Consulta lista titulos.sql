with

lista_titulo_ativos as (
  select substring(nome,0,20), *
    from teste.dim_titulo t
    where case when substring(nome,0,20) = 'Tesouro IPCA+ com J'
               then dt_vencimento > (CURRENT_DATE + interval '10 year')
               else dt_vencimento > (CURRENT_DATE + interval '2 year')
           end
      and substring(codigo,0,6) <> 'NTN-C'
),

lista_titulo_no_ano as (
  select *
    from teste.dim_titulo t
    where 
)

select nome
  from lista_titulo_no_ano
order by nome