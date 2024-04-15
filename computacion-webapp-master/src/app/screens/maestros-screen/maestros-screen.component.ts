import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-maestros-screen',
  templateUrl: './maestros-screen.component.html',
  styleUrls: ['./maestros-screen.component.scss']
})
export class MaestrosScreenComponent {
  public name_user:string = "";
  public lista_maestro:any[]= [];

  constructor(
    public facadeService: FacadeService,
    private maestroService: MaestrosService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();

    this.obtenerAdmins();
  }

  //Obtener la lista de administradores
  //Obtener lista de usuarios
  public obtenerAdmins(){
    this.maestroService.obtenerListaMaestros().subscribe(
      (response)=>{
        this.lista_maestro = response;
        console.log("Lista users: ", this.lista_maestro);
      }, (error)=>{
        alert("No se pudo obtener la lista de maestros");
      }
    );
  }

  //Funcion para editar
  public goEditar(idUser: number){
    this.router.navigate(["registro/"+idUser]);
  }

  public delete(idUser: number){

  }
}
