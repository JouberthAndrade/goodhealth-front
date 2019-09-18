import { BaseModel } from '../../../shared/models/base-model';

export class Produto extends BaseModel  {
    constructor(
        
    ) {
        super();
    }

    public valor: number;
    public descricao: string;
    public dataInicio: Date;
    public dataFim?: Date;
    public flagDia: string;

    static fromJson(jsonData: any): Produto {
        return Object.assign(new Produto(), jsonData);
    }
}