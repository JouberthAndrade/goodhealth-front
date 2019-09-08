import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEmpresaComponent } from './lista-empresa/lista-empresa.component'
import { EmpresaFormComponent} from './empresa-form/empresa-form.component';

const routes: Routes = [
  { path: '', component: ListaEmpresaComponent },
  { path: 'new', component: EmpresaFormComponent },
  { path: ':id/edit', component: EmpresaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }