import { Injectable } from '@angular/core';
import { Store } from './model/store';
import { Subject, Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor(private apiService: ApiService) {}

  // tslint:disable-next-line:variable-name
  private _storeSubject: Subject<Store> = new Subject();
  // tslint:disable-next-line:variable-name
  private _storeSubmitSubject: Subject<Store> = new Subject();

  getAllStores(): Observable<Store[]> {
    return this.apiService.get('http://localhost:8080/api/stores');
  }

  saveStore(store: Store): Observable<Store[]> {
    return this.apiService.post('http://localhost:8080/api/stores', store);
  }

  updateStore(store: Store): Observable<Store[]> {
    return this.apiService.put(
      'http://localhost:8080/api/stores/' + store.id,
      store
    );
  }

  deleteStore(store: Store): Observable<Store[]> {
    return this.apiService.delete(
      'http://localhost:8080/api/stores/' + store.id
    );
  }

  public get storeSubject(): Subject<Store> {
    return this._storeSubject;
  }

  public get storeSubmitSubject(): Subject<Store> {
    return this._storeSubmitSubject;
  }
}
