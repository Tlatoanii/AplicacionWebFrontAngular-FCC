import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent {
  public name_user:string = "";
  public lista_materia:any[]= [];

  constructor(
    public facadeService: FacadeService,
    private router: Router,
    public dialog: MatDialog,
    private materiasService: MateriasService
  ){}


  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();

    this.obtenerAdmins();
  }

  //Obtener la lista de administradores
  //Obtener lista de usuarios
  public obtenerAdmins(){
    this.materiasService.obtenerListaMaterias().subscribe(
      (response)=>{
        this.lista_materia = response;
        console.log("Lista users: ", this.lista_materia);
      }, (error)=>{
        alert("No se pudo obtener la lista de materias");
      }
    );
  }

  public goEditar(idUser: number){
    this.router.navigate(["registro-materias/"+idUser]);
  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser, rol: 'materia'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminada");
        //Recargar página
        window.location.reload();
      }else{
        alert("Materia no eliminado ");
        console.log("No se eliminó la materia");
      }
    });
  }

}
