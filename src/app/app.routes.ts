import { Routes } from '@angular/router';
import { ListServicoComponent } from './components/servico/list-servico/list-servico.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { FormServicoComponent } from './components/servico/form-servico/form-servico.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';
import { DetalhesServicoComponent } from './components/servico/detalhes-servico/detalhes-servico.component';
import { ListUsuarioComponent } from './components/usuario/list-usuario/list-usuario.component';
import { FormUsuarioComponent } from './components/usuario/form-usuario/form-usuario.component';
import { PerfilUsuarioComponent } from './components/usuario/perfil-usuario/perfil-usuario.component';
import { FormFornecedorComponent } from './components/fornecedor/form-fornecedor/form-fornecedor.component';
import { ListFornecedorComponent } from './components/fornecedor/list-fornecedor/list-fornecedor.component';
import { PerfilFornecedorComponent } from './components/fornecedor/perfil-fornecedor/perfil-fornecedor.component';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';

export const routes: Routes = [


  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },

  {
    path: 'login',
    component: LandingComponent,
  },

  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: 'servicos',
    loadComponent: () => import('./components/servico/list-servico/list-servico.component').then(m => m.ListServicoComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'new',
        component: FormServicoComponent,
        canActivate: [authGuard, roleGuard],
        data: {expectedRoles: ['vendedor']}
      },
      {
        path: ':id/edit',
        component: FormServicoComponent,
        canActivate: [authGuard, roleGuard],
        data: {expectedRoles: ['vendedor']}
      },
      {
        path: ':id',
        component: DetalhesServicoComponent,
        canActivate: [authGuard]
      },
    ]
  },

    // USUÁRIO
    {
      path: 'usuarios',
      loadComponent: () => import('./components/usuario/list-usuario/list-usuario.component').then(m => m.ListUsuarioComponent),
      canActivate: [authGuard, roleGuard],
      data: {expectedRoles: ['admin']},
      children: [
        {
          path: 'new',
          component: FormUsuarioComponent,
          canActivate: [authGuard, roleGuard],
          data: {expectedRoles: ['admin']}
        },
        {
          path: ':id/edit',
          component: FormUsuarioComponent,
          canActivate: [authGuard, roleGuard],
          data: {expectedRoles: ['admin', 'cliente']}
        },
        {
          path: ':id/perfil',
          component: PerfilUsuarioComponent,
          canActivate: [authGuard, roleGuard],
          data: {expectedRoles: ['admin', 'cliente']}
        },
      ]
    },

    // FORNECEDOR
    {
      path: 'fornecedores',
      loadComponent: () => import('./components/fornecedor/list-fornecedor/list-fornecedor.component').then(m => m.ListFornecedorComponent),
      canActivate: [authGuard],
      children: [
        {
          path: 'new',
          component: FormFornecedorComponent,
          canActivate: [authGuard, roleGuard],
          data: {expectedRoles: ['admin']}
        },
        {
          path: ':id/edit',
          component: FormFornecedorComponent,
          canActivate: [authGuard, roleGuard],
          data: {expectedRoles: ['admin']}
        },
        {
          path: ':id',
          component: PerfilFornecedorComponent,
          canActivate: [authGuard],
        },
      ]
    },

];
