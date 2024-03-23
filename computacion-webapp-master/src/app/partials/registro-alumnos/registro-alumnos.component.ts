import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
declare var $:any;


@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.component.html',
  styleUrls: ['./registro-alumnos.component.scss']
})
export class RegistroAlumnosComponent implements OnInit{
  @Input() rol:string = "";

  public alumno:any = {};
  public editar:boolean = false;
  public errors:any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';


  constructor(
    private alumnosService: AlumnosService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.alumno = this.alumnosService.esquemaAlumno();
    this.alumno.rol = this.rol;
    console.log("Alumno: ", this.alumno);

  }

  public regresar(){

  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    
    // Se valida la contraseña
   if (this.alumno.password == this.alumno.confirmar_password){
    // Se consume el servicio para consumir el API de registro
    // Siempre y cuando las contraseñas ingresadasd conincidan
    this.alumnosService.registrarAlumno(this.alumno).subscribe(
      (response) =>{
        alert("Usuario registrado correctamente")
        console.log("Usuario registrado: ", response)
        this.router.navigate(["/"]);
      }, (error)=>{
        alert("No se pudo regstrar usuarios")
      }
    );
   }else{
    alert("Las contraseñas no coinciden")
    this.alumno.password = "";
    this.alumno.confirmar_password = ""; 
   }

  }

  public actualizar(){

  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  //Función para detectar el cambio de fecha
  //Para la fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());
    
    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.alumno.fecha_nacimiento);
  }


}
