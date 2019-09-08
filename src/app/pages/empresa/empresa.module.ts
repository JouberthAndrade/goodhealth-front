import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { EmpresaRoutingModule } from './empresa-rouding.module';
import { ListaEmpresaComponent } from './lista-empresa/lista-empresa.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';

import {EmpresaService} from './service/empresa.service';

@NgModule({
  declarations: [ListaEmpresaComponent, EmpresaFormComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
      EmpresaService,
  ]
})
export class EmpresaModule { }