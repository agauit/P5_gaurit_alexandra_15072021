import Bear from "../class/Bear.js";

fetch('http://localhost:3000/api/teddies/' ,
{ method : "GET"})
    .then(response => response.json())
    .then(datas =>
        {
            // on créé une galerie pour stocker les infos de l'API
            const galerie = document.getElementById("galerie");
            console.log(datas);
            //on créé les instances de la class Donnees pour afficher les données de l'API et les afficher
            datas.forEach(dataBear =>{
                const bear = new Bear(dataBear);
                bear.display(galerie, "home");
            });
});
