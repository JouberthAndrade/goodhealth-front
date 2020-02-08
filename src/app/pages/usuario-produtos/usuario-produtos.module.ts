import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import { UsuarioProdutosRoutingModule } from './usuario-produtos-routing.module';
import { UsuarioProdFormComponent } from './usuario-prod-form/usuario-prod-form.component';

import { UsuarioProdutoService } from './service/usuario-prod.service';
import { ListaUsuarioProdComponent } from './lista-usuario-prod/lista-usuario-prod.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [UsuarioProdFormComponent, ListaUsuarioProdComponent],
  imports: [
    SharedModule,
    UsuarioProdutosRoutingModule,
    CalendarModule,
    IMaskModule
  ],
  providers: [
      UsuarioProdutoService,
  ]
})
export class UsuarioProdutosModule { }
