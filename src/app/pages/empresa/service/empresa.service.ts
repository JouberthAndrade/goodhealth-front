import { Injectable, Injector } from '@angular/core';
import environment from '../../../../environments/environment';
import { Empresa } from '../model/empresa.model';
import { BaseService } from 'src/app/shared/services/base-service.service';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService extends BaseService<Empresa> {

    constructor(protected injector: Injector) {
        super(environment.baseUrl + 'Empresa', injector);
    }
}