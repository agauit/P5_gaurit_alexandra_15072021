import Cart from "../class/Cart";
import Form from "../class/Form.js";

const cart = new Cart();
cart.display();


const form = new Form(document.getElementById("confirm-form"));
console.log(form);