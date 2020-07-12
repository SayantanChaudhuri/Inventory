import { Injectable } from '@angular/core';
import { Store } from './model/store';
import { Subject, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Stores } from './model/stores';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor(private apiService: ApiService) {}

  private _store: Store;

  // tslint:disable-next-line:variable-name
  private _storeSubject: Subject<Store> = new Subject();

  getAllStores(): Observable<Store[]> {
    return this.apiService.get('http://localhost:8080/api/stores');
  }

  saveBook(store: Store): Observable<Stores> {
    return this.apiService.post('http://localhost:8080/api/stores', store);
  }

  public get store(): Store {
    return this._store;
  }

  public set store(store: Store) {
    this._store = store;
    this._storeSubject.next(this._store);
  }

  public get storeObservable(): Observable<Store> {
    return this._storeSubject.asObservable();
  }
}
