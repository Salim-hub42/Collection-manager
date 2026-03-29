export class CollectionItem {

   id = -1;
   rarity = "";
   name = "";
   description = "";
   price: number = 0;
   image = "";

   copy() {
      return Object.assign(new CollectionItem(), this);
   }
}