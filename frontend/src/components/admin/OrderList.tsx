import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Trash2, Search, X } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { useClients } from '../../hooks/useClients';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatarMoeda, formatarData, statusLabel, statusCor } from '../../utils/formatters';
import type { Cliente, Produto } from '../../types';
import type { NovoPedidoInput } from '../../hooks/useOrders';

const OrderList: React.FC = () => {
  const { pedidos, loading, criar, excluir } = useOrders();
  const { clientes } = useClients();
  const { produtos } = useAdminProducts();

  const [busca, setBusca] = useState('');
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [excluindoPedido, setExcluindoPedido] = useState<number | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  const filtrados = useMemo(
    () => pedidos.filter((p) => p.clienteNome.toLowerCase().includes(busca.toLowerCase())),
    [pedidos, busca]
  );

  const confirmarExclusao = async () => {
    if (excluindoPedido === null) return;
    setExcluindo(true);
    try {
      await excluir(excluindoPedido);
      setExcluindoPedido(null);
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-3xl text-[#1a1a1a]">Pedidos</h1>
        <button
          onClick={() => setModalNovoAberto(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black"
          style={{ backgroundColor: 'var(--color-gold)' }}
        >
          <Plus size={16} /> Novo pedido
        </button>
      </div>

      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 bg-white mb-5 max-w-sm">
        <Search size={16} className="text-gray-400" />
        <input
          className="w-full py-2.5 outline-none text-sm"
          placeholder="Buscar por cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        {loading ? (
          <LoadingSpinner texto="Carregando pedidos..." />
        ) : (
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((pedido) => (
                <tr key={pedido.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 px-4">{pedido.clienteNome}</td>
                  <td className="py-3 px-4 text-gray-500">{formatarData(pedido.dataPedido)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusCor[pedido.status]}`}>
                      {statusLabel[pedido.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{formatarMoeda(pedido.total)}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/pedidos/${pedido.id}`}
                        aria-label={`Ver pedido de ${pedido.clienteNome}`}
                        className="p-2 text-gray-500 hover:text-black"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => setExcluindoPedido(pedido.id)}
                        aria-label={`Excluir pedido de ${pedido.clienteNome}`}
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
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal aberto={modalNovoAberto} titulo="Novo pedido" onFechar={() => setModalNovoAberto(false)}>
        <NovoPedidoForm
          clientes={clientes}
          produtos={produtos}
          aoSalvar={async (dados) => {
            await criar(dados);
            setModalNovoAberto(false);
          }}
          aoCancelar={() => setModalNovoAberto(false)}
        />
      </Modal>

      <Modal aberto={excluindoPedido !== null} titulo="Excluir pedido" onFechar={() => setExcluindoPedido(null)}>
        <p className="text-gray-600 mb-6">Tem certeza que deseja excluir este pedido?</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setExcluindoPedido(null)}
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

// Formulário de criação de pedido: escolhe um cliente e monta uma lista de produtos + quantidades.
const NovoPedidoForm: React.FC<{
  clientes: Cliente[];
  produtos: Produto[];
  aoSalvar: (dados: NovoPedidoInput) => Promise<void>;
  aoCancelar: () => void;
}> = ({ clientes, produtos, aoSalvar, aoCancelar }) => {
  const [clienteId, setClienteId] = useState('');
  const [itens, setItens] = useState<{ produtoId: string; quantidade: number }[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  const adicionarItem = () => setItens((v) => [...v, { produtoId: '', quantidade: 1 }]);
  const removerItem = (idx: number) => setItens((v) => v.filter((_, i) => i !== idx));
  const alterarItem = (idx: number, campo: 'produtoId' | 'quantidade', valor: string) => {
    setItens((v) =>
      v.map((item, i) =>
        i === idx ? { ...item, [campo]: campo === 'quantidade' ? Number(valor) : valor } : item
      )
    );
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (!clienteId) {
      setErro('Selecione um cliente.');
      return;
    }
    if (itens.length === 0 || itens.some((i) => !i.produtoId || i.quantidade < 1)) {
      setErro('Adicione ao menos um produto com quantidade válida.');
      return;
    }
    setSalvando(true);
    try {
      await aoSalvar({
        clienteId: Number(clienteId),
        itens: itens.map((i) => ({ produtoId: Number(i.produtoId), quantidade: i.quantidade })),
      });
    } catch {
      setErro('Não foi possível criar o pedido. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={enviar} className="flex flex-col gap-4">
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Cliente</label>
        <select className="input" value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
          <option value="">Selecione...</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-gray-600">Produtos</label>
          <button
            type="button"
            onClick={adicionarItem}
            className="text-xs flex items-center gap-1 text-gray-600 hover:text-black"
          >
            <Plus size={14} /> Adicionar produto
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {itens.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <select
                className="input flex-1"
                value={item.produtoId}
                onChange={(e) => alterarItem(idx, 'produtoId', e.target.value)}
              >
                <option value="">Produto...</option>
                {produtos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                className="input w-20"
                value={item.quantidade}
                onChange={(e) => alterarItem(idx, 'quantidade', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removerItem(idx)}
                aria-label="Remover item"
                className="p-2 text-gray-400 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {itens.length === 0 && <p className="text-xs text-gray-400">Nenhum produto adicionado ainda.</p>}
        </div>
      </div>

      {erro && <p className="text-red-600 text-sm">{erro}</p>}

      <div className="flex gap-3 justify-end mt-2">
        <button
          type="button"
          onClick={aoCancelar}
          className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={salvando}
          className="px-4 py-2 rounded-lg text-sm font-medium text-black disabled:opacity-60"
          style={{ backgroundColor: 'var(--color-gold)' }}
        >
          {salvando ? 'Criando...' : 'Criar pedido'}
        </button>
      </div>
    </form>
  );
};

export default OrderList;
