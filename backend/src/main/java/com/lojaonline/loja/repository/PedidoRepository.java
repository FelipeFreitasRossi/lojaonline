package com.example.loja.repository;

import com.example.loja.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // Pedidos por cliente
    List<Pedido> findByClienteId(Long clienteId);

    // Pedidos por status
    List<Pedido> findByStatus(String status);

    // Total de vendas do mês (soma dos totais)
    @Query("SELECT SUM(p.total) FROM Pedido p WHERE p.dataPedido BETWEEN :inicio AND :fim AND p.status = 'PAGO'")
    BigDecimal somaTotalPorPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

    // Quantidade de pedidos no período
    long countByDataPedidoBetween(LocalDateTime inicio, LocalDateTime fim);
}