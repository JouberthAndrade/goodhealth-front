import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseFormComponent } from '../../../shared/components/base-form/base-form.component';

import { Empresa } from '../model/empresa.model';
import { EmpresaService } from '../service/empresa.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent extends BaseFormComponent<Empresa> {
  protected afterResourceLoad(): void {
    throw new Error("Method not implemented.");
  }


  empresa: Empresa = new Empresa();

  constructor(protected empresaService: EmpresaService,protected injector: Injector) { 
    super(injector, new Empresa(), empresaService, Empresa.fromJson)
  }

  protected buildResourceForm(): void {
    this.baseForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de Nova Empresa";
  }

  protected editionPageTitle(): string {
    const empresaNome = this.resource.nome || "";
    return "Editando Empresa: " + empresaNome  ;
  }
}
