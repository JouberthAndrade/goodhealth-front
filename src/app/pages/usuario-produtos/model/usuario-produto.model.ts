import { Empresa } from '../../empresa/model/empresa.model';
import { BaseModel } from '../../../shared/models/base-model';
import { Usuario } from '../../usuarios/model/usuarios.model';
import { Produto } from '../../produtos/model/produto.model';

export class UsuarioProduto extends Usuario  {
    constructor(
        
    ) {
        super();
    }

    public qtdDiasSemana: number;
    public valorTotal: number;
    
    public produtos: Produto[];

    static fromJson(jsonData: any): UsuarioProduto {
        return Object.assign(new UsuarioProduto(), jsonData);
    }
}