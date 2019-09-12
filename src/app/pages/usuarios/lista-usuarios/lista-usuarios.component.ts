import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuarios.model';
import { UsuarioDto } from '../model/usuarioDto.model';

import { BaseListComponent } from '../../../shared/components/base-list/base-list.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent extends BaseListComponent<Usuario> {

  constructor(protected usuarioService: UsuarioService) { 
    super(usuarioService);
  }

}
