import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuarios.model';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  model: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  async ngOnInit() {
      let retorno = await this.usuarioService.GetAll();
      this.model = retorno.items;
      console.log('model:', this.model);
  }


}
