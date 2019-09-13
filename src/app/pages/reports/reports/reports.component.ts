import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UsuariosModule } from '../../usuarios/usuarios.module';
import { UsuarioService } from '../../usuarios/service/usuario.service';

import currencyFormatter from 'currency-formatter';
import { tick } from '@angular/core/src/render3';
import { Usuario } from '../../usuarios/model/usuarios.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  totalUsuario: any = 0;
  totalInativo: any = 0;
  valorMes: any = 0;

  usuarioChartData: any;
  valoresChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
          ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  usuarios: Usuario[] = [];

  @ViewChild('mes') mes: ElementRef = null;
  @ViewChild('ano') ano: ElementRef = null;

  constructor(
     private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioService.GetAll()
    .then(usuarios => this.usuarios = usuarios);



  }

  gerarRelatorio(){
    const mesSelecionado = this.mes.nativeElement.value;
    const anoSelecionado = this.ano.nativeElement.value;

    if(!mesSelecionado || !anoSelecionado)
      alert("Erro")
    else
      this.usuarioService.GetByMesAno(mesSelecionado, anoSelecionado)
      .then(
        this.setValues.bind(this)
      )
  }

  private setValues(usuarios: Usuario[]) {
    this.usuarios = usuarios;
    this.totalUsuario = usuarios.filter(x => x.ativo).length;
    this.totalInativo = usuarios.filter(x => !x.ativo).length;
    this.setChartData();

  }

  private setChartData() {
    this.usuarioChartData = this.getChartData('Gráfico de Novos Usuários', '#9CCC65')
  }

  private getChartData(title: string, color: string) {
    const chartData = [];
    const group = this.groupBy(this.usuarios.filter(x => x.ativo), 'nomeEmpresa');
    group.forEach((grupo, i) => {
      let filter: Usuario[] = grupo;
      chartData.push({
        label:  filter[0].nomeEmpresa,
        total: filter.length   
      });

    });

    return {
      labels: chartData.map(x => x.label),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(x => x.total)
      }]
    }
  }

  private groupBy(arr, prop) : any[] {
    const map = new Map(Array.from(arr, obj => [obj[prop], []]));
    arr.forEach(obj => map.get(obj[prop]).push(obj));
    return Array.from(map.values());
  }
}
