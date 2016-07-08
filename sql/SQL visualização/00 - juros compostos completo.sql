with

parametros as (
  select 500 as rendimento_objetivo,
         1000 as valor_presente, --VP --valor_presente
         4121.20 as valor_futuro, --VF --valor_futuro
         1000 as deposito_mensal,
         '2016/01/01'::date as dt_inicial,
         '2016/06/01'::date dt_final,
         12 as taxa_aa,
         (12/*taxa_aa*//360.0)/100 as taxa_dd,
         (12/*taxa_aa*//12.0)/100 as taxa_mm
),

formulas as (
  select log(valor_futuro/valor_presente::numeric)/log(1+taxa_mm::numeric), -- prazo log(VF/VP)/log(1+taxa)
         valor_presente * (1 + taxa_mm)^3
    from parametros
)select * from formulas,

periodos as (
  select rendimento_objetivo,
         valor_presente,
         deposito_mensal,
         taxa_dd,
         taxa_mm,
         dense_rank() over(order by to_char(periodo_dia::date,'yyyy/MM')) as num_mes,
         row_number() over() as periodo,
         periodo_dia
    from parametros, (select generate_series(dt_inicial, dt_final, '1 month')::date as periodo_dia from parametros) as generate
),

calcula_juros As (
  SELECT rendimento_objetivo,
         valor_presente,
         taxa_dd,
         taxa_mm,
         num_mes,
         periodo,
         periodo_dia,
--          (saldo_inicial * POWER((1 + taxa_juros_mes),periodo)) - (saldo_inicial * POWER((1 + taxa_juros_mes),periodo - 1)) As rendimento_sem_deposito,
--          (saldo_inicial * POWER((1 + taxa_juros_mes),periodo)) As montante_total_sem_deposito,
         (((deposito_mensal*num_mes) + valor_presente) * POWER((1 + taxa_mm),periodo)) - (((deposito_mensal*num_mes) + valor_presente) * POWER((1 + taxa_mm),periodo - 1)) As rendimento_com_deposito,
         (((deposito_mensal*num_mes) + valor_presente) * POWER((1 + taxa_mm),periodo)) As montante_total,
         ((deposito_mensal*num_mes) + valor_presente) as valor_investido,
         deposito_mensal
FROM periodos
)select * from calcula_juros/*,


resultado as (
  select periodo_dia,
         taxa_mm,
         rendimento_objetivo,
         valor_presente,
         montante_total
         rendimento_com_deposito,
         valor_investido,
         deposito_mensal,
         (SELECT sum(rendimento_com_deposito)
            FROM calcula_juros As tint
           WHERE tint.periodo <= tout.periodo
         ) As rendimento_acumulado
    from calcula_juros as  tout
)

  select *
    from resultado
order by periodo_dia*/

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