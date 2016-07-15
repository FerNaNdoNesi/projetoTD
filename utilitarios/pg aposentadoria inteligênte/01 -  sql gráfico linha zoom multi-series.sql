WITH RECURSIVE tempo(num, num_mes, dia) AS (
   VALUES (${deposito_mensal}::numeric, 1, date_trunc('month',current_date)::date)
UNION ALL
   SELECT num+${deposito_mensal}::numeric, num_mes+1, (dia + interval '1 month')::date
     FROM tempo
    where (${saldo_inicial}::numeric*(1+((${taxa_aa}::numeric/12.0)/100))^num_mes - ${saldo_inicial}::numeric*(1+((${taxa_aa}::numeric/12.0)/100))^(num_mes-1) --rendimento_mensal_com_capital
          +
          (${deposito_mensal}::numeric*(1+((${taxa_aa}::numeric/12.0)/100))*((((1+((${taxa_aa}::numeric/12.0)/100))^num_mes)-1)/((${taxa_aa}::numeric/12.0)/100)))-(${deposito_mensal}::numeric*(1+((${taxa_aa}::numeric/12.0)/100))*((((1+((${taxa_aa}::numeric/12.0)/100))^(num_mes-1))-1)/((${taxa_aa}::numeric/12.0)/100)))-${deposito_mensal}::numeric --rendimento_mensal_com_depositos
          ) < ( ${rendimento_objetivo}::numeric*1.05) -- enquanto menor que menor que rendimento_objetivo
                         -- PARADA EM RENTABILIDADE ATINGIDA rendimento_mensal_com_capital + rendimento_mensal_com_depositos
),


parametros as (
  select ${rendimento_objetivo}::numeric as rendimento_objetivo,
         ${saldo_inicial}::numeric as capital_inicial, --VP --valor_presente
         4121.20 as valor_futuro, --VF --valor_futuro
         ${deposito_mensal}::numeric  as deposito_mensal,
         min(dia) as dt_inicial,
         max(dia) as dt_final,
         ${taxa_aa}::numeric as taxa_aa,
         (${taxa_aa}::numeric/*taxa_aa*//360.0)/100 as taxa_ad,
         (${taxa_aa}::numeric/*taxa_aa*//12.0)/100 as taxa_am
      from tempo
),

formulas as (
  select log(valor_futuro/capital_inicial::numeric)/log(1+taxa_am::numeric), -- prazo log(VF/VP)/log(1+taxa)
         capital_inicial * (1 + taxa_am)^3
    from parametros
),

periodos as (
  select rendimento_objetivo,
         capital_inicial,
         deposito_mensal,
         dense_rank() over(order by to_char(periodo_dia::date,'yyyy/MM')) as num_mes,
         row_number() over() as periodo,
         periodo_dia,
         taxa_aa,
         taxa_am,
         taxa_ad
    from parametros, (select generate_series(dt_inicial, dt_final, '1 month')::date as periodo_dia from parametros) as generate
),

calcula_juros As (
  SELECT num_mes,
         periodo_dia,
--          FONTE FORMULAS BCB -- https://www3.bcb.gov.br/CALCIDADAO/publico/calcularValorFuturoCapital.do
--          FORMULA JUROS DEPOSITO --deposito*(1+taxa)*[(((1+taxa)^periodo)-1) /taxa]
         round(deposito_mensal*(1+taxa_am)*((((1+taxa_am)^num_mes)-1)/taxa_am),2) as saldo_acumulado_com_depositos,
         round(deposito_mensal*(1+taxa_am)*((((1+taxa_am)^num_mes)-1)/taxa_am),2)-round(deposito_mensal*(1+taxa_am)*((((1+taxa_am)^(num_mes-1))-1)/taxa_am),2)-deposito_mensal as rendimento_mensal_com_depositos,
         round(deposito_mensal*(1+taxa_am)*((((1+taxa_am)^num_mes)-1)/taxa_am),2) - (deposito_mensal*num_mes) as rendimento_acumulado_com_depositos,
--          FORMULA JUROS CAPITAL -- VP*(1+taxa)^periodo
         round(capital_inicial*(1+taxa_am)^num_mes,2) as saldo_acumulado_com_capital,
         round(capital_inicial*(1+taxa_am)^num_mes - capital_inicial*(1+taxa_am)^(num_mes-1),2) as rendimento_mensal_com_capital,
         round(capital_inicial*(1+taxa_am)^num_mes - capital_inicial,2) as rendimento_acumulado_com_capital,
         deposito_mensal*num_mes as total_investimento_mensal,
         capital_inicial,
         deposito_mensal,
         rendimento_objetivo,
         taxa_aa,
         taxa_am,
         taxa_ad
FROM periodos
),

resultado as (
  select num_mes, periodo_dia, to_char(periodo_dia::date,'yyyy/MM') as periodo_mes,
         taxa_aa, taxa_am, taxa_ad,
         rendimento_objetivo,
         capital_inicial,
         deposito_mensal,
         saldo_acumulado_com_capital, rendimento_mensal_com_capital,
         saldo_acumulado_com_depositos, rendimento_mensal_com_depositos,
         saldo_acumulado_com_capital + saldo_acumulado_com_depositos as saldo_acumulado_total,
         rendimento_mensal_com_capital + rendimento_mensal_com_depositos as rendimento_mensal_total,
         total_investimento_mensal,
         capital_inicial + total_investimento_mensal as valor_total_investido_total
    from calcula_juros
)


  select periodo_mes, composto, valor
    from (
            (select periodo_dia,
                    to_char(periodo_dia::date,'MM/yyyy')||' ('||num_mes||')' as periodo_mes,
                    'Rendimento objetivo'::text as composto,
                    rendimento_objetivo as valor,
                    2 as ordem
               from resultado
            )
            union all
            (select periodo_dia,
                    to_char(periodo_dia::date,'MM/yyyy')||' ('||num_mes||')' as periodo_mes,
                    'Depósito mensal'::text as composto,
                    deposito_mensal,
                    3 as ordem
               from resultado
            )
            union all
            (select periodo_dia,
                    to_char(periodo_dia::date,'MM/yyyy')||' ('||num_mes||')' as periodo_mes,
                    'Rendimento mensal'::text as composto,
                    rendimento_mensal_total,
                    1 as ordem
               from resultado
            )
    order by ordem, periodo_dia
    ) as query
