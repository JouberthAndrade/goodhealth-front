import { IClientSettings } from './client-settings';

export class ClientSettings implements IClientSettings {
    public authority = 'https://accshe.unimedbh.com.br/';
    public client_id = '4f789c1b-996a-400a-b38c-4e95b935039b';
    public application_id = '4f789c1b-996a-400a-b38c-4e95b935039b';
    public redirect_uri = 'https://soldev.unimedbh.com.br/signin-oidcc';
    public post_logout_redirect_uri = 'https://soldev.unimedbh.com.br/';
    public response_type = 'id_token token';
    public scope = 'openid profile email';
    public filterProtocolClaims = true;
    public loadUserInfo = false;
    public openAMAutority = 'https://extranethml.unimedbh.com.br'
}
