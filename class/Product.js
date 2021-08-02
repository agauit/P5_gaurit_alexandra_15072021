
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
        this._id = "";
        this.imageUrl = "../img/ours-pas-trouve";
        this.name = "Inexistant";
        this.description = " On dirait qu'il y a une erreur ! Cet ours n'existe pas, merci de retourner à la page d'accueil pour découvrir nos peluches faites à la main. ";
        this.price = 0;
        this.quantity = 1;

        Object.assign(this, donnees);
    }

    _onProductClick() {
        if (this._id) {
            console.log("on doit ajouter le produit : ", this);
            alert("Le produit " + this.name + " a été ajouté au panier");
            const cart = new Cart();
            cart.add(this);
        }
    }

}
