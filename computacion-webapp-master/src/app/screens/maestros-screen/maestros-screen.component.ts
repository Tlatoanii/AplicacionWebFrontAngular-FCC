import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
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
  public rol: String = "";

  constructor(
    public facadeService: FacadeService,
    private maestroService: MaestrosService,
    private router: Router,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
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
    // this.router.navigate(["registro-usuarios/maestro/"+idUser]);
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser, rol: 'maestro', accion: 'editar' }, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Maestro editado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Maestro no editado");
        console.log("No se editó el maestro");
      }
    });

  }

  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser, rol: 'maestro', accion: 'borrar'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Maestro eliminado");
        //Recargar página
        window.location.reload();
      }else{
        alert("Maestro no eliminado ");
        console.log("No se eliminó el maestro");
      }
    });

  }
}
