import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '../model/store';
import { FormBuilder } from '@angular/forms';
import { StoresService } from '../stores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css'],
})
export class StoreFormComponent implements OnInit, OnDestroy {
  storeFormGroup = this.fb.group({
    id: [0],
    pname: [''],
    model: [''],
    description: [''],
    partnumber: [''],
    category: [''],
    cost: [''],
    instock: [''],
    sold: [''],
    notes: [''],
  });

  private storeSubcription: Subscription;

  constructor(private fb: FormBuilder, private storesService: StoresService) {
    this.storeSubcription = this.storesService.storeSubject
      .asObservable()
      .subscribe((response) => {
        if (!response) {
          this.storeFormGroup.reset({
            category: null,
            cost: null,
            description: null,
            id: 0,
            instock: null,
            model: null,
            notes: null,
            partnumber: null,
            pname: null,
            sold: null,
          });
        } else {
          this.storeFormGroup.setValue(response);
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.storeSubcription.unsubscribe();
  }

  submitNewStore(event): void {
    this.storesService.storeSubmitSubject.next(this.storeFormGroup.value);
    this.storeFormGroup.reset();
  }
}
