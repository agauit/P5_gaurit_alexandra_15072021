import Product from "./Product.js";


export default class Bear extends Product {
    /**
     * @desc on récupère les données pour créer un exemplaire d'ours
     * @param {Object} donnees Les informations d'un ours
     * @param {string} donnees.imageUrl
     * @param {number} donnees._id
     * @param {string} donnees.description
     * @param {string} donnees.name
     * @param {float} donnees.price
     * @param {array} donnees.colors
     */
    constructor(donnees) {
        super(donnees);
    }

    /**
     * @desc On affiche un ours dans une galerie
     * @param galerie
     * @param page
     */
    display(galerie, page) {
        switch (page) {
            case "home" :
                const img = document.createElement("img");
                img.src = this.imageUrl;
                img.style.width = "100%";
                img.classList.add("card-img-top");
                const figure = document.createElement("figure");
                figure.appendChild(img);
                const figcaption = document.createElement("figcaption");
                figcaption.classList.add("card-body");
                figure.appendChild(figcaption);
                galerie.appendChild(figure);
                figure.style.width = "350px";
                figure.classList.add("card");
                const title = document.createElement("h2");
                title.innerText = this.name;
                const desc = document.createElement("p");
                desc.innerText = this.description;
                figcaption.appendChild(title);
                figcaption.appendChild(desc);
                const div = document.createElement("div");
                galerie.appendChild(div);
                div.appendChild(figure);
                const link = document.createElement("a");
                link.setAttribute("href", "./HTML/product.html?_id=" + this._id);
                div.appendChild(link);
                figure.appendChild(link);
                link.appendChild(img);
                link.appendChild(figcaption);
                link.appendChild(title);
                link.appendChild(desc);
                link.style.color = "black";
                link.style.textDecoration = "none";
                break;

            case "product" :

                const h1 = document.getElementById("h1");
                h1.innerHTML = "Découvrez notre ours " + this.name;
                h1.style.marginLeft = "30%";

                const image = document.createElement("img");
                image.src = this.imageUrl;
                image.style.width = "100%";
                


                const figureOurs = document.createElement("figure");
                figureOurs.appendChild(image);
                figureOurs.style.width = "50%";
                figureOurs.style.marginTop = "5%";
                figureOurs.style.marginBottom = "5%";
                figureOurs.style.margin = "5% 0px 5% 25%";
                figureOurs.style.border = "1px solid black";
                figureOurs.style.borderBottom = "10px solid black";

                const gal = document.getElementById("galerie");
                gal.appendChild(figureOurs);
                


                const figcaptionOurs = document.createElement("figcaption");
                figureOurs.appendChild(figcaptionOurs);
                figcaptionOurs.style.padding = "5%";
                figcaptionOurs.style.backgroundColor = "white";

                const h2 = document.createElement("h2");
                figcaptionOurs.appendChild(h2);
                h2.innerHTML = this.name;
                h2.style.fontSize = "2rem";


                const price = document.createElement("p");
                figcaptionOurs.appendChild(price);
                price.innerHTML = "Prix : " + this.price/100 + " €";
                price.style.fontSize = "1.5rem";

                //création d'un menu déroulant pour choisir la couleur de l'ours
                const color = document.getElementById("selectNumber");
                figcaptionOurs.appendChild(color);
                let options = this.colors;

                for(let i = 0; i < options.length; i++) {
                    let opt = options[i];
                    let element = document.createElement("option");
                    element.textContent = opt;
                    element.value = opt;
                    color.appendChild(element);
                }

                const chooseColor = document.createElement("p");
                chooseColor.innerHTML = "Choisissez la couleur de votre Ours";
                chooseColor.appendChild(color);
                figcaptionOurs.appendChild(chooseColor);
                chooseColor.classList.add("fw-bold");

                const divColor = document.createElement("div");
                figcaptionOurs.appendChild(divColor);
                divColor.appendChild(chooseColor);
                divColor.appendChild(color);



                const p = document.createElement("p");
                figcaptionOurs.appendChild(p);
                p.innerHTML = "Description du produit : <br>" + this.description;
                p.style.marginTop = "2%";


                const button = document.createElement("button");
                figcaptionOurs.appendChild(button);
                button.innerHTML = "Ajouter au panier";
                button.classList.add("btn");
                button.classList.add("btn-outline-dark");
                button.style.margin = "5% 0px 0px 32%";
                button.style.paddingBottom = "15px";
                button.classList.add("btn-lg");
                button.style.borderRadius = "0px";
                button.style.borderBottom = "5px solid black";
                button.addEventListener("click", this._onProductClick.bind(this));


                break;
            default :
                throw "La page " + page + " n'est pas reconnue";
        }

    }
}