import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { Usuario } from '../model/usuarios.model';
import { Empresa } from '../../empresa/model/empresa.model';
import { UsuarioService } from '../service/usuario.service';
import { EmpresaService } from '../../empresa/service/empresa.service';

import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent extends BaseFormComponent<Usuario> implements OnInit {
  protected afterResourceLoad(): void {
    throw new Error("Method not implemented.");
  }


  usuario: Usuario = new Usuario();
  empresas: Empresa[] = [];
  empresaSelect: string;

  constructor(
    protected injector: Injector,
    protected usuarioService: UsuarioService,
    protected empresaService: EmpresaService
  ) { 
    super(injector, new Usuario(), usuarioService, Usuario.fromJson)
  }

  ngOnInit() {
    this.loadEmpresas();
    super.ngOnInit();
    
  }

  private async loadEmpresas() {
    await this.empresaService.GetAll().then( x => {
        this.empresas = x.items;
       
    });
    
  }

  protected buildResourceForm() {
    this.baseForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required, Validators.minLength(5)]],
        email: [null, [Validators.required, Validators.minLength(5)]],
        idEmpresa: [null, [Validators.required]]
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de Novo Usuário";
  }

  protected editionPageTitle(): string {
    const nome = this.resource.nome || "";
    this.empresaSelect = this.resource.empresa != null ? this.resource.empresa.id : "";
    return "Editando Usuario: " + nome  ;
  }

}
