import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private facadeService: FacadeService,
  ){}

  public rol: String = "";

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    console.log("Rol: ", this.rol)
  }

}
