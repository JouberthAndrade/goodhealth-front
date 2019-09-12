import { BaseModel } from '../models/base-model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ValidationResultModel, NotificationType } from '../../models/validations/validation-result.model';

export abstract class BaseService <T extends BaseModel> {
    protected http: HttpClient;
    protected headers: HttpHeaders;
    constructor(protected apiPath: string, 
                protected injector: Injector,
                protected jsonDataToResource: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient);
        this.headers = this.setHeaders();
    }

    protected setHeaders(): HttpHeaders {
            let headers = new HttpHeaders();

            headers = headers.set('Content-Type', 'application/json');
            headers = headers.set('Accept', 'application/json');
            headers = headers.set('Access-Control-Allow-Credentials', '*');
            headers = headers.set('Access-Control-Allow-Origin', '*');
            headers = headers.set(
                'Access-Control-Allow-Methods',
                'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            );
            headers = headers.set(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept, X-Auth-Token'
            );
            return headers;
    }

    async GetById(id: string): Promise<any> {
        const url =  `${this.apiPath}/${id}`;
        return this.ResultAsync<T>(url, true);
    }

    async GetAll(): Promise<any> {
        return this.ResultAsync<T>(this.apiPath, true);
    }

    async Save(model: T) : Promise<any> {
        return this.PostPathUrlAsync(this.apiPath, model);
    }

    async Update(model: T) {
        return this.PostPathUrlAsync(this.apiPath, model);
    }

    async Delete(id: string): Promise<any>{
        const url =  `${this.apiPath}/${id}`;
        return await this.DeleteAsync(url);
    }

    protected async PostPathUrlAsync<TModel>(
        urlMethodName: string,
        model: any
    ): Promise<TModel> {

        var result = await this.http
            .post<ValidationResultModel<TModel>>(
                urlMethodName,
                JSON.stringify(model),
                { headers: this.headers }
            )
            .toPromise();

        this.validateNotifications(result);

        return result.result;
    }

    protected async DeleteAsync(methodName: string): Promise<boolean> {

        var result = await this.http
            .delete<ValidationResultModel<T>>(methodName, {
                headers: this.headers
            })
            .toPromise();

        this.validateNotifications(result);

        return true;
    }

    private async ResultAsync<TModel>(methodName: string, showError: boolean): Promise<TModel> {
        const result = await this.http
            .get<ValidationResultModel<TModel>>(methodName, {
                headers: this.headers
            })
            .toPromise();

        this.validateNotifications(result);

        return result.result;
    }

    private validateNotifications(result: any) {
        if (result.hasNotifications || result.hasException) {
            const showError = result.notifications.find(x => x.type === NotificationType.Error) != null;
            const msgs = result.notifications.map((a) => `${a.message}`).join('\n');
            if (showError) {
                throw new Error(msgs);
            }
        }
    }

    private methodUrl(method: string): string {
        return this.apiPath.concat(method);
    }

}