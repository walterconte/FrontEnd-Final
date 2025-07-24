import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marca-crud',
  templateUrl: './marca-crud.component.html',
  styleUrls: ['./marca-crud.component.css']
})
export class MarcaCrudComponent implements OnInit{


constructor(private router: Router){}
ngOnInit(): void {

}


navigateToMarcaCreate(): void{
  this.router.navigate(['/marcas/create'])
}
}