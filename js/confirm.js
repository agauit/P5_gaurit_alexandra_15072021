import Cart from "../class/Cart.js"

let confirmSentence = document.getElementById("p-confirm");
let orderId = localStorage.getItem("validId");
let cart = new Cart();
let price = cart.totalPrice()/100 + " euros";

confirmSentence.innerText = "Voici votre numéro de commande : "  + orderId
    + "\n Le prix total de vos article est de :  " + price
confirmSentence.classList.add("text-center");

let check = document.getElementById("check");
check.style.color = "green";
check.style.fontSize = "70px";
check.classList.add("mb-4")