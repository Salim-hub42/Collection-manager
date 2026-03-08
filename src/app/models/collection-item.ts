export class CollectionItem {

   id = -1;
   rarity = "Gold";
   name = "Tortue-Génial";
   description = "Cette Tortue est un expert en arts martiaux, capable de vaincre n'importe quel adversaire avec ses techniques de combat impressionnantes.";
   price: number = 850;
   image = "img/tortue-génial.png";

   copy() {
      return Object.assign(new CollectionItem(), this);
   }
}