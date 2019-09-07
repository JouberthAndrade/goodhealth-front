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

    async GetById(id: string): Promise<any> {
        var model = await this.getAsync<any>(`Usuario/${id}`);
        return <Usuario>model;
    }

    async GetAll(): Promise<any> {
        return await this.getAsync<any>(`Usuario`);
    }

    async Save(usuario: Usuario) : Promise<any> {
        return this.postPathUrlAsync(environment.baseUrl + 'Usuario', usuario);
    }

    async Update(usuario: Usuario) {
        return this.postPathUrlAsync(environment.baseUrl + 'Usuario', usuario);
    }

    async Delete(id: string): Promise<any>{
        return await this.deleteAsync(`Usuario/${id}`);
    }
}

