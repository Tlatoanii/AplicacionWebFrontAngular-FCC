import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';


declare var $:any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent {
  @Input() rol: string = "";
  @Input() datos_user: any = {};
  public idUser: Number = 0;
  public materia: any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  //Check
  public valoresCheckbox: any = [];
  public dias: any [] = [];

  // Datos para el DateTimePicker
  public horaInicio: Date = new Date();
  public horaFin: Date = new Date();

  public dia:any[]= [
    {value: '1', nombre: 'Lunes'},
    {value: '2', nombre: 'Martes'},
    {value: '3', nombre: 'Miercoles'},
    {value: '4', nombre: 'Jueves'},
    {value: '5', nombre: 'Viernes'},
    {value: '6', nombre: 'Sábado'}
  ]

  public programa: any[] = [
    {value: '1', viewValue: 'Ingeniería en Ciencias de la Computación'},
    {value: '2', viewValue: 'Licenciatura en Ciencias de la Computación'},
    {value: '3', viewValue: 'Ingeniería en Tecnologías de la Información'},
  ];

  constructor(
    private location : Location,
    private materiasService: MateriasService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ){ }

  ngOnInit() {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idUser);
      //Al iniciar la vista obtenemos el dato de la materia
      this.obtenerMateriaByID();
    }else{
      this.materia = this.materiasService.esquemaMateria();
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Materia: ", this.materia);
  }
  

  public obtenerMateriaByID(){
    this.materiasService.getMateriaByID(this.idUser).subscribe(
      (response)=>{
        this.materia = response;
        const [horasInicio, minutosInicio] = this.materia.horaInicio.split(':');
        const [horasFin, minutosFin] = this.materia.horaFinal.split(':');
        this.horaInicio = new Date();
        this.horaFin = new Date();
        this.horaInicio.setHours(parseInt(horasInicio, 10), parseInt(minutosInicio, 10), 0, 0);
        this.horaFin.setHours(parseInt(horasFin, 10), parseInt(minutosFin, 10), 0, 0);
        console.log("Datos user: ", this.materia);
      }, (error)=>{
        alert("No se pudieron obtener los datos del usuario para editar");
      }
    );
  }

  public regresar(){
    this.location.back();
  }
  public obtenerHoraIncio(): string {
    // Obtén solo la parte de la hora de la cadena de fecha y hora
    return this.horaInicio.toTimeString().split(' ')[0];
  }

  public obtenerHoraFin(): string {
   // Obtén solo la parte de la hora de la cadena de fecha y hora
   return this.horaFin.toTimeString().split(' ')[0];
  }

  public registrar(){
    //Validar
    this.errors = [];
    this.materia.horaInicio = this.obtenerHoraIncio();
    this.materia.horaFinal = this.obtenerHoraFin();

    console.log("Hora de date time picker",this.obtenerHoraFin());
    this.errors = this.materiasService.validarMateria(this.materia,this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    
    this.materiasService.registrarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia registrada correctamente");
        console.log("Materia registrado: ", response);
        if(this.token != ""){
          this.router.navigate(["home"]);
         }else{
           this.router.navigate(["/"]);
         }
      }, (error)=>{
        alert("No se pudo registrar usuario");
      }
    )

  }

  
  public actualizar(){
    //Validación
    this.errors = [];
    this.materia.horaInicio = this.obtenerHoraIncio();
    this.materia.horaFinal = this.obtenerHoraFin();
    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.materiasService.editarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia editado correctamente");
        console.log("Materia editada: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar la materia");
      }
    );
  }

  public checkboxChange(event:any){
    //console.log("Evento: ", event);
    if(event.checked){
      this.materia.dias.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materia.dias.forEach((dia, i) => {
        if(dia == event.source.value){
          this.materia.dias.splice(i,1)
        }
      });
    }
    console.log("Array dias: ", this.materia);
  }

  public revisarSeleccion(nombre: string){
    if(this.materia.dias){
      var busqueda = this.materia.dias.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

}
