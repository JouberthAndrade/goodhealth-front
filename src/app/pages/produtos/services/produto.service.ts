import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseService } from 'src/app/shared/services/base-service.service';

import { Produto } from '../model/produto.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService extends BaseService<Produto> {

    constructor(protected injector: Injector) {
        super(environment.baseUrl + 'Produto', injector, Produto.fromJson );
    }

}