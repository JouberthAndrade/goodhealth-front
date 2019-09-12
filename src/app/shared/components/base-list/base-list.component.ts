import { OnInit } from '@angular/core';
import { BaseModel } from '../../models/base-model';
import { BaseService } from '../../services/base-service.service';

import toastr from 'toastr';

export abstract class BaseListComponent<T extends BaseModel> implements OnInit {

  model: T[] = [];

  constructor(protected baseService: BaseService<T>) { }

  async ngOnInit() {
     const retorno = await this.baseService.GetAll();
     this.model = retorno.items;
  }

  delete(model: BaseModel) {
      const isDelete = confirm('Deseja deletar o item?');

      if(isDelete)  {
        this.baseService.Delete(model.id).then(
          () => this.model = this.model.filter(element => element != model)
        );
        toastr.success("Registro deletado com sucesso!");
      }
  }

}
