import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})

export class GraficasScreenComponent implements OnInit  {
  //Agregar chartjs-plugin-datalabels
  //Variables
  public total_user: any = {};
  public pieChartData: any;
  public pieChartOption: any;
  public doughnutChartData: any;
  public doughnutChartOption: any
  public barChartData: any;
  public barChartOption: any;
  public lineChartData: any;
  public lineChartOption: any;

  constructor(
    private administradorService: AdministradorService
  ){}

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  public iniciarGraficos(){
    //Circular
  //Circular
    console.log(this.total_user.admins, this.total_user.maestros, this.total_user.alumnos);
    this.pieChartData = {
      labels: ["Administradores", "Maestros", "Alumnos"],
      datasets: [
        {
          data:[this.total_user.admins, this.total_user.maestros, this.total_user.alumnos],
          label: 'Registro de usuarios',
          backgroundColor: [
            '#FCFF44',
            '#F1C8F2',
            '#31E731'
          ]
        }
      ]
    }
    this.pieChartOption = {
      responsive:false
    }

      // Doughnut
  this.doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[this.total_user.admins, this.total_user.maestros, this.total_user.alumnos],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#31E7E7'
        ]
      }
    ]
  }
  this.doughnutChartOption = {
    responsive:false
  }

  //Barras
  this.barChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[this.total_user.admins, this.total_user.maestros, this.total_user.alumnos],
        label: 'Registro de materias',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
          '#FB82F5',
          '#2AD84A'
        ]
      }
    ]
  }
  this.barChartOption = {
    responsive:false
  }

  //Histograma
  this.lineChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data:[this.total_user.admins, this.total_user.maestros, this.total_user.alumnos],
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }
  this.lineChartOption = {
    responsive:false
  }


}
  
  pieChartPlugins = [ DatalabelsPlugin ];
  doughnutChartPlugins = [ DatalabelsPlugin ];
  lineChartPlugins = [ DatalabelsPlugin];
  barChartPlugins = [ DatalabelsPlugin ];


  public obtenerTotalUsers(){
    this.administradorService.getTotalUsuarios().subscribe(
      (response)=>{
        this.total_user = response;
        this.iniciarGraficos();
        console.log("Total usuarios: ", this.total_user);
      }, (error)=>{
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }
}
