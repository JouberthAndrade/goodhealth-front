import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from 'src/app/shared/services/base-service.service';

import { map } from 'rxjs/operators';

import * as moment from 'moment';
import { UsuarioProduto } from '../model/usuario-produto.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioProdutoService extends BaseService<UsuarioProduto> {
  

    constructor(protected injector: Injector) {
        super(environment.baseUrl + 'Usuario/UsuarioProduto', injector, UsuarioProduto.fromJson );
    }

    


}