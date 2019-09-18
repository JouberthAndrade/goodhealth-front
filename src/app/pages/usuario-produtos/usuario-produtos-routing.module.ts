import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioProdFormComponent } from './usuario-prod-form/usuario-prod-form.component';
import { ListaUsuarioProdComponent } from './lista-usuario-prod/lista-usuario-prod.component';


const routes: Routes = [
  { path: '', component: ListaUsuarioProdComponent },
  { path: 'new', component: UsuarioProdFormComponent },
  { path: ':id/edit', component: UsuarioProdFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioProdutosRoutingModule { }
