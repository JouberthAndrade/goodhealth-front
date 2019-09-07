import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import environment from '../environments/environment';
import { ValidationResultModel, NotificationType } from './models/validations/validation-result.model';

@Injectable()
export class AppService<TModel> {
    protected headers: HttpHeaders;
    private version = environment.versionBase;
    protected domain = environment.baseUrl;
    protected url: string = this.domain;

    constructor(protected http: HttpClient) {
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

     // tslint:disable-next-line:no-shadowed-variable
     private async ResultAsync<TModel>(methodName: string, showError: boolean): Promise<TModel> {
        const result = await this.http
            .get<ValidationResultModel<TModel>>(methodName, {
                headers: this.headers
            })
            .toPromise();

        this.validateNotifications(result);

        return result.result;
    }

    validateNotifications(result: any) {
        if (result.hasNotifications || result.hasException) {
            const showError = result.notifications.find(x => x.type === NotificationType.Error) != null;
            const msgs = result.notifications.map((a) => `${a.message}`).join('\n');
            if (showError) {
                throw new Error(msgs);
            }
        }
    }

    // tslint:disable-next-line:no-shadowed-variable
    protected async getAsync<TModel>(methodName: string): Promise<TModel> {
        return this.ResultAsync<TModel>(this.methodUrl(methodName), true);
    }
    
    protected async postPathUrlAsync<TModel>(
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

    protected async deleteAsync(methodName: string): Promise<boolean> {

        var result = await this.http
            .delete<ValidationResultModel<TModel>>(this.methodUrl(methodName), {
                headers: this.headers
            })
            .toPromise();

        this.validateNotifications(result);

        return true;
    }

    methodUrl(method: string): string {
        return this.url.concat(method);
    }

}
