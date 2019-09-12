import { Injectable, Injector } from '@angular/core';
import { Usuario } from '../model/usuarios.model';
import environment from '../../../../environments/environment';
import { BaseService } from 'src/app/shared/services/base-service.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {

    constructor(protected injector: Injector) {
        super(environment.baseUrl + 'Usuario', injector, Usuario.fromJson );
    }

}

