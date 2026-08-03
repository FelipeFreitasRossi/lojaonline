import React, { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useClients } from '../../hooks/useClients';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import ClientForm from './ClientForm';
import type { Cliente } from '../../types';
import type { ClienteFormData } from '../../utils/validators';

const ClientList: React.FC = () => {
  const { clientes, loading, criar, atualizar, excluir } = useClients();
  const [busca, setBusca] = useState('');
  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [excluindoCli, setExcluindoCli] = useState<Cliente | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  const filtrados = useMemo(
    () => clientes.filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase())),
    [clientes, busca]
  );

  const salvar = async (dados: ClienteFormData) => {
    if (editando) {
      await atualizar(editando.id, dados);
    } else {
      await criar(dados);
    }
    setModalFormAberto(false);
  };

  const confirmarExclusao = async () => {
    if (!excluindoCli) return;
    setExcluindo(true);
    try {
      await excluir(excluindoCli.id);
      setExcluindoCli(null);
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-3xl text-[#1a1a1a]">Clientes</h1>
        <button
          onClick={() => {
            setEditando(null);
            setModalFormAberto(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black"
          style={{ backgroundColor: 'var(--color-gold)' }}
        >
          <Plus size={16} /> Novo cliente
        </button>
      </div>

      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 bg-white mb-5 max-w-sm">
        <Search size={16} className="text-gray-400" />
        <input
          className="w-full py-2.5 outline-none text-sm"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        {loading ? (
          <LoadingSpinner texto="Carregando clientes..." />
        ) : (
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">Telefone</th>
                <th className="py-3 px-4">Endereço</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((cliente) => (
                <tr key={cliente.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 px-4">{cliente.nome}</td>
                  <td className="py-3 px-4 text-gray-500">{cliente.email}</td>
                  <td className="py-3 px-4 text-gray-500">{cliente.telefone}</td>
                  <td className="py-3 px-4 text-gray-500">{cliente.endereco}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditando(cliente);
                          setModalFormAberto(true);
                        }}
                        aria-label={`Editar ${cliente.nome}`}
                        className="p-2 text-gray-500 hover:text-black"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setExcluindoCli(cliente)}
                        aria-label={`Excluir ${cliente.nome}`}
                        className="p-2 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        aberto={modalFormAberto}
        titulo={editando ? 'Editar cliente' : 'Novo cliente'}
        onFechar={() => setModalFormAberto(false)}
      >
        <ClientForm cliente={editando} aoSalvar={salvar} aoCancelar={() => setModalFormAberto(false)} />
      </Modal>

      <Modal aberto={!!excluindoCli} titulo="Excluir cliente" onFechar={() => setExcluindoCli(null)}>
        <p className="text-gray-600 mb-6">
          Tem certeza que deseja excluir <strong>{excluindoCli?.nome}</strong>?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setExcluindoCli(null)}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={confirmarExclusao}
            disabled={excluindo}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white disabled:opacity-60"
          >
            {excluindo ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ClientList;
