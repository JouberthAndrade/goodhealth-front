import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { Empresa } from '../model/empresa.model';
import { EmpresaService } from '../service/empresa.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  empresaForm: FormGroup;
  pageTitle: string;
  serverErroMessages: string[] = null;
  submittingForm: boolean = false;
  empresa: Empresa = new Empresa();

  constructor(
      private empresaService: EmpresaService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEmpresa();
    this.loadEmpresa();
  }
  ngAfterContentChecked(): void {
    this.setTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == 'new') 
      this.createEmpresa(); 
    else //edit
      this.updateEmpresa();
  }

  private setTitle() {
    if(this.currentAction == 'new') 
      this.pageTitle = 'Cadastro de Novo Usuário';
    else {
      const nomeEmpresa  = this.empresa.nome || "";
      this.pageTitle = 'Editando: ' + nomeEmpresa;
    }
      
  }

  private loadEmpresa() {
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.empresaService.GetById(params.get('id')))
      )
      .subscribe(
        (empresa) => {
          this.empresa = empresa;
          this.empresaForm.patchValue(this.empresa); // bind usuario from service;
        },
        (error) => alert('Erro')
      )
    }
  }

  private buildEmpresa() {
    this.empresaForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  private setCurrentAction() {
    this.currentAction = this.route.snapshot.url[0].path == 'new' ? 'new' : 'edit';
  }

  private createEmpresa() {
    const empresa: Empresa = Object.assign(new Empresa(), this.empresaForm.value);
    this.empresaService.Save(empresa)
      .then(
        empresa => this.actionsForSuccess(empresa.data),
        error => this.actionForError(error)
      )
  }
  private updateEmpresa() {
    const empresa: Empresa = Object.assign(new Empresa(), this.empresaForm.value);
    empresa.id = this.empresa.id;
    this.empresaService.Update(empresa)
      .then(
        empresa => this.actionsForSuccess(empresa),
        error => this.actionForError(error)
      )

  }

  private actionForError(error: any) {
    toastr.error('Ocorreu um erro ao realizar a solicitação no servidor.');
    this.submittingForm = false;

    if(error.status === 422)
      this.serverErroMessages = JSON.parse(error._body).errors;
    else
      this.serverErroMessages = ['Falha na comunicação com o servidor.']
  }

  private actionsForSuccess(empresa: any) {
    toastr.success("Usuário salvo com sucesso!");
    
    // redirecionando para edição 
    this.router.navigateByUrl('empresas', {skipLocationChange: true}).then(
      () => this.router.navigate(['empresas', empresa.id, 'edit'])
    )
  }

}
