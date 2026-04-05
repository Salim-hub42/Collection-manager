import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../../models/collection';
import { ICollectionDTO } from '../../interfaces/collection-dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class CollectionService {

  private Base_Url = 'http://localhost:3000';
  private COLLECTION_ENDPOINT = '/collections';

  private http = inject(HttpClient);

  selectedCollection = signal<Collection | null>(null);

  getAll(): Observable<Collection[]> {
    return this.http.get<ICollectionDTO[]>(
      this.Base_Url + this.COLLECTION_ENDPOINT
    ).pipe(
      map(collectionListData => collectionListData.map(collectionData => Collection.fromDTO(collectionData)))
    )
  }

  get(id: number): Observable<Collection> {
    const url = `${this.Base_Url}${this.COLLECTION_ENDPOINT}/${id}`;
    return this.http.get<ICollectionDTO>(url).pipe(
      map(collectionData => Collection.fromDTO(collectionData))
    );
  }




}
