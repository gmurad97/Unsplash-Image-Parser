const accessKey = "oGEJzHhtL-KiSpa2TQp8Vwo5oJx-cNOf2Ryi26j6C2w";
const containerData = document.querySelector(".container-data");

let currentPage = 1;

if (typeof Element.prototype.clearChild === "undefined") {
    Object.defineProperty(Element.prototype, "clearChild", {
        configurable: true,
        enumerable: false,
        value: function () {
            while (this.firstChild) {
                this.removeChild(this.lastChild);
            }
        }
    })
}

let conicGradientDeg = 0;
setInterval(() => {
    if (conicGradientDeg === 360) {
        conicGradientDeg = 0;
        document.body.style.backgroundImage = `conic-gradient(from ${conicGradientDeg}deg, rgba(1, 1, 1, 1.0), rgba(89, 99, 150, 1.0))`;
    }
    document.body.style.backgroundImage = `conic-gradient(from ${conicGradientDeg}deg, rgba(1, 1, 1, 1.0), rgba(89, 99, 150, 1.0))`;
    conicGradientDeg++;
}, 16);

async function getUnsplashImage(searchWord, currentPage, showItemCount) {
    const response = await fetch(
        "https://api.unsplash.com//search/photos" +
        `?client_id=${accessKey}` +
        `&query=${searchWord}` +
        `&page=${currentPage}` +
        `&per_page=${showItemCount}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.json();
}

document.querySelector("#search_btn").addEventListener("click", () => {
    currentPage = 1;
    getUnsplashImage(document.querySelector("#search_input").value, currentPage, 12).then((response) => {
        containerData.clearChild();
        for (const regularImg of response.results) {
            const containerDataImg = document.createElement("div");
            containerDataImg.classList.add("container-data__img");
            const containerDataImgImages = document.createElement("img");
            containerDataImgImages.src = regularImg.urls.regular;
            containerDataImg.appendChild(containerDataImgImages);
            containerData.appendChild(containerDataImg);
        }
        if (!document.querySelector("#show_more_btn")) {
            const showMoreBtn = document.createElement("button");
            showMoreBtn.classList.add("container-form__button");
            showMoreBtn.textContent = "Show More...";
            showMoreBtn.style.margin = "64px 0px";
            showMoreBtn.id = "show_more_btn";
            showMoreBtn.addEventListener("click", () => {
                currentPage++;
                getUnsplashImage(document.querySelector("#search_input").value, currentPage, 12).then((response) => {
                    for (const regularImg of response.results) {
                        const containerDataImg = document.createElement("div");
                        containerDataImg.classList.add("container-data__img");
                        const containerDataImgImages = document.createElement("img");
                        containerDataImgImages.src = regularImg.urls.regular;
                        containerDataImg.appendChild(containerDataImgImages);
                        containerData.appendChild(containerDataImg);
                    }
                });
            });
            document.querySelector(".container").appendChild(showMoreBtn);
        }
    });
});