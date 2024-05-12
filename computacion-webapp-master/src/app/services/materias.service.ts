import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';
const httpOptions = {

// Inicio encabezados para materias
headers: new HttpHeaders({'Content-Type': 'application/json'})
};
// Fin encabezado para materias

@Injectable({
  providedIn: 'root'
})


export class MateriasService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  // Incio json que usarann materias
  public esquemaMateria(){
    return {
      'nrc':'',
      'nombre': '',
      'seccion': '',
      'dias': [],
      'horaInicio': '',
      'horaFinal': '',
      'salon': '',
      'programa': '' 
    }
  }
  // Fin json que usaran materoias

    //Validación para el formulario
    public validarMateria(data: any, editar: boolean){
      console.log("Validando materia... ", data);
      let error: any = [];
  
      if (!this.validatorService.required(data["nrc"])) {
        error["nrc"] = this.errorService.required;
      } else if (!/^\d+$/.test(data["nrc"])) {
        error["nrc"] = "Solo debes ingresar números.";
      }      
  
      if(!this.validatorService.required(data["nombre"])){
        error["nombre"] = this.errorService.required;
      }
  
      if (!this.validatorService.required(data["seccion"])) {
        error["seccion"] = this.errorService.required;
      } else if (!/^\d+$/.test(data["seccion"])) {
        error["seccion"] = "Solo debes ingresar números.";
      }      
      
      if(!this.validatorService.required(data["dias"])){
        error["dias"] = this.errorService.required;
      }
  
      if(data["dias"].length == 0){
        error["dias"] = "Al menos debes elegir un dia";
      }

      if(!this.validatorService.required(data["horaInicio"])){
        error["horaInicio"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["horaFinal"])){
        error["horaFinal"] = this.errorService.required;
      }
  
      if(!this.validatorService.required(data["salon"])){
        error["salon"] = this.errorService.required;
      }
  
      if(!this.validatorService.required(data["programa"])){
        error["programa"] = this.errorService.required;
      }
  
      console.error(error);
      //Return arreglo
      return error;
    }

    // Consultas a la API
    public registrarMateria(data: any): Observable <any>{
      return this.http.post<any>(`${environment.url_api}/materia/`, data, httpOptions);
    }

    public obtenerListaMaterias (): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.get<any>(`${environment.url_api}/lista-materia/`, {headers:headers});
    }
  
    public getMateriaByID(idUser: Number){
      return this.http.get<any>(`${environment.url_api}/materia/?id=${idUser}`,httpOptions);
    }

    public editarMateria(data: any): Observable <any>{
      var token = this.facadeService.getSessionToken();
      var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
      return this.http.put<any>(`${environment.url_api}/materia-edit/`, data, {headers:headers});
    }

      //Eliminar Maestro
  public eliminarMateria(idUser: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/materia-edit/?id=${idUser}`,{headers:headers});
  }
}
