import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'usuarios', loadChildren: './pages/usuarios/usuarios.module#UsuariosModule'},
  { path: 'empresas', loadChildren: './pages/empresa/empresa.module#EmpresaModule'},
  { path: 'usuario-produtos', loadChildren: './pages/usuario-produtos/usuario-produtos.module#UsuarioProdutosModule'},
  { path: 'relatorios', loadChildren: './pages/reports/reports.module#ReportsModule'},

  { path: '', redirectTo: '/relatorios', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
