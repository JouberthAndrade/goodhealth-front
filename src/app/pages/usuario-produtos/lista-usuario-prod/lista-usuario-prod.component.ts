import { Component, OnInit } from '@angular/core';
import { UsuarioProduto } from '../model/usuario-produto.model';
import { BaseListComponent } from 'src/app/shared/components/base-list/base-list.component';

import { UsuarioProdutoService } from '../service/usuario-prod.service';

@Component({
  selector: 'app-lista-usuario-prod',
  templateUrl: './lista-usuario-prod.component.html',
  styleUrls: ['./lista-usuario-prod.component.css']
})
export class ListaUsuarioProdComponent extends BaseListComponent<UsuarioProduto> {

  constructor( protected usuarioProdutoService: UsuarioProdutoService) { 
    super(usuarioProdutoService);
  }
  

}
