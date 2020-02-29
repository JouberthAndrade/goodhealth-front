import { Injectable, Injector } from '@angular/core';
import { Usuario } from '../model/usuarios.model';
import { environment } from '../../../../environments/environment';
import { BaseService } from 'src/app/shared/services/base-service.service';

import { map } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {
  

    constructor(protected injector: Injector) {
        super(environment.baseUrl + 'Usuario', injector, Usuario.fromJson );
    }

    
    async GetByMesAno(mes: any, ano: any) :Promise<any>  {
        const url =  `${this.apiPath}/${mes}/${ano}`;
        return this.ResultAsync<Usuario>(url, true);
    }

    async GetProdutoDia(data: any): Promise<any> {
        const apiUrl = environment.baseUrl + 'Painel';
        const url =  `${apiUrl}/${data}`;
        return this.ResultAsync<Usuario>(url, true);

    }


}

