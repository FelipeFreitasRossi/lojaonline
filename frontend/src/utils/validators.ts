// Aqui ficam as "regras" que os formulários precisam seguir.
// O Zod verifica se o que a pessoa digitou está certo antes de enviar pra API.
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Informe o usuário'),
  password: z.string().min(1, 'Informe a senha'),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const produtoSchema = z.object({
  nome: z.string().min(2, 'O nome precisa ter pelo menos 2 letras'),
  descricao: z.string().min(1, 'Descreva o produto'),
  preco: z.coerce.number().positive('O preço precisa ser maior que zero'),
  quantidadeEstoque: z.coerce
    .number()
    .int('A quantidade precisa ser um número inteiro')
    .min(0, 'A quantidade não pode ser negativa'),
  categoriaId: z.coerce.number().int().positive('Escolha uma categoria'),
  imagemUrl: z.string().url('Informe uma URL válida').optional().or(z.literal('')),
  ativo: z.boolean(),
});
export type ProdutoFormData = z.infer<typeof produtoSchema>;

export const categoriaSchema = z.object({
  nome: z.string().min(2, 'O nome precisa ter pelo menos 2 letras'),
  descricao: z.string().min(1, 'Descreva a categoria'),
});
export type CategoriaFormData = z.infer<typeof categoriaSchema>;

export const clienteSchema = z.object({
  nome: z.string().min(2, 'O nome precisa ter pelo menos 2 letras'),
  email: z.string().email('Informe um e-mail válido'),
  telefone: z.string().min(8, 'Informe um telefone válido'),
  endereco: z.string().min(5, 'Informe um endereço válido'),
});
export type ClienteFormData = z.infer<typeof clienteSchema>;
