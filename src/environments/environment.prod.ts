import { ClientSettings } from "./abstracts/client-settings.prod";


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    // tslint:disable-next-line:quotemark
    databaseName: "dbGoodHealth",
    databaseVersion: 1,
    production: false,
    versionBase: 'v1/',
    baseUrl: 'http://localhost:5101/api/',
    instrumentationKey: '',
    devAuthUrl: "http://localhost:5009/connect/dev-token",
    clientSettings: new ClientSettings(),
    shouldUseAcc: true,
    shouldNotUseSecurity: false,
    baseUrlHub: "http://localhost:5000/",
    baseUrlHubCore: "http://localhost:5000/",
    baseUrlHubDadosClinicos: "http://localhost:5006/",
    baseUrlHubFinanceiro: "http://localhost:5004/",
    baseUrlAtendimento: "http://localhost:5000/api/",
    baseUrlPaciente: "http://localhost:5000/api/",
    baseUrlCore: "http://localhost:5000/api/",
    baseUrlFront: "http://localhost:4000/",
    baseUrlFinanceiro: "http://localhost:5004/api/",
    baseUrlSolicitacao: "http://localhost:5000/api/",
    baseUrlDadosClinicos: "http://localhost:5006/api/",
    baseUrlRelatorios: "http://localhost:5001/",
    urlClinic: "https://unimedbh.globalhealth.mv/unimedbh/api/v1/",
    loginClinic: "adm001125696",
    passwordClinic: "teste123",
    urlClinicComponente: "https://unimedbh.globalhealth.mv/clinic"
};

export default environment;
