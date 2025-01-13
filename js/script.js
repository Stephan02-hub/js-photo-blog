
const baseUrl = "https://jsonplaceholder.typicode.com/";


const resource = "photos";


const params = { "_limit": 6 };


const loader = document.getElementById("loader");


axios.get(baseUrl + resource, { params })
    .then((res) => {
       
        const photos = res.data;

        
        let postcards = document.querySelector(".container");

        
        photos.forEach((photo) => {
            
            let card = createCard(photo);
            
            postcards.appendChild(card);
        });

        
        getImg();
    })
    .catch((error) => {
        
        console.log(error);
    })
    .finally(() => {
       
        setTimeout(() => {
            loader.classList.add("d-none");
        }, 1000);
    });


function createCard(photo) {
  
    const card = document.createElement("div");
    card.classList.add("row");  
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

    return card;
}


function getImg() {

    const images = document.querySelectorAll("figure");

    
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("img-overlay");
    const closeBtn = document.getElementById("close-overlay");

    images.forEach((img) => {
        img.addEventListener("click", () => {
           
            const imgSrc = img.querySelector("img").src;
            overlayImg.src = imgSrc;
         
            overlay.classList.remove("d-none");
        });
    });

 
    closeBtn.addEventListener("click", () => {
      
        overlay.classList.add("d-none");
    });
}