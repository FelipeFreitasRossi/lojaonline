import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoriaSchema, type CategoriaFormData } from '../../utils/validators';
import type { Categoria } from '../../types';

interface Props {
  categoria?: Categoria | null;
  aoSalvar: (dados: CategoriaFormData) => Promise<void>;
  aoCancelar: () => void;
}

const CategoryForm: React.FC<Props> = ({ categoria, aoSalvar, aoCancelar }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: categoria ? { nome: categoria.nome, descricao: categoria.descricao } : {},
  });

  return (
    <form onSubmit={handleSubmit(aoSalvar)} className="flex flex-col gap-4" noValidate>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Nome</label>
        <input className="input" {...register('nome')} />
        {errors.nome && <p className="text-red-600 text-xs mt-1">{errors.nome.message}</p>}
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Descrição</label>
        <textarea className="input" rows={3} {...register('descricao')} />
        {errors.descricao && <p className="text-red-600 text-xs mt-1">{errors.descricao.message}</p>}
      </div>
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
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg text-sm font-medium text-black disabled:opacity-60"
          style={{ backgroundColor: 'var(--color-gold)' }}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
