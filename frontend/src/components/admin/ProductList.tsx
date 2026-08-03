import React, { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { useAdminCategories } from '../../hooks/useAdminCategories';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import ProductForm from './ProductForm';
import type { Produto } from '../../types';
import type { ProdutoFormData } from '../../utils/validators';
import { formatarMoeda } from '../../utils/formatters';

const ProductList: React.FC = () => {
  const { produtos, loading, criar, atualizar, excluir } = useAdminProducts();
  const { categorias } = useAdminCategories();

  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [produtoExcluindo, setProdutoExcluindo] = useState<Produto | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      const bateBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
      const bateCategoria = filtroCategoria ? String(p.categoriaId) === filtroCategoria : true;
      return bateBusca && bateCategoria;
    });
  }, [produtos, busca, filtroCategoria]);

  const abrirNovo = () => {
    setProdutoEditando(null);
    setModalFormAberto(true);
  };

  const abrirEdicao = (produto: Produto) => {
    setProdutoEditando(produto);
    setModalFormAberto(true);
  };

  const salvar = async (dados: ProdutoFormData) => {
    const payload = { ...dados, imagemUrl: dados.imagemUrl || undefined };
    if (produtoEditando) {
      await atualizar(produtoEditando.id, payload);
    } else {
      await criar(payload);
    }
    setModalFormAberto(false);
  };

  const confirmarExclusao = async () => {
    if (!produtoExcluindo) return;
    setExcluindo(true);
    try {
      await excluir(produtoExcluindo.id);
      setProdutoExcluindo(null);
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-3xl text-[#1a1a1a]">Produtos</h1>
        <button
          onClick={abrirNovo}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black"
          style={{ backgroundColor: 'var(--color-gold)' }}
        >
          <Plus size={16} /> Novo produto
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-[220px] flex items-center gap-2 border border-gray-200 rounded-lg px-3 bg-white">
          <Search size={16} className="text-gray-400" />
          <input
            className="w-full py-2.5 outline-none text-sm"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <select
          className="input bg-white w-auto"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        {loading ? (
          <LoadingSpinner texto="Carregando produtos..." />
        ) : (
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Preço</th>
                <th className="py-3 px-4">Estoque</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((produto) => (
                <tr key={produto.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 px-4">{produto.nome}</td>
                  <td className="py-3 px-4">{formatarMoeda(produto.preco)}</td>
                  <td className="py-3 px-4">{produto.quantidadeEstoque}</td>
                  <td className="py-3 px-4 text-gray-500">
                    {categorias.find((c) => c.id === produto.categoriaId)?.nome ?? '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        produto.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {produto.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => abrirEdicao(produto)}
                        aria-label={`Editar ${produto.nome}`}
                        className="p-2 text-gray-500 hover:text-black"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setProdutoExcluindo(produto)}
                        aria-label={`Excluir ${produto.nome}`}
                        className="p-2 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {produtosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        aberto={modalFormAberto}
        titulo={produtoEditando ? 'Editar produto' : 'Novo produto'}
        onFechar={() => setModalFormAberto(false)}
      >
        <ProductForm
          produto={produtoEditando}
          categorias={categorias}
          aoSalvar={salvar}
          aoCancelar={() => setModalFormAberto(false)}
        />
      </Modal>

      <Modal
        aberto={!!produtoExcluindo}
        titulo="Excluir produto"
        onFechar={() => setProdutoExcluindo(null)}
      >
        <p className="text-gray-600 mb-6">
          Tem certeza que deseja excluir <strong>{produtoExcluindo?.nome}</strong>? Essa ação não
          pode ser desfeita.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setProdutoExcluindo(null)}
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

export default ProductList;
