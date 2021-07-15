import Cart from "./Cart.js";

export default class Form {
    constructor(form) {
        this.form = form;
        this.values = {};
        //gestions des evenements
        this.form.addEventListener("submit", this.submit.bind(this));
    }

    _isValid(input){
        const value = input.value;
        const regex = new RegExp(input.dataset.regex);
        if(!!value.match(regex)){
            const name = input.getAttribute("name");
            this.values[name] = value;
            return true;
        }
        else{
            const message = input.dataset.message;
            const alertMessage = document.createElement("div");
            alertMessage.innerText = message;
            alertMessage.classList.add("alert");
            alertMessage.classList.add("alert-danger");
            alertMessage.classList.add("input-errormessage");
            if(input.nextSibling) {
                //on cherche le parent de l'input, pour utiliser insertBefore
                //On choisi d'insérer un message juste avant l'élément qui suit l'input
                //(Astuce pour pallier l'absence de insertAfter qui n'existe pas)
                input.parentNode.insertBefore(alertMessage, input.nextSibling);
            }
            else{
                input.parentNode.appendChild(alertMessage);
            }
            // alert(message);
            return false;
        }
    }

    _displayError(errorMessage){
        alert(errorMessage);
    }

    submit(e){
        //on empêche la validation du formulaire
        e.preventDefault();
        //on supprime les messages d'erreurs s'il y en a
        let errorMessages = this.form.querySelectorAll(".input-errormessage");
        errorMessages = [].slice.call(errorMessages);
        errorMessages.forEach(errorMessage => errorMessage.parentNode.removeChild(errorMessage));
        //On réinitialise le tableau des valeurs
        this.values = {};
        //On récupère la liste de tous nos champs
        let inputs = this.form.querySelectorAll("input[data-regex][data-message]");
        //conversion en Array pour pouvoir faire un forEach
        inputs = [].slice.call(inputs);
        console.log(inputs);
        let formIsValid = true;
        inputs.forEach(input => {
            if(!this._isValid(input)){
                formIsValid = false;
            }
        })
        if(formIsValid){
            console.log(this.values);
            const cart = new Cart();
            const productIds = Object.keys(cart.content);
            const body = {
                contact : this.values,
                products : productIds,
            }
            fetch('http://localhost:3000/api/teddies/order',
                {
                    method : "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify(body),
                })
                .then(response => response.json())
                .then(sendData =>
                {
                    let contentConfirm = localStorage.setItem("validId", sendData.orderId);

                });
        }
    }
}