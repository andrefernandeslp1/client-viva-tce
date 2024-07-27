export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagens: Array<String>;
  fornecedorId: number;
}
