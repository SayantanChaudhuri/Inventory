import { Component, OnInit } from '@angular/core';
import { Store } from '../model/store';
import { FormBuilder } from '@angular/forms';
import { StoresService } from '../stores.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css'],
})
export class StoreFormComponent implements OnInit {
  storeFormGroup = this.fb.group({
    id: [0],
    pname: [''],
    model: [''],
    description: [''],
    partnumber: [''],
    category: [''],
    cost: [''],
    instock: [''],
    sold:[''],
    notes: ['']
  });

  store: Store;

  constructor(private fb: FormBuilder, private storesService: StoresService) {}

  ngOnInit(): void {}

  submitNewStore(event): void {
    this.store = new Store(this.storeFormGroup.value);
    this.storesService.store = this.store;
    this.storeFormGroup.reset();
  }
}
