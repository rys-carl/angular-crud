import { Component } from '@angular/core';

import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'router-outlet',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

}
