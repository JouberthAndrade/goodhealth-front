import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import environment from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../model/empresa.model';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService extends AppService<Empresa> {

    constructor(http: HttpClient) {
        super(http);
        this.url = environment.baseUrl;
    }

    async GetById(id: string): Promise<any> {
        var model = await this.getAsync<any>(`Empresa/${id}`);
        return <Empresa>model;
    }

    async GetAll(): Promise<any> {
        return await this.getAsync<any>(`Empresa`);
    }

    async Save(empresa: Empresa) : Promise<any> {
        return this.postPathUrlAsync(environment.baseUrl + 'Empresa', empresa);
    }

    async Update(empresa: Empresa) {
        return this.postPathUrlAsync(environment.baseUrl + 'Empresa', empresa);
    }

    async Delete(id: string): Promise<any>{
        return await this.deleteAsync(`Empresa/${id}`);
    }
}