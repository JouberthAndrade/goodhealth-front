import { Empresa } from '../../empresa/model/empresa.model';
import { BaseModel } from '../../../shared/models/base-model';

export class Usuario extends BaseModel  {
    constructor(
        
    ) {
        super();
    }

    //public id: string;
    public nome: string;
    public email: string;
    public telefone: string;
    public ativo: string; 
    public dataCadastro: string;

    public empresa: Empresa;
    public idEmpresa: string;
    public nomeEmpresa: string;


    static fromJson(jsonData: any): Usuario {
        return Object.assign(new Usuario(), jsonData);
    }
}
