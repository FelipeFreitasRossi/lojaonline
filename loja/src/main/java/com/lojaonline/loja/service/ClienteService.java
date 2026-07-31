package com.example.loja.service;

import com.example.loja.dto.request.ClienteRequestDTO;
import com.example.loja.dto.response.ClienteResponseDTO;
import com.example.loja.model.Cliente;
import com.example.loja.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    private ClienteResponseDTO toResponseDTO(Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getTelefone(),
                cliente.getEndereco()
        );
    }

    public List<ClienteResponseDTO> listarTodos() {
        return clienteRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ClienteResponseDTO criar(ClienteRequestDTO dto) {
        // Verifica se e-mail já existe
        if (clienteRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }
        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEndereco(dto.getEndereco());
        Cliente salvo = clienteRepository.save(cliente);
        return toResponseDTO(salvo);
    }

    @Transactional
    public ClienteResponseDTO atualizar(Long id, ClienteRequestDTO dto) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        // Se o email foi alterado, verifica se já existe outro com esse email
        if (!cliente.getEmail().equals(dto.getEmail())) {
            if (clienteRepository.findByEmail(dto.getEmail()).isPresent()) {
                throw new RuntimeException("E-mail já cadastrado por outro cliente");
            }
        }
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEndereco(dto.getEndereco());
        Cliente atualizado = clienteRepository.save(cliente);
        return toResponseDTO(atualizado);
    }

    @Transactional
    public void deletar(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado");
        }
        clienteRepository.deleteById(id);
    }
}