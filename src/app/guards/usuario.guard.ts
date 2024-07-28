import { inject } from "@angular/core";
import { Router, CanActivateFn, } from "@angular/router";
import { JWTTokenService } from "../service/jwttoken.service";

export const usuarioGuard: CanActivateFn = (route, state) => {
    const id = route.paramMap.get('id')
    const usuarioLogado = inject(JWTTokenService).getUser()
    if(id && usuarioLogado){
        console.log(usuarioLogado.id)
        console.log(parseInt(id))
        if(usuarioLogado?.role === 'admin' || usuarioLogado?.id == parseInt(id))
            return true
    }
    return inject(Router).createUrlTree(['unauthorized']);
  };