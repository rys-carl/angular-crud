import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = { id: 0, name: '', price: 0 }
  constructor(private apiService: ApiService) {
    this.apiService.readProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products);
    })
  }
  ngOnInit() {
  }
  createOrUpdateProduct(form: NgForm) {
    form.value.id = this.selectedProduct.id;
    form.value.name = this.selectedProduct.name;
    form.value.price = this.selectedProduct.price;
    if (this.selectedProduct && this.selectedProduct.id) {
      this.apiService.updateProduct(form.value).subscribe((product: Product) => {
        console.log("Product updated", product);
        this.apiService.readProducts().subscribe((products: Product[]) => {
          this.products = products;
          this.selectedProduct = { id: 0, name: '', price: 0 }; // Reset after update
          form.resetForm();
        });
      });
    }
    else {
      this.apiService.createProduct(form.value).subscribe((product: Product) => {
        console.log("Product created, ", product);
        this.apiService.readProducts().subscribe((products: Product[]) => {
          this.products = products;
          this.selectedProduct = { id: 0, name: '', price: 0 }; // Reset after create
          form.resetForm();
        });
      });
    }
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe((product: Product) => {
      console.log("Product deleted, ", product);
      this.apiService.readProducts().subscribe((products: Product[]) => {
        this.products = products;
      })
    });
  }
}