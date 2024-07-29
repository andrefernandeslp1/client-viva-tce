import { Fornecedor } from "./fornecedor";

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: string;
  fornecedorId: number;
  fornecedor?: Fornecedor
}
