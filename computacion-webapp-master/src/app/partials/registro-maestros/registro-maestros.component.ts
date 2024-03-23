import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaestrosService } from 'src/app/services/maestros.service';
declare var $:any;


@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit{
  @Input() rol:string = "";
  public editar:boolean = false;
  public errors:any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public maestro:any = {};
  public area: string= "Desarrollo Web";
  // public editar:boolean = false;

  // public errors:any = {};

  public materias:any[]= [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

  constructor(
    private maestrosService: MaestrosService,
    private router: Router
    ){
  }

  ngOnInit(): void {
    this.maestro = this.maestrosService.esquemaMaestro();
    this.maestro.rol = this.rol;
    this.maestro.area_investigacion = this.area;
    console.log("Maestro: ", this.maestro.area_investigacion);

  }
  

  public checkboxChange(event: any) {
    if (event.checked) {
        // Concatenar el valor del checkbox con una coma y espacio
        this.maestro.materias += (this.maestro.materias ? ', ' : '') + event.source.value;
    } else {
        // Eliminar el valor del checkbox de la cadena de materias
        this.maestro.materias = this.maestro.materias.replace(event.source.value, '').replace(', ,', ',');
    }
    // Eliminar comas adicionales al principio y al final
    this.maestro.materias = this.maestro.materias.replace(/^, |, $/g, '');
}


  

  public regresar(){

  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("No retorne falso")
    // Se valida la contraseña
   if (this.maestro.password == this.maestro.confirmar_password){
    // Se consume el servicio para consumir el API de registro
    // Siempre y cuando las contraseñas ingresadasd conincidan
    this.maestrosService.registrarMaestro(this.maestro).subscribe(
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
    this.maestro.password = "";
    this.maestro.confirmar_password = ""; 
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
    
    this.maestro.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.maestro.fecha_nacimiento);
  }


}
