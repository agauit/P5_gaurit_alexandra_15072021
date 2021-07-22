import Cart from "../class/Cart.js"

let confirmSentence = document.getElementById("p-confirm");
let orderId = localStorage.getItem("validId");
confirmSentence.innerText = "Voici votre numéro de commande : "  + orderId;
confirmSentence.classList.add("text-center");
let cart = new Cart();
if (cart.totalPrice() > 0){

    let price = cart.totalPrice()/100 + " euros";

    confirmSentence.innerText += "\n Le prix total de vos article est de :  " + price;
}

let check = document.getElementById("check");
check.style.color = "green";
check.style.fontSize = "70px";
check.classList.add("mb-4");

localStorage.removeItem("cart");