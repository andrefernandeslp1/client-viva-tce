import { inject } from "@angular/core";
import { Router, CanActivateFn, } from "@angular/router";
import { JWTTokenService } from "../service/jwttoken.service";
import { HttpClient } from "@angular/common/http";
import { ServicoService } from "../service/servico.service";
import { Servico } from "../model/servico";

export const servicoGuard: CanActivateFn = (route, state) => {
    const id = route.paramMap.get('fornecedor');
    const usuarioLogado = inject(JWTTokenService).getUser();
    if(id && usuarioLogado){
        if(usuarioLogado.role === 'admin' || parseInt(id) == usuarioLogado.fornecedorId)
            return true
    }
    return inject(Router).createUrlTree(['unauthorized']);
  };