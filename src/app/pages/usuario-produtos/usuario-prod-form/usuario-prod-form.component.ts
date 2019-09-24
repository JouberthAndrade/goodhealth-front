import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { Usuario } from '../../usuarios/model/usuarios.model';
import { Empresa } from '../../empresa/model/empresa.model';
import { UsuarioService } from '../../usuarios/service/usuario.service';
import { EmpresaService } from '../../empresa/service/empresa.service';

import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';
import { UsuarioProduto } from '../model/usuario-produto.model';
import { UsuarioProdutoService } from '../service/usuario-prod.service';
import { Produto } from '../../produtos/model/produto.model';
import { ProdutoService } from '../../produtos/services/produto.service';

@Component({
  selector: 'app-usuario-prod-form',
  templateUrl: './usuario-prod-form.component.html',
  styleUrls: ['./usuario-prod-form.component.css']
})
export class UsuarioProdFormComponent extends BaseFormComponent<UsuarioProduto> implements OnInit {



  usuarioProduto: UsuarioProduto = new UsuarioProduto();
  usuarios: Usuario[] = [];
  usuarioSelect: string;
  produtos: Produto[] = [];
  produtoSelect: string;


  constructor(
    protected injector: Injector,
    protected usuariProdutoService: UsuarioProdutoService,
    protected usuarioService: UsuarioService,
    protected produtoService: ProdutoService
  ) { super(injector, new UsuarioProduto(), usuariProdutoService, UsuarioProduto.fromJson) }

  ngOnInit() {
    this.loadCombos();
    super.ngOnInit();
  }

  private async loadCombos() {
    await this.usuarioService.GetAll().then( x => {
        this.usuarios = x.items;
    });
    
    await this.produtoService.GetAll().then( x => {
        this.produtos = x.items;
    });

  }

  protected buildResourceForm(): void {
    this.baseForm = this.formBuilder.group({
        id: [null],
        idProduto: [null, [Validators.required]],
        idUsuario: [null, [Validators.required]],
        quantidade: [null, [Validators.required]],
        dataInicio:[null, [Validators.required]],
        dataFim:[null]
    });
  }

}
