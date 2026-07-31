package com.example.loja.controller;

import com.example.loja.dto.request.CategoriaRequestDTO;
import com.example.loja.dto.response.CategoriaResponseDTO;
import com.example.loja.service.CategoriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;

    // Público
    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaResponseDTO>> listarCategorias() {
        return ResponseEntity.ok(categoriaService.listarTodas());
    }

    // Admin
    @GetMapping("/admin/categorias/todos")
    public ResponseEntity<List<CategoriaResponseDTO>> listarTodasAdmin() {
        return ResponseEntity.ok(categoriaService.listarTodasAdmin());
    }

    @PostMapping("/admin/categorias")
    public ResponseEntity<CategoriaResponseDTO> criarCategoria(@Valid @RequestBody CategoriaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.criar(dto));
    }

    @PutMapping("/admin/categorias/{id}")
    public ResponseEntity<CategoriaResponseDTO> atualizarCategoria(@PathVariable Long id,
                                                                   @Valid @RequestBody CategoriaRequestDTO dto) {
        return ResponseEntity.ok(categoriaService.atualizar(id, dto));
    }

    @DeleteMapping("/admin/categorias/{id}")
    public ResponseEntity<Void> deletarCategoria(@PathVariable Long id) {
        categoriaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}