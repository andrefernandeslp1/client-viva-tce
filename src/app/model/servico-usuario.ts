import { Servico } from "./servico";

export interface ServicoUsuario {
  id: number;
  servicoId: number;
  servico: Servico;
  usuarioId: number;
  data: Date;
  assinatura: boolean;
}
