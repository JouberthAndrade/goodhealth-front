import envProd from '../src/environments/environment.prod'
import env from '../src/environments/environment'
import * as fs from 'fs';

var production: boolean = false;

process.argv.forEach((val, index) => {
    if (index === 2){
        production = <any>val;
        console.log("PRODUCTION = " + production);
    }
});

let filename = 'appsettings.json';

console.log('generating ' + filename + '...');
let filePath = '';

if (production) {
    console.log('generating production ' + filename);
    console.log('using enviroment ' + JSON.stringify(envProd));
    if(fs.existsSync('./src/assets/' + filename))
        fs.unlinkSync('./src/assets/' + filename);
    fs.writeFileSync('./src/assets/' + filename, JSON.stringify(envProd));
}
else {
    console.log('generating debug ' + filename);
    console.log('using enviroment ' + JSON.stringify(env));
    if(fs.existsSync('./src/assets/' + filename))
        fs.unlinkSync('./src/assets/' + filename);
    fs.writeFileSync('./src/assets/' + filename, JSON.stringify(env));
}

console.log(filename + ' generated');
