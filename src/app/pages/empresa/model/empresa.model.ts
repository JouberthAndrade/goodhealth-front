export class Empresa {
    constructor(
        
    ) {}
    public id: string;
    public nome: string;
    public ativo: string; 


    static fromJson(jsonData: any): Empresa {
        return Object.assign(new Empresa(), jsonData);
    }
}