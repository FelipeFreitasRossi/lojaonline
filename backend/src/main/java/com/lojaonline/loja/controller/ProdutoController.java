package com.example.loja.controller;

import com.example.loja.dto.request.ProdutoRequestDTO;
import com.example.loja.dto.response.ProdutoResponseDTO;
import com.example.loja.service.ProdutoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    // ------ Endpoints públicos ------
    @GetMapping("/produtos")
    public ResponseEntity<List<ProdutoResponseDTO>> listarAtivos(
            @RequestParam(required = false) String termo,
            @RequestParam(required = false) BigDecimal precoMin,
            @RequestParam(required = false) BigDecimal precoMax) {
        if (termo != null && !termo.isEmpty()) {
            return ResponseEntity.ok(produtoService.buscarPorTermo(termo));
        }
        if (precoMin != null && precoMax != null) {
            return ResponseEntity.ok(produtoService.filtrarPorPreco(precoMin, precoMax));
        }
        return ResponseEntity.ok(produtoService.listarAtivos());
    }

    @GetMapping("/produtos/{id}")
    public ResponseEntity<ProdutoResponseDTO> detalheProduto(@PathVariable Long id) {
        return ResponseEntity.ok(produtoService.buscarPorIdPublico(id));
    }

    // ------ Endpoints administrativos (requerem autenticação) ------
    @GetMapping("/admin/produtos/todos")
    public ResponseEntity<List<ProdutoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(produtoService.listarTodos());
    }

    @PostMapping("/admin/produtos")
    public ResponseEntity<ProdutoResponseDTO> criarProduto(@Valid @RequestBody ProdutoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoService.criar(dto));
    }

    @PutMapping("/admin/produtos/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizarProduto(@PathVariable Long id,
                                                               @Valid @RequestBody ProdutoRequestDTO dto) {
        return ResponseEntity.ok(produtoService.atualizar(id, dto));
    }

    @DeleteMapping("/admin/produtos/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}