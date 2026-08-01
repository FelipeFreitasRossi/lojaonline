package com.example.loja.repository;

import com.example.loja.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    // Listar apenas produtos ativos (para vitrine)
    List<Produto> findByAtivoTrue();

    // Buscar produtos ativos por nome (contém) ou categoria
    @Query("SELECT p FROM Produto p WHERE p.ativo = true AND " +
            "(LOWER(p.nome) LIKE LOWER(CONCAT('%', :termo, '%')) OR " +
            "LOWER(p.categoria.nome) LIKE LOWER(CONCAT('%', :termo, '%')))")
    List<Produto> buscarAtivosPorTermo(@Param("termo") String termo);

    // Filtrar por faixa de preço (produtos ativos)
    List<Produto> findByAtivoTrueAndPrecoBetween(BigDecimal precoMin, BigDecimal precoMax);

    // Buscar todos (para admin)
    List<Produto> findAll();
}