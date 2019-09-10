import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { Usuario } from '../model/usuarios.model';
import { UsuarioService } from '../service/usuario.service';
import { EmpresaService } from '../../empresa/service/empresa.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { Empresa } from '../../empresa/model/empresa.model';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  usuarioForm: FormGroup;
  pageTitle: string;
  serverErroMessages: string[] = null;
  submittingForm: boolean = false;
  usuario: Usuario = new Usuario();
  empresas: Empresa[] = [];
  empresaSelect: string;

  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadEmpresas();
    this.setCurrentAction();
    this.buildUsuario();
    this.loadUsuario();

    
  }

  ngAfterContentChecked(): void {
    this.setTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == 'new') 
      this.createUsuario(); 
    else //edit
      this.updateUsuario();
  }

  private setTitle() {
    if(this.currentAction == 'new') 
      this.pageTitle = 'Cadastro de Novo Usuário';
    else {
      const nomeUsuario = this.usuario.nome || "";
      this.pageTitle = 'Editando: ' + nomeUsuario;
    }
      
  }

  private async loadEmpresas() {
     await this.empresaService.GetAll().then( x => {
        this.empresas = x.items;
    });
    
  }

  private loadUsuario() {
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.usuarioService.GetById(params.get('id')))
      )
      .subscribe(
        (usuario) => {
          this.usuario = usuario;
          this.usuarioForm.patchValue(this.usuario); // bind usuario from service;
          this.empresaSelect = this.usuario.empresa.id;
          console.log('this.usuario: ', this.usuario);
          console.log('this.empresaSelect: ', this.empresaSelect);
        },
        (error) => alert('Erro')
      )
    }
  }

  private buildUsuario() {
    this.usuarioForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required, Validators.minLength(5)]],
        email: [null, [Validators.required, Validators.minLength(5)]],
        idEmpresa: [null, [Validators.required]]
    });
  }

  private setCurrentAction() {
    this.currentAction = this.route.snapshot.url[0].path == 'new' ? 'new' : 'edit';
  }

  private createUsuario() {
    const usuario: Usuario = Object.assign(new Usuario(), this.usuarioForm.value);
    usuario.idEmpresa = this.empresaSelect;
    this.usuarioService.Save(usuario)
      .then(
        usuario => this.actionsForSuccess(usuario.data),
        error => this.actionForError(error)
      )
  }

  private updateUsuario() {
    const usuario: Usuario = Object.assign(new Usuario(), this.usuarioForm.value);
    usuario.id = this.usuario.id;
    usuario.idEmpresa = this.empresaSelect;
    this.usuarioService.Update(usuario)
      .then(
        usuario => this.actionsForSuccess(usuario),
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

  private actionsForSuccess(usuario: any) {
    toastr.success("Usuário salvo com sucesso!");
    
    // redirecionando para edição 
    this.router.navigateByUrl('usuarios', {skipLocationChange: true}).then(
      () => this.router.navigate(['usuarios', usuario.id, 'edit'])
    )
  }
  
  public selectItem(event: any) {
    //console.log('empresaSelect: ', this.empresaSelect);
    //this.empresaSelect = event;
    //console.log('event: ', event);
    //console.log('empresaSelect: ', this.empresaSelect);
    
  }

  

}
