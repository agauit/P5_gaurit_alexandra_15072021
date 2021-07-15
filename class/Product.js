
import Cart from "./Cart.js";

export default class Product {
    /**
     * @desc on récupère les données pour créer un exemplaire d'un produit
     * @param {Object} donnees Les informations d'un produit
     * @param {string} donnees.imageUrl
     * @param {number} donnees._id
     * @param {string} donnees.description
     * @param {string} donnees.name
     * @param {float} donnees.price
     */
    constructor(donnees) {
        this._id = undefined;
        this.imageUrl = undefined;
        this.name = undefined;
        this.description = undefined;
        this.price = undefined;
        this.quantity = 1;

        Object.assign(this, donnees);
    }

    _onProductClick() {
        console.log("on doit ajouter le produit : ", this);
        alert("Le produit " + this.name + " a été ajouté au panier");
        const cart = new Cart();
        cart.add(this);

    }

}
