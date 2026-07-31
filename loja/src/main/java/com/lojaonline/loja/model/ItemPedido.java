package com.example.loja.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "itens_pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @NotNull
    @Min(value = 1, message = "Quantidade mínima é 1")
    @Column(nullable = false)
    private Integer quantidade;

    @NotNull
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precoUnitario; // Preço do produto no momento do pedido

    // Construtores, getters e setters gerados pelo Lombok
}