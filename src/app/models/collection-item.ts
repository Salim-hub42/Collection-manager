import { ICollectionItemDTO } from "../interfaces/collection-item-dto";

export class CollectionItem {

   id = -1;
   rarity = "";
   name = "";
   description = "";
   price: number = 0;
   image = "";

   collectionId: number = -1;



   copy() {
      return Object.assign(new CollectionItem(), this);
   }

   static fromDTO(collectionItemData: ICollectionItemDTO) {
      return Object.assign(new CollectionItem(), collectionItemData);
   }

   toDTO() {
      return {
         name: this.name,
         description: this.description,
         image: this.image,
         rarity: this.rarity,
         price: this.price,
         collectionId: this.collectionId
      }
   }
}