import { IClientSettings } from './client-settings';

export class ClientSettings implements IClientSettings {
    public authority = 'https://accshe.unimedbh.com.br';
    public client_id = '3b46f6d8-6ea4-43ae-8da8-07ad1112f94e';
    public application_id = '3b46f6d8-6ea4-43ae-8da8-07ad1112f94e';
    public redirect_uri = 'http://localhost:4000/signin-oidc';
    public post_logout_redirect_uri = 'http://localhost:4000/';
    public response_type = 'id_token token';
    public scope = 'openid profile email';
    public filterProtocolClaims = true;
    public loadUserInfo = false;
    public openAMAutority = 'https://extranethml.unimedbh.com.br'
}
