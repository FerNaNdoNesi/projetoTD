﻿with

parametros as (
  select 500 as rendimento_objetivo,
         0 as saldo_inicial, --VP --valor_presente
         1000 as deposito_mensal,
         '2016/07/01'::date as dt_inicial,
         '2019/08/01'::date dt_final,
         12 as taxa_aa,
         (12/*taxa_aa*//360.0)/100 as taxa_juros_dia,
         (12/*taxa_aa*//12.0)/100 as taxa_juros_mes
),

formulas as (
  select log(121/100::numeric)/log(1+0.1::numeric) -- prazo log(VF/VP)/log(1+)
),

periodos as (
  select rendimento_objetivo,
         saldo_inicial,
         deposito_mensal,
         taxa_juros_dia,
         taxa_juros_mes,
         (-1 + dense_rank() over(order by to_char(periodo_dia::date,'yyyy/MM'))) as num_mes,
         row_number() over() as periodo,
         periodo_dia
    from parametros, (select generate_series(dt_inicial, dt_final, '1 month')::date as periodo_dia from parametros) as generate
),

calcula_juros As (
  SELECT rendimento_objetivo,
         saldo_inicial,
         taxa_juros_dia,
         taxa_juros_mes,
         num_mes,
         periodo,
         periodo_dia,
         (saldo_inicial * POWER((1 + taxa_juros_mes),periodo)) - (saldo_inicial * POWER((1 + taxa_juros_mes),periodo - 1)) As rendimento_sem_deposito,
         (saldo_inicial * POWER((1 + taxa_juros_mes),periodo)) As montante_total_sem_deposito,
         (((deposito_mensal*num_mes) + saldo_inicial) * POWER((1 + taxa_juros_mes),periodo)) - (((deposito_mensal*num_mes) + saldo_inicial) * POWER((1 + taxa_juros_mes),periodo - 1)) As rendimento_com_deposito,
         (((deposito_mensal*num_mes) + saldo_inicial) * POWER((1 + taxa_juros_mes),periodo)) As montante_total_com_deposito,
         ((deposito_mensal*num_mes) + saldo_inicial) as valor_investido,
         deposito_mensal
FROM periodos
),


resultado as (
  select periodo_dia,
         taxa_juros_mes,
         rendimento_objetivo,
         saldo_inicial,
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

  select *
    from resultado
order by periodo_dia

/*
  select periodo_mes, composto, valor
    from (
            (select periodo_dia,
                    to_char(periodo_dia::date,'MM/yyyy') as periodo_mes,
                    'Seu salario atual'::text as composto,
                    rendimento_objetivo as valor,
                    1 as ordem
               from resultado
            )
            union all
            (select periodo_dia,
                    to_char(periodo_dia::date,'MM/yyyy') as periodo_mes,
                    'Depósito mensal'::text as composto,
                    deposito_mensal,
                    2 as ordem
               from resultado
            )
            union all
            (select periodo_dia,
                    to_char(periodo_dia::date,'MM/yyyy') as periodo_mes,
                    'Seu rendimento mensal'::text as composto,
                    rendimento_com_deposito,
                    3 as ordem
               from resultado
            )
    order by ordem, periodo_dia
    ) as query
*/