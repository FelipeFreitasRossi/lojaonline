package com.example.loja.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResumoDTO {
    private Long totalProdutos;
    private Long totalClientes;
    private Long totalPedidos;
    private BigDecimal faturamentoMes; // pedidos com status PAGO no mês atual
    private Long pedidosPendentes;
}