/**
 * @desc on ajoute les produits au panier
 * @param {Object} donnees Les informations d'un produit
 * @param {string} donnees.imageUrl
 * @param {number} donnees._id
 * @param {string} donnees.description
 * @param {string} donnees.name
 * @param {float} donnees.price
 */
import Product from "./Product";


export default class Cart {

    constructor() {
        let content = localStorage.getItem("cart");
        if (content){
            this.content = JSON.parse(content);
        }
        else {
            this.content = {};
            this._updateLocalStorage();
        }
    }

    /**
     *
     * @param {Product} product
     */
    add(product){
        //si le produit n'est pas dans le panier, la valeur sera undefined
        if(this.content[product._id] === undefined){
            // L'objet littéral this.content aura une clé "product._id" , dont la valeur sera product
            this.content[product._id] = product;
        }else{
            //sinon, la valeur représente notre produit dans le panier, on a donc accès à sa quantity
            this.content[product._id].quantity += product.quantity;
        }

        //On synchronise le localstorage
        this._updateLocalStorage();
    }

    _updateLocalStorage(){
        localStorage.setItem("cart", JSON.stringify(this.content));
    }
    /**
     *
     * @param {Product} product
     */
    remove(product){
        delete this.content[product._id];
        this._updateLocalStorage();
        this.display();
    }
    totalPrice(){
        let total = 0;
        for (let [_id, product] of Object.entries(this.content)){
            total += product.quantity * product.price;
        }
        console.log(total);
        return total;
    }

    quantityPlus(product){
        this.content[product._id].quantity++;
        this._updateLocalStorage();
        this.display();
    }

    quantityLess(product){
        this.content[product._id].quantity--;
        if(this.content[product._id].quantity < 1){
            this.remove(product);
        }
        else{
            this._updateLocalStorage();
            this.display();
        }

    }


    display() {
        const id = document.getElementById("cart_element");
        id.innerHTML = "";
        for (let [_id, product] of Object.entries(this.content)) {
            const name = document.createElement("p");
            name.innerHTML = product.name;
            id.appendChild(name);
            id.classList.add("d-flex");
            id.classList.add("flex-column");
            id.classList.add("justify-content-between");
            id.classList.add("align-items-center");

            const removeQuantity = document.createElement("i");
            removeQuantity.classList.add("fa");
            removeQuantity.classList.add("fa-minus");
            removeQuantity.addEventListener("click" , this.quantityLess.bind(this, product));

            const quantity = document.createElement("p");
            quantity.innerHTML = product.quantity;
            id.appendChild(quantity);

            const addQuantity = document.createElement("i");
            addQuantity.classList.add("fa");
            addQuantity.classList.add("fa-plus");
            addQuantity.addEventListener("click" , this.quantityPlus.bind(this, product));

            const div = document.createElement("div");
            div.appendChild(name);
            div.appendChild(removeQuantity);
            div.appendChild(quantity);
            div.appendChild(addQuantity);
            id.appendChild(div);

            const price = document.createElement("p");
            price.innerHTML = parseFloat(product.price) * product.quantity / 100 + " € ";
            div.appendChild(price);
            div.classList.add("mx-5");

            const total = document.getElementById("total-price");
            total.innerHTML = "Le prix total de votre panier est de " + this.totalPrice() / 100 + " euros";
            total.classList.add("text-center");
            total.classList.add("py-1");
            total.classList.add("fw-bold");

            const removeProduct = document.createElement("button");
            removeProduct.innerText = "Supprimer";
            removeProduct.classList.add("btn");
            removeProduct.classList.add("btn-danger");
            removeProduct.addEventListener("click", this.remove.bind(this, product));
            div.appendChild(removeProduct);

        }

    }

}
