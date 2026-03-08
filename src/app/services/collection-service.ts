import { Injectable } from '@angular/core';
import { Collection } from '../models/collection';
import { CollectionItem } from '../models/collection-item';


@Injectable({
  providedIn: 'root',
})
export class CollectionService {


  private collections: Collection[] = [];// Un tableau pour stocker les collections. Chaque collection est un objet de type Collection qui contient un titre et une liste d'items.
  private currentId = 1;// Un compteur pour générer des IDs uniques pour les collections. Chaque fois qu'une nouvelle collection est ajoutée, cet ID est assigné à la collection, puis le compteur est incrémenté pour la prochaine collection.
  private currentItemIndex: { [key: number]: number } = {};// Un objet pour suivre l'index actuel des items pour chaque collection, où la clé est l'ID de la collection et la valeur est l'index actuel des items dans cette collection.

  // Ajout des propriétés 
  private soldat!: CollectionItem;
  private boubou!: CollectionItem;
  private krilin!: CollectionItem;

  /**
   * Sauvegarde l'état actuel des collections dans le localStorage du navigateur.
   */
  private save(): void {
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }


  /**
   * Initialise le service en chargeant les collections depuis le localStorage.
   */
  constructor() {
    this.load();
  }



  /**
   * Charge les collections depuis le localStorage. Si aucune collection n'est trouvée,
   * génère des données factices par défaut.
   */
  private load() {
    const collectionsJson = localStorage.getItem('collections');
    if (collectionsJson) {
      this.collections = JSON.parse(collectionsJson).map((collectionJson: any) => {
        const collection = Object.assign(new Collection(), collectionJson);
        const ItemJson = collectionJson["items"] || [];
        collection.items = ItemJson.map((item: any) => Object.assign(new CollectionItem(), item));
        return collection;
      });

      this.currentId = Math.max(...this.collections.map(collection => collection.id), 0) + 1;
      this.currentItemIndex = this.collections.reduce(//reduce ici permet de construire un objet currentItemIndex où chaque clé est l'ID d'une collection et la valeur associée est l'index actuel des items dans cette collection.
        (indexes: { [key: number]: number }, collection) => {// Pour chaque collection, on calcule l'index actuel des items en prenant le maximum des IDs des items dans la collection et en ajoutant 1 (pour le prochain item à ajouter).
          indexes[collection.id] = Math.max(...collection.items.map(item => item.id), 0) + 1;// On met à jour l'objet indexes avec l'index actuel des items pour la collection courante.
          return indexes;
        }, {}
      );
    } else {
      this.generateDummyData();
      this.save();
    }
  }


  /**
   * Génère des données factices (collections et items) pour initialiser l'application
   * lors de la première utilisation ou si aucune donnée n'est présente.
   */
  generateDummyData() {

    this.soldat = new CollectionItem();
    this.soldat.name = "Chichi";
    this.soldat.rarity = "Furyeuse";
    this.soldat.description = "Une soldat courageuse, prête à défendre son honneur sur le champ de bataille.";
    this.soldat.price = 150;
    this.soldat.image = "img/chichi.png";

    this.boubou = new CollectionItem();
    this.boubou.name = "Boubou";
    this.boubou.rarity = "Bubble-gum";
    this.boubou.description = "Un boubou mystique avec des pouvoirs magiques puissants.";
    this.boubou.price = 250;
    this.boubou.image = "img/boubou.png";

    this.krilin = new CollectionItem();
    this.krilin.name = "Krilin";
    this.krilin.rarity = "Légendaire";
    this.krilin.description = "Un krilin légendaire, connu pour sa force et sa sagesse.";
    this.krilin.price = 500;
    this.krilin.image = "img/krilin.png";

    const defaultCollection = new Collection();
    defaultCollection.title = "Default Collection";

    const storedCollection = this.add(defaultCollection);
    this.addItem(storedCollection, this.soldat);
    this.addItem(storedCollection, this.boubou);
    this.addItem(storedCollection, this.krilin);

  }

  /**
   * Retourne une copie de toutes les collections existantes.
   */
  getAll(): Collection[] {
    return this.collections.map(collection => collection.copy());
  }

  /**
   * Retourne une copie d'une collection spécifique selon son ID.
   * @param collectionId L'identifiant de la collection recherchée
   */
  get(collectionId: number): Collection | null {
    const storedCopy = this.collections.find(
      collection => collection.id === collectionId
    );

    if (!storedCopy) return null;
    return storedCopy.copy();
  }

  /**
   * Ajoute une nouvelle collection à la liste et lui attribue un ID unique.
   * @param collection La collection à ajouter (sans id ni items)
   * @returns Une copie de la collection ajoutée
   */
  add(collection: Omit<Collection, 'id' | 'items'>): Collection {
    const storedCopy = collection.copy();
    storedCopy.id = this.currentId;
    this.collections.push(storedCopy);
    this.currentItemIndex[storedCopy.id] = 1;
    this.currentId++;
    this.save();
    return storedCopy.copy();
  }

  /**
   * Met à jour une collection existante (hors items).
   * @param collection La collection à mettre à jour (sans items)
   * @returns Une copie de la collection mise à jour ou null si non trouvée
   */
  update(collection: Omit<Collection, 'items'>): Collection | null {
    const storedCopy = this.collections.find(
      collection => collection.id === collection.id
    );
    if (!storedCopy) return null;
    Object.assign(storedCopy, collection);
    this.save();
    return storedCopy.copy();
  }

  /**
   * Supprime une collection selon son ID.
   * @param collectionId L'identifiant de la collection à supprimer
   */
  delete(collectionId: number): void {
    this.collections = this.collections.filter(
      collection => collection.id !== collectionId
    );
    this.save();
  }

  /**
   * Ajoute un nouvel item à une collection donnée.
   * @param collection La collection cible
   * @param item L'item à ajouter
   * @returns Une copie de la collection mise à jour ou null si non trouvée
   */
  addItem(collection: Collection, item: CollectionItem): Collection | null {
    const storedCollection = this.collections.find(
      collection => collection.id === collection.id
    );
    if (!storedCollection) return null;
    const storedItem = item.copy();
    storedItem.id = this.currentItemIndex[collection.id];
    storedCollection.items.push(storedItem);
    this.currentItemIndex[collection.id]++;
    this.save();
    return storedCollection.copy();
  }

  /**
   * Met à jour un item d'une collection donnée.
   * @param collection La collection cible
   * @param item L'item à mettre à jour
   * @returns Une copie de la collection mise à jour ou null si non trouvée
   */
  updateItem(collection: Collection, item: CollectionItem) {
    const storedCollection = this.collections.find(
      storedCollection => storedCollection.id === collection.id
    );
    if (!storedCollection) return null;
    const storedItemIndex = storedCollection.items.findIndex(
      storedItem => storedItem.id === item.id
    )
    if (storedItemIndex === -1) return null;
    storedCollection.items[storedItemIndex] = item.copy();
    this.save();
    return storedCollection.copy();
  }

  /**
   * Supprime un item d'une collection selon leurs IDs.
   * @param collectionId L'identifiant de la collection
   * @param itemId L'identifiant de l'item à supprimer
   * @returns Une copie de la collection mise à jour ou null si non trouvée
   */
  deleteItem(collectionId: number, itemId: number): Collection | null {
    const storedCollection = this.collections.find(
      storedCollection => storedCollection.id === collectionId
    );
    if (!storedCollection) return null;
    storedCollection.items = storedCollection.items.filter(
      item => item.id === itemId
    )
    this.save();
    return storedCollection.copy();
  }



}
