import { OnInit, AfterContentChecked , Injector} from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { BaseModel} from '../../models/base-model';
import { BaseService} from '../../services/base-service.service';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';


export abstract class BaseFormComponent<T extends BaseModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  baseForm: FormGroup;
  pageTitle: string;
  serverErroMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected baseService: BaseService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
    
  ) { 
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == 'new') 
      this.createResource(); 
    else //edit
      this.updateResource();
  }

  // PRIVADOS 
  
  protected setCurrentAction() {
    this.currentAction = this.route.snapshot.url[0].path == 'new' ? 'new' : 'edit';
  }

  protected setTitle() {
    if(this.currentAction == 'new') 
      this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }    
  }

  protected editionPageTitle(): string {
        return 'Edição';
  }

  protected  creationPageTitle(): string {
    return 'Novo';
  }

  protected loadResource() {
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.baseService.GetById(params.get('id')))
      )
      .subscribe(
        (resource) => {
          console.log('RESOURCE:', resource);
          this.resource = resource;
          this.baseForm.patchValue(resource); 
          this.afterResourceLoad();
        },
        (error) => alert('Erro')
      )
    }
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.baseForm.value);

    this.baseService.Save(resource)
      .then(
        resource => this.actionsForSuccess(resource.data),
        error => this.actionForError(error)
      )
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.baseForm.value);

    resource.id = this.resource.id;
    this.baseService.Update(resource)
      .then(
        resource => this.actionsForSuccess(resource),
        error => this.actionForError(error)
      )

  }

  protected actionForError(error: any) {
    toastr.error('Ocorreu um erro ao realizar a solicitação no servidor.');
    this.submittingForm = false;

    if(error.status === 422)
      this.serverErroMessages = JSON.parse(error._body).errors;
    else
      this.serverErroMessages = ['Falha na comunicação com o servidor.']
  }

  private actionsForSuccess(resource: any) {
    toastr.success("Registro salvo com sucesso!");
    
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    // redirecionando para edição 
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
    )
  }

  protected abstract buildResourceForm(): void;

  protected abstract afterResourceLoad():void;

}
