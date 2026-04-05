import { CollectionItem } from "./collection-item";
import { ICollectionDTO } from "../interfaces/collection-dto";


export class Collection {
   id = -1;// L'identifiant unique de la collection, initialisé à -1 pour indiquer qu'il n'est pas encore défini.
   title: string = "My Collection";// Le titre de la collection, initialisé à "My Collection" par défaut.
   items: CollectionItem[] = [];// La liste des items de la collection, initialisée à un tableau vide.
   itemsCount: number = 0;// Le nombre d'items dans la collection, initialisé à 0.

   /**
    * Crée une copie de la collection actuelle, y compris ses items.
    * @returns Une nouvelle instance de Collection avec les mêmes propriétés et items
    */
   copy() {
      const copiedCollection = Object.assign(new Collection(), this);
      copiedCollection.items = this.items.map(item => item.copy());//map est utilisé pour créer une nouvelle liste d'items en appelant la méthode copy() sur chaque item de la collection actuelle, assurant ainsi que les items sont également copiés de manière indépendante.
      return copiedCollection;
   }

   static fromDTO(collectionData: ICollectionDTO) {
      return Object.assign(new Collection(), {
         ...collectionData,
         items: collectionData.items?.map(
            item => CollectionItem.fromDTO(item)
         )
      });
   }

   toDTO() {
      return {
         title: this.title,
      }
   }



}