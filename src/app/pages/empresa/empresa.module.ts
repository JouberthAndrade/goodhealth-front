import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';


import { EmpresaRoutingModule } from './empresa-rouding.module';
import { ListaEmpresaComponent } from './lista-empresa/lista-empresa.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';

import {EmpresaService} from './service/empresa.service';

@NgModule({
  declarations: [ListaEmpresaComponent, EmpresaFormComponent],
  imports: [
    SharedModule,
    EmpresaRoutingModule
  ],
  providers: [
      EmpresaService,
  ]
})
export class EmpresaModule { }