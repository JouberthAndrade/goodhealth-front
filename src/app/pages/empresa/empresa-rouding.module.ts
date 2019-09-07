import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEmpresaComponent } from './lista-empresa/lista-empresa.component'

const routes: Routes = [
  { path: '', component: ListaEmpresaComponent },
 // { path: 'new', component: UsuariosFormComponent },
  //{ path: ':id/edit', component: UsuariosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }