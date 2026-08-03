import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAdminCategories } from '../../hooks/useAdminCategories';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import CategoryForm from './CategoryForm';
import type { Categoria } from '../../types';
import type { CategoriaFormData } from '../../utils/validators';

const CategoryList: React.FC = () => {
  const { categorias, loading, criar, atualizar, excluir } = useAdminCategories();

  const [modalFormAberto, setModalFormAberto] = useState(false);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [excluindoCat, setExcluindoCat] = useState<Categoria | null>(null);
  const [excluindo, setExcluindo] = useState(false);

  const salvar = async (dados: CategoriaFormData) => {
    if (editando) {
      await atualizar(editando.id, dados);
    } else {
      await criar(dados);
    }
    setModalFormAberto(false);
  };

  const confirmarExclusao = async () => {
    if (!excluindoCat) return;
    setExcluindo(true);
    try {
      await excluir(excluindoCat.id);
      setExcluindoCat(null);
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-3xl text-[#1a1a1a]">Categorias</h1>
        <button
          onClick={() => {
            setEditando(null);
            setModalFormAberto(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black"
          style={{ backgroundColor: 'var(--color-gold)' }}
        >
          <Plus size={16} /> Nova categoria
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        {loading ? (
          <LoadingSpinner texto="Carregando categorias..." />
        ) : (
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Descrição</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 px-4">{cat.nome}</td>
                  <td className="py-3 px-4 text-gray-500">{cat.descricao}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditando(cat);
                          setModalFormAberto(true);
                        }}
                        aria-label={`Editar ${cat.nome}`}
                        className="p-2 text-gray-500 hover:text-black"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setExcluindoCat(cat)}
                        aria-label={`Excluir ${cat.nome}`}
                        className="p-2 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categorias.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-400">
                    Nenhuma categoria cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        aberto={modalFormAberto}
        titulo={editando ? 'Editar categoria' : 'Nova categoria'}
        onFechar={() => setModalFormAberto(false)}
      >
        <CategoryForm categoria={editando} aoSalvar={salvar} aoCancelar={() => setModalFormAberto(false)} />
      </Modal>

      <Modal aberto={!!excluindoCat} titulo="Excluir categoria" onFechar={() => setExcluindoCat(null)}>
        <p className="text-gray-600 mb-6">
          Tem certeza que deseja excluir <strong>{excluindoCat?.nome}</strong>?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setExcluindoCat(null)}
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

export default CategoryList;
