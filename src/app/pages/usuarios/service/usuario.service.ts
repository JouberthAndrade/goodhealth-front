import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuarios.model';
import { AppService } from 'src/app/app.service';
import environment from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends AppService<Usuario> {

    constructor(http: HttpClient) {
        super(http);
        this.url = environment.baseUrl;
    }

    async BuscarUsuario(login: string): Promise<any> {
        return await this.getAsync<any>(`Usuario/ObterUsuarioPorLogin/${login}`);
    }

    async GetAll(): Promise<any> {
        return await this.getAsync<any>(`Usuario`);
    }
}

