import { Fornecedor } from "./fornecedor";

export interface Usuario {
  id: number;
  nome: string;
  senha?: string;
  email: string;
  telefone?: string;
  role: string;
  fornecedorId?: number;
  fornecedor?: Fornecedor;
}
