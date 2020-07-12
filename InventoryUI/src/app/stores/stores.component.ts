import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Store } from './model/store';
import { StoresService } from './stores.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit, OnDestroy {
  id?: number;
  pname: string;
  model: string;
  description: string;
  partNumber: string;
  category: string;
  cost: string;
  instock: string;
  sold: string;
  notes: string;

  // tslint:disable-next-line:max-line-length
  storeList: Store[] = [
    {
      id: 0,
      pname: '',
      model: '',
      description: '',
      partNumber: '',
      category: '',
      cost: '',
      instock: '',
      sold: '',
      notes: '',
    },
  ];
  loading = true;
  newStore: Store;
  first = 0;
  last = 0;
  totalRecords = 0;

  private storesObserveable: Observable<Store>;
  private storesModalSubscription: Subscription;
  modalDisplay: boolean = false;

  constructor(
    private storesService: StoresService,
    private messageService: MessageService
  ) {
    this.getAllStores();
    this.storesObserveable = this.storesService.storeObservable;
    this.storesModalSubscription = this.storesObserveable.subscribe((store) => {
      this.modalDisplay = false;
      this.saveBook(store);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.storesModalSubscription.unsubscribe();
  }

  getAllStores(): void {
    this.loading = true;
    this.storesService.getAllStores().subscribe(
      (response) => {
        this.storeList = response;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: "Error: Books couldn't load. Try later",
        });
      }
    );
  }

  saveBook(store: Store): void {
    this.loading = true;
    this.storesService.saveBook(store).subscribe(
      (response) => {
        this.storeList = response;
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Record successfully saved.',
        });
      },
      (err) => {
        console.error(err);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: "Error: Record couldn't saved. Try later",
        });
      }
    );
  }

  showNewStoreModal(event): void {
    this.modalDisplay = true;
  }
}
