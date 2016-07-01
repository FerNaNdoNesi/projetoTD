with

parametros as (
  select 1000 as montante_inicial,
         100 as deposito_mensal,
         '2016/07/01'::date as dt_inicial,
         '2019/12/31'::date dt_final,
         12 as taxa_aa,
         (12/360.0)/100 as taxa_juros_dia
),

periodos as (
  select montante_inicial,
         deposito_mensal,
         taxa_juros_dia,
         (-1 + dense_rank() over(order by to_char(periodo_dia::date,'yyyy/MM'))) as num_mes,
         row_number() over() as periodo,
         periodo_dia
    from parametros, (select generate_series(dt_inicial, dt_final, '1 day')::date as periodo_dia from parametros) as generate
),

calcula_juros As (
  SELECT montante_inicial,
         taxa_juros_dia,
         num_mes,
         periodo,
         periodo_dia,
         (montante_inicial * POWER((1 + taxa_juros_dia),periodo)) - (montante_inicial * POWER((1 + taxa_juros_dia),periodo - 1)) As rendimento_sem_deposito,
         (montante_inicial * POWER((1 + taxa_juros_dia),periodo)) As montante_total_sem_deposito,
         (((deposito_mensal*num_mes) + montante_inicial) * POWER((1 + taxa_juros_dia),periodo)) - (((deposito_mensal*num_mes) + montante_inicial) * POWER((1 + taxa_juros_dia),periodo - 1)) As rendimento_com_deposito,
         (((deposito_mensal*num_mes) + montante_inicial) * POWER((1 + taxa_juros_dia),periodo)) As montante_total_com_deposito,
         ((deposito_mensal*num_mes) + montante_inicial) as valor_investido,
         deposito_mensal
FROM periodos
),


resultado as (
  select periodo_dia,
         taxa_juros_dia,
         montante_inicial,
         montante_total_sem_deposito,
         montante_total_com_deposito,
         rendimento_sem_deposito,
         rendimento_com_deposito,
         valor_investido,
         deposito_mensal,
         (SELECT sum(rendimento_sem_deposito)
            FROM calcula_juros As tint
           WHERE tint.periodo <= tout.periodo
         ) As rendimento_acumulado_sem_deposito,
         (SELECT sum(rendimento_com_deposito)
            FROM calcula_juros As tint
           WHERE tint.periodo <= tout.periodo
         ) As rendimento_acumulado_com_deposito
    from calcula_juros as  tout
)



(select periodo_dia,
       'Total sem depositos'::text as composto,
       montante_total_sem_deposito
  from resultado
)
union all
(select periodo_dia,
       'Total com depositos'::text as composto,
       rendimento_com_deposito
  from resultado
)
order by composto, periodo_dia
