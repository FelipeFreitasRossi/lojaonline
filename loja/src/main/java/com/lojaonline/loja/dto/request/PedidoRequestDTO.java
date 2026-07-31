package com.example.loja.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoRequestDTO {

    @NotNull(message = "Cliente ID é obrigatório")
    private Long clienteId;

    private String status; // opcional, padrão PENDENTE

    @NotNull(message = "Itens do pedido são obrigatórios")
    private List<ItemPedidoRequestDTO> itens;
}