import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent implements OnInit{

  public rol: string = "";
  public accion: String = "";

  constructor(
    private administradoresService: AdministradorService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService,
    private materiasService: MateriasService,
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    private router: Router,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;
    this.accion = this.data.accion;
    console.log("Rol modal: ", this.accion);

  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
    if(this.rol == "administrador"){
      this.administradoresService.eliminarAdmin(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );

    }else if(this.rol == "maestro"){
      this.maestrosService.eliminarMaestro(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );

    }else if(this.rol == "alumno"){
      this.alumnosService.eliminarAlumno(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
    }else if(this.rol == "materia"){
      this.materiasService.eliminarMateria(this.data.id).subscribe(
        (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      );
    }
  }

  public editarUser(){
    if(this.rol == "administrador"){
      this.router.navigate(["registro-usuarios/administrador/"+this.data.id]);
      this.dialogRef.close({isDelete:true});
    }else if(this.rol == "maestro"){
      this.router.navigate(["registro-usuarios/maestro/"+this.data.id]);
      this.dialogRef.close({isDelete:true});
    }else if(this.rol == "alumno"){
      this.router.navigate(["registro-usuarios/alumno/"+this.data.id]);
      this.dialogRef.close({isDelete:true});
    }else if(this.rol == "materia"){
      this.router.navigate(["registro-materias/"+ this.data.id]);
      this.dialogRef.close({isDelete:true});
    }
  }

}