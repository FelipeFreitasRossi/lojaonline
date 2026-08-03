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
  status: 'PENDENTE' | 'PAGO' | 'ENVIADO' | 'CANCELADO';
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

export interface DashboardResumo {
  totalProdutos: number;
  totalClientes: number;
  totalPedidos: number;
  faturamentoMes: number;
  pedidosPendentes: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiError {
  message: string;
  timestamp?: string;
  status?: number;
}