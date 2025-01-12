// Definisco l'URL di base per l'API
const baseUrl = "https://jsonplaceholder.typicode.com/";

// Definisco l'endpoint per le foto che voglio ottenere
const resource = "photos";

// Creo un oggetto di parametri per limitare il numero di foto che voglio ricevere (solo 6)
const params = { "_limit": 6 };

// Seleziono l'elemento loader (indicando l'id "loader") che voglio mostrare mentre carico le foto
const loader = document.getElementById("loader");

// Eseguo una richiesta Axios per ottenere i dati dalle API
axios.get(baseUrl + resource, { params })
    .then((res) => {
        // Una volta ricevuta la risposta, prendo le foto dalla risposta (res.data)
        const photos = res.data;

        // Seleziono il contenitore dove inserirò le cards (contenitore che ha la classe 'container')
        let postcards = document.querySelector(".container");

        // Per ogni foto che ho ottenuto dalla risposta, creo una card e la aggiungo al contenitore
        photos.forEach((photo) => {
            // Evoco la FUNZIONE 'createPhotoCard' per generare una card per ogni foto
            let card = createCard(photo);
            // Aggiungo la card al contenitore delle postcards
            postcards.appendChild(card);
        });

        // evoco la FUNZIONE 'getImg' per gestire l'interazione con l'overlay
        getImg();
    })
    .catch((error) => {
        // Se c'è un errore nella richiesta, lo stampo in console
        console.log(error);
    })
    .finally(() => {
        // Dopo 1 secondo, nascondo il loader
        setTimeout(() => {
            loader.classList.add("d-none");
        }, 1000);
    });

// Creo una funzione per generare una card per ogni foto
function createCard(photo) {
    // Creo un nuovo div che rappresenterà una card
    const card = document.createElement("div");
    card.classList.add("row");  // Aggiungo la classe 'row' alla card per il layout

    // Creo l'HTML della card
    card.innerHTML = `
        <div class="col">
            <div id="pin">
                <img src="./img/pin.svg" alt="Pin Icon">
            </div>
            <figure id="photo-${photo.id}">
                <img src="${photo.url}" alt="${photo.title}">
                <figcaption class="capitalize">${photo.title}</figcaption>
            </figure>
        </div>
    `;

    // Ritorno la card creata per poterla usare successivamente
    return card;
}

// Funzione per gestire l'overlay delle immagini
function getImg() {
    // Seleziono tutte le figure (tag <figure>) create dinamicamente nella pagina
    const images = document.querySelectorAll("figure");

    // Seleziono gli altri elementi necessari per l'overlay dal DOM
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("img-overlay");
    const closeBtn = document.getElementById("close-overlay");

    // Per ogni immagine, aggiungo un evento di click
    images.forEach((img) => {
        img.addEventListener("click", () => {
            // Quando clicco sull'immagine, prendo il link dell'immagine e lo metto nell'overlay
            const imgSrc = img.querySelector("img").src;
            overlayImg.src = imgSrc;
            // Mostro l'overlay con l'immagine selezionata
            overlay.classList.remove("d-none");
        });
    });

    // Aggiungo un evento di click sul bottone di chiusura dell'overlay
    closeBtn.addEventListener("click", () => {
        // Quando clicco sul bottone di chiusura, nascondo l'overlay
        overlay.classList.add("d-none");
    });
}