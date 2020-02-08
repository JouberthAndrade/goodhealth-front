import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
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
export class UsuarioProdFormComponent extends BaseFormComponent<UsuarioProduto> implements OnInit, AfterViewInit {
 

  usuarioProduto: UsuarioProduto = new UsuarioProduto();
  usuarios: Usuario[] = [];
  usuarioSelect: string;
  produtos: Produto[] = [];
  produtoSelect: string;

  produtosUsuario: Produto[] = [];

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qua', 'Qui', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
};

  constructor(
    protected injector: Injector,
    protected usuariProdutoService: UsuarioProdutoService,
    protected usuarioService: UsuarioService,
    protected produtoService: ProdutoService
  ) { super(injector, new UsuarioProduto(), usuariProdutoService, UsuarioProduto.fromJson) }

  ngAfterViewInit(): void {
   

  }
  
  ngOnInit() {
    this.loadCombos();
    super.ngOnInit();
    console.log('2-this.formBuilder:', this.formBuilder);
  }

  private async loadCombos() {
    await this.usuarioService.GetAll().then( x => {
        this.usuarios = x.items;
    });

   /* 
    await this.produtoService.GetAll().then( x => {
        this.produtos = x.items;
    });
*/
  }

  afterResourceLoad(){
    console.log('1-this.resource.produtos:', this.resource.produtos);
      this.produtosUsuario = this.groupBy(this.resource.produtos);

      console.log('produtosUsuario:', this.produtosUsuario);
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

  private groupBy(myArray: any[]) : any[] {
    console.log('myarray: ', myArray );
    const group_values = myArray.reduce(function (obj, item) {
                      obj[item.descricao] = obj[item.descricao] || [];
                      obj[item.descricao].push(item);
                      return obj;
                  }, {});
    const groups = Object.keys(group_values).map(function (key) {
        return {produto: key, users: group_values[key]};
    });
    return groups;
  }

}
