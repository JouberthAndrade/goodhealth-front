import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

import {UsuarioService} from './service/usuario.service';

@NgModule({
  declarations: [ListaUsuariosComponent, UsuariosFormComponent],
  imports: [
    SharedModule,
    UsuariosRoutingModule
  ],
  providers: [
      UsuarioService,
  ]
})
export class UsuariosModule { }
