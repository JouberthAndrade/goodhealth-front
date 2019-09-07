import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuarios.model';
import { element } from '@angular/core/src/render3';

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
  }

  deleteUser(usuario: Usuario) {
      const isDelete = confirm('Deseja deletar o usuário?');

      if(isDelete)  {
        this.usuarioService.Delete(usuario.id).then(
          () => this.model = this.model.filter(element => element != usuario)
        );
      }
  }


}
