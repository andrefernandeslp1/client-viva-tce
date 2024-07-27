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
import { HomeComponent } from './home/home.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';

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
  {
    path: 'viva-tce',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/viva-tce/servicos'
      },
      { path: 'servicos',
        children: [
          {
            path: '',
            component: ListServicoComponent
            //loadComponent: () => import('./components/servico/list-servico/list-servico.component').then(m => m.ListServicoComponent),
          },
          {
            path: 'new',
            component: FormServicoComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['vendedor']}
          },
          {
            path: ':id/edit',
            component: FormServicoComponent,
            canActivate: [roleGuard],
            data: {expectedRoles: ['vendedor']}
          },
          {
            path: ':id',
            component: DetalhesServicoComponent,
          },
        ]
      },

        // USUÁRIO
        {
          path: 'usuarios',
          children: [
            {
              path: '',
              loadComponent: () => import('./components/usuario/list-usuario/list-usuario.component').then(m => m.ListUsuarioComponent),
              canActivate: [roleGuard],
              data: {expectedRoles: ['admin']},
            },
            {
              path: 'new',
              component: FormUsuarioComponent,
              canActivate: [roleGuard],
              data: {expectedRoles: ['admin']}
            },
            {
              path: ':id/edit',
              component: FormUsuarioComponent,
              canActivate: [roleGuard],
              data: {expectedRoles: ['admin', 'cliente']}
            },
            {
              path: ':id/perfil',
              component: PerfilUsuarioComponent,
              canActivate: [roleGuard],
              data: {expectedRoles: ['admin', 'cliente']}
            },
          ]
        },

        // FORNECEDOR
        {
          path: 'fornecedores',
          canActivate: [authGuard],
          children: [
            {
              path: '',
              loadComponent: () => import('./components/fornecedor/list-fornecedor/list-fornecedor.component').then(m => m.ListFornecedorComponent),
            },
            {
              path: 'new',
              component: FormFornecedorComponent,
              canActivate: [roleGuard],
              data: {expectedRoles: ['admin']}
            },
            {
              path: ':id/edit',
              component: FormFornecedorComponent,
              canActivate: [roleGuard],
              data: {expectedRoles: ['admin']}
            },
            {
              path: ':id',
              component: PerfilFornecedorComponent,
            },
          ]
        },
    ]
  },

  
  { path: '**', component: PaginaNaoEncontradaComponent },

];
