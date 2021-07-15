// On récupère l'id depuis l'URL
import Bear from "../class/Bear";

let params = new URLSearchParams(document.location.search.substring(1));
const id = params.get("_id");
console.log(id);

fetch('http://localhost:3000/api/teddies/' +id ,
    { method : "GET"})
    .then(response => response.json())
    .then(dataBear => {
        const galerie = document.getElementById("galerie");
        const bear = new Bear(dataBear);
        bear.display(galerie, "product");
        console.log("test");
        }
    );
