package com.example.loja.service;

import com.example.loja.dto.response.DashboardResumoDTO;
import com.example.loja.repository.ClienteRepository;
import com.example.loja.repository.PedidoRepository;
import com.example.loja.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProdutoRepository produtoRepository;
    private final ClienteRepository clienteRepository;
    private final PedidoRepository pedidoRepository;

    public DashboardResumoDTO obterResumo() {
        // Total de produtos (ativos e inativos? vamos usar todos)
        Long totalProdutos = produtoRepository.count();

        // Total de clientes
        Long totalClientes = clienteRepository.count();

        // Total de pedidos
        Long totalPedidos = pedidoRepository.count();

        // Faturamento do mês (pedidos com status PAGO)
        YearMonth mesAtual = YearMonth.now();
        LocalDateTime inicioMes = mesAtual.atDay(1).atStartOfDay();
        LocalDateTime fimMes = mesAtual.atEndOfMonth().atTime(23, 59, 59);
        BigDecimal faturamentoMes = pedidoRepository.somaTotalPorPeriodo(inicioMes, fimMes);
        if (faturamentoMes == null) faturamentoMes = BigDecimal.ZERO;

        // Pedidos pendentes
        Long pedidosPendentes = pedidoRepository.findByStatus("PENDENTE").stream().count();

        return new DashboardResumoDTO(
                totalProdutos,
                totalClientes,
                totalPedidos,
                faturamentoMes,
                pedidosPendentes
        );
    }
}