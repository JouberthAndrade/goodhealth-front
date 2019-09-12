import { Component } from '@angular/core';
import {EmpresaService } from '../service/empresa.service';
import { Empresa } from '../model/empresa.model';

import { BaseListComponent } from '../../../shared/components/base-list/base-list.component';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.component.html',
  styleUrls: ['./lista-empresa.component.css']
})
export class ListaEmpresaComponent extends BaseListComponent<Empresa> {

  constructor(protected empresaService: EmpresaService) { 
    super(empresaService)
  }
}
