import { Component, OnInit } from '@angular/core';
import {EmpresaService } from '../service/empresa.service';
import { Empresa } from '../model/empresa.model';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.component.html',
  styleUrls: ['./lista-empresa.component.css']
})
export class ListaEmpresaComponent implements OnInit {

  model: Empresa[] = [];

  constructor(private empresaService: EmpresaService) { }

  async ngOnInit() {
     const retorno = await this.empresaService.GetAll();
     this.model = retorno.items;
  }

}
