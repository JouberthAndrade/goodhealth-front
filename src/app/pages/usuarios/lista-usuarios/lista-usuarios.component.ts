import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuarios.model';
import toastr from 'toastr';
import { UsuarioDto } from '../model/usuarioDto.model';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  model: UsuarioDto[] = [];

  constructor(private usuarioService: UsuarioService) { }

  async ngOnInit() {
      let retorno = await this.usuarioService.GetAll();
      this.model = retorno.items;
  }

  deleteUser(usuario: Usuario) {
      const isDelete = confirm('Deseja deletar o usuário?');

      if(isDelete)  {
        this.usuarioService.Delete(usuario.id).then(
          () => this.model = this.model.filter(element => element.id != usuario.id)
        );
        toastr.success("Usuário deletado com sucesso!");
      }
  }


}
