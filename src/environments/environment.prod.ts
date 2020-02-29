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
    instrumentationKey: ''
};

export default environment;
