with

entradas as (
  select 1000 as montante,
         12 as taxa_aa,
         0.12/360 as taxa_juros
),

periodos as (
  select montante,
         taxa_juros,
         row_number() over() as periodo,
         periodo_dia
         from entradas
         cross join (select generate_series('01/01/2016'::date, -- dt_compra
                                      '31/01/2019'::date, -- dt_vencimento
                                      '1 day')::date as periodo_dia
                                      ) as pd
),

calcula_juros As (
  SELECT montante, taxa_juros,
         (montante * POWER((1 + taxa_juros),periodo)) - (montante * POWER((1 + taxa_juros),periodo - 1)) As rendimento,
         (montante * POWER((1 + taxa_juros),periodo)) As total,
         periodo,
         periodo_dia
FROM periodos
),

resultado as (
  select periodo_dia,
         montante as montante_inicial,
         total as montante_total,
         taxa_juros,
         rendimento,
         (SELECT sum(rendimento)
            FROM calcula_juros As tint
           WHERE tint.periodo <= tout.periodo
         ) As rendimento_acumulado
    from calcula_juros as  tout
)

select periodo_dia,
       montante_total
  from resultado
order by periodo_dia