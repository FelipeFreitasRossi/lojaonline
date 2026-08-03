import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clienteSchema, type ClienteFormData } from '../../utils/validators';
import type { Cliente } from '../../types';

interface Props {
  cliente?: Cliente | null;
  aoSalvar: (dados: ClienteFormData) => Promise<void>;
  aoCancelar: () => void;
}

const ClientForm: React.FC<Props> = ({ cliente, aoSalvar, aoCancelar }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: cliente
      ? {
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          endereco: cliente.endereco,
        }
      : {},
  });

  return (
    <form onSubmit={handleSubmit(aoSalvar)} className="flex flex-col gap-4" noValidate>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Nome</label>
        <input className="input" {...register('nome')} />
        {errors.nome && <p className="text-red-600 text-xs mt-1">{errors.nome.message}</p>}
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">E-mail</label>
        <input type="email" className="input" {...register('email')} />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Telefone</label>
        <input className="input" {...register('telefone')} />
        {errors.telefone && <p className="text-red-600 text-xs mt-1">{errors.telefone.message}</p>}
      </div>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Endereço</label>
        <input className="input" {...register('endereco')} />
        {errors.endereco && <p className="text-red-600 text-xs mt-1">{errors.endereco.message}</p>}
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

export default ClientForm;
