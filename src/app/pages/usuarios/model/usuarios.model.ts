import { Empresa } from '../../empresa/model/empresa.model';

export class Usuario {
    constructor(
        
    ) {}
    public id: string;
    public nome: string;
    public email: string;
    public telefone: string;
    public ativo: string; 

    public empresa: Empresa;
    public idEmpresa: string;
}
