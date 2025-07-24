import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-crud',
  templateUrl: './supplier-crud.component.html',
  styleUrls: ['./supplier-crud.component.css']
})
export class SupplierCrudComponent {
constructor(private router: Router) {}
ngOnInit(): void {
}

navigateToSupplierCreate(): void{
  this.router.navigate(['/suppliers/create'])
}

}
