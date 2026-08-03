import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { produtoSchema, type ProdutoFormData } from '../../utils/validators';
import type { Produto, Categoria } from '../../types';

interface Props {
  produto?: Produto | null;
  categorias: Categoria[];
  aoSalvar: (dados: ProdutoFormData) => Promise<void>;
  aoCancelar: () => void;
}

const ProductForm: React.FC<Props> = ({ produto, categorias, aoSalvar, aoCancelar }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: produto
      ? {
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          quantidadeEstoque: produto.quantidadeEstoque,
          categoriaId: produto.categoriaId,
          imagemUrl: produto.imagemUrl ?? '',
          ativo: produto.ativo,
        }
      : { ativo: true },
  });

  return (
    <form onSubmit={handleSubmit(aoSalvar)} className="flex flex-col gap-4" noValidate>
      <Campo label="Nome" erro={errors.nome?.message}>
        <input className="input" {...register('nome')} />
      </Campo>

      <Campo label="Descrição" erro={errors.descricao?.message}>
        <textarea className="input" rows={3} {...register('descricao')} />
      </Campo>

      <div className="grid grid-cols-2 gap-4">
        <Campo label="Preço (R$)" erro={errors.preco?.message}>
          <input type="number" step="0.01" className="input" {...register('preco')} />
        </Campo>
        <Campo label="Estoque" erro={errors.quantidadeEstoque?.message}>
          <input type="number" className="input" {...register('quantidadeEstoque')} />
        </Campo>
      </div>

      <Campo label="Categoria" erro={errors.categoriaId?.message}>
        <select className="input" {...register('categoriaId')}>
          <option value="">Selecione...</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
      </Campo>

      <Campo label="URL da imagem (opcional)" erro={errors.imagemUrl?.message}>
        <input className="input" placeholder="https://..." {...register('imagemUrl')} />
      </Campo>

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" {...register('ativo')} className="w-4 h-4" />
        Produto ativo (visível na vitrine)
      </label>

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

// Pequeno componente pra não repetir label + mensagem de erro em cada campo.
const Campo: React.FC<{ label: string; erro?: string; children: React.ReactNode }> = ({
  label,
  erro,
  children,
}) => (
  <div>
    <label className="text-sm text-gray-600 mb-1 block">{label}</label>
    {children}
    {erro && <p className="text-red-600 text-xs mt-1">{erro}</p>}
  </div>
);

export default ProductForm;
