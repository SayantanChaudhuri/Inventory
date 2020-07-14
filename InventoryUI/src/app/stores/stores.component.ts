import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';
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
  modalHeader: string;

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

  private storesSubmitSubscription: Subscription;
  modalDisplay = false;

  constructor(
    private storesService: StoresService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.getAllStores();
    this.storesSubmitSubscription = this.storesService.storeSubmitSubject
      .asObservable()
      .subscribe((store) => {
        this.modalDisplay = false;

        if (this.modalHeader.indexOf('Update') > -1) {
          this.updateStore(store);
        } else {
          this.saveStore(store);
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.storesSubmitSubscription.unsubscribe();
  }

  showNewStoreModal(event): void {
    this.modalDisplay = true;
    this.modalHeader = 'New store details';
    this.storesService.storeSubject.next(null);
  }

  showUpdateStoreModal(store: Store): void {
    this.storesService.storeSubject.next(store);
    this.modalHeader = 'Update store details';
    this.modalDisplay = true;
  }

  showDeleteStoreModal(store: Store): void {
    this.confirmationService.confirm({
      accept: () => {
        this.deleteStore(store);
      },
    });
  }

  getAllStores(): void {
    this.loading = true;
    this.storesService.getAllStores().subscribe(
      (response) => {
        this.storeList = response;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Error: Books couldn\'t load. Try later.'
        });
      }
    );
  }

  saveStore(store: Store): void {
    this.loading = true;
    this.storesService.saveStore(store).subscribe(
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
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Error: Record couldn\'t saved. Try later.'
        });
      }
    );
  }

  updateStore(store: Store): void {
    this.loading = true;
    this.storesService.updateStore(store).subscribe(
      (response) => {
        this.storeList = response;
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Record successfully updated.'
        });
      },
      (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Error: Record couldn\'t updated. Try later.'
        });
      }
    );
  }

  deleteStore(store: Store): void {
    this.loading = true;
    this.storesService.deleteStore(store).subscribe(
      (response) => {
        this.storeList = response;
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Record successfully deleted.',
        });
      },
      (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Error: Record couldn\'t updated. Try later.',
        });
      }
    );
  }
}
