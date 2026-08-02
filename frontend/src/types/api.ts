export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  categoriaId: number;
  categoriaNome?: string;
  imagemUrl?: string;
  ativo: boolean;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export interface Pedido {
  id: number;
  clienteId: number;
  clienteNome: string;
  dataPedido: string;
  status: string;
  total: number;
  itens: ItemPedido[];
}

export interface ItemPedido {
  id: number;
  produtoId: number;
  produtoNome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}