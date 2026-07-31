package com.example.loja.service;

import com.example.loja.dto.request.ProdutoRequestDTO;
import com.example.loja.dto.response.ProdutoResponseDTO;
import com.example.loja.model.Categoria;
import com.example.loja.model.Produto;
import com.example.loja.repository.CategoriaRepository;
import com.example.loja.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;

    // Converter entidade para DTO de resposta
    private ProdutoResponseDTO toResponseDTO(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco(),
                produto.getQuantidadeEstoque(),
                produto.getCategoria().getId(),
                produto.getCategoria().getNome(),
                produto.getImagemUrl(),
                produto.getAtivo()
        );
    }

    // ------ Públicos (vitrine) ------
    public List<ProdutoResponseDTO> listarAtivos() {
        return produtoRepository.findByAtivoTrue()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ProdutoResponseDTO> buscarPorTermo(String termo) {
        return produtoRepository.buscarAtivosPorTermo(termo)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ProdutoResponseDTO> filtrarPorPreco(BigDecimal min, BigDecimal max) {
        return produtoRepository.findByAtivoTrueAndPrecoBetween(min, max)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public ProdutoResponseDTO buscarPorIdPublico(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        if (!produto.getAtivo()) {
            throw new RuntimeException("Produto inativo");
        }
        return toResponseDTO(produto);
    }

    // ------ Administrativos ------
    public List<ProdutoResponseDTO> listarTodos() {
        return produtoRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProdutoResponseDTO criar(ProdutoRequestDTO dto) {
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Produto produto = new Produto();
        produto.setNome(dto.getNome());
        produto.setDescricao(dto.getDescricao());
        produto.setPreco(dto.getPreco());
        produto.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        produto.setCategoria(categoria);
        produto.setImagemUrl(dto.getImagemUrl());
        produto.setAtivo(dto.getAtivo() != null ? dto.getAtivo() : true);

        Produto salvo = produtoRepository.save(produto);
        return toResponseDTO(salvo);
    }

    @Transactional
    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        produto.setNome(dto.getNome());
        produto.setDescricao(dto.getDescricao());
        produto.setPreco(dto.getPreco());
        produto.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        produto.setCategoria(categoria);
        produto.setImagemUrl(dto.getImagemUrl());
        if (dto.getAtivo() != null) {
            produto.setAtivo(dto.getAtivo());
        }

        Produto atualizado = produtoRepository.save(produto);
        return toResponseDTO(atualizado);
    }

    @Transactional
    public void deletar(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado");
        }
        produtoRepository.deleteById(id);
    }
}