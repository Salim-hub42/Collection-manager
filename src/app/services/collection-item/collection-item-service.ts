import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICollectionItemDTO } from '../../interfaces/collection-item-dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CollectionItem } from '../../models/collection-item';

@Injectable({
  providedIn: 'root',
})
export class CollectionItemService {

  private Base_Url = 'http://localhost:3000';
  private itemsEndpoint = '/items';

  private http = inject(HttpClient);

  getAll(): Observable<CollectionItem[]> {
    return this.http.get<ICollectionItemDTO[]>(
      this.Base_Url + this.itemsEndpoint
    ).pipe(
      map(itemJsonArray => itemJsonArray.map(itemJson => CollectionItem.fromDTO(itemJson)))
    )
  }

  get(id: number): Observable<CollectionItem> {
    const url = `${this.Base_Url}${this.itemsEndpoint}/${id}`;
    return this.http.get<ICollectionItemDTO>(url).pipe(
      map(itemJson => CollectionItem.fromDTO(itemJson))
    );
  }


  add(item: CollectionItem): Observable<void> {
    return this.http.post<void>(this.Base_Url + this.itemsEndpoint, item.toDTO());
  }

  update(item: CollectionItem): Observable<void> {
    const url = `${this.Base_Url}${this.itemsEndpoint}/${item.id}`;
    return this.http.put<void>(url, item.toDTO());
  }

  delete(item: CollectionItem): Observable<void> {
    const url = `${this.Base_Url}${this.itemsEndpoint}/${item.id}`;
    return this.http.delete<void>(url);
  }


}
