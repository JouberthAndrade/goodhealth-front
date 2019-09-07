import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';

import {UsuarioService} from './service/usuario.service';

@NgModule({
  declarations: [ListaUsuariosComponent, UsuariosFormComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
      UsuarioService,
  ]
})
export class UsuariosModule { }
