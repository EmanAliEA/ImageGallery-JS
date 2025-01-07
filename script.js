const images = [
  {
    id: 0,
    src: "https://th.bing.com/th/id/R.39bd85ccce948909803868621a2cc050?rik=Sm0Vu8hXHf5mJw&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f06%2fHD-Nature-Backgrounds-Images-Download.jpg&ehk=BUfEe8Tl1kYxxNDDlFxMCRKKjwKA64sKN7i%2biRuJ6r4%3d&risl=1&pid=ImgRaw&r=0",
  },
  {
    id: 1,
    src: "https://images.fineartamerica.com/images-medium-large/spectacular-kauai-sunrise-jeff-stein.jpg",
  },
  {
    id: 2,
    src: "https://th.bing.com/th/id/R.911c6f532d966c240175b489ce97be2d?rik=DQMNtsQ2QjYLcA&pid=ImgRaw&r=0",
  },
  {
    id: 3,
    src: "https://th.bing.com/th/id/R.d8fb4f1760e161d453304fe1dde76024?rik=QkJcR6qDenNEFg&riu=http%3a%2f%2f2.bp.blogspot.com%2f-qKDLV1wxrMA%2fUMIAfeT19LI%2fAAAAAAAAOsE%2fVhSoAvOwBtU%2fs1600%2fBeautiful%2bAutumn%2bScenery%2bWallpapers%2b05.jpg&ehk=ViLvw1MbcFr51Oy%2b3BM6FddRtxOUzujbPTJilKsi26g%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 4,
    src: "https://img.freepik.com/premium-photo/starry-night-sky-mesmerizing-view-serene-landscape_1101231-1237.jpg",
  },
  {
    id: 5,
    src: "https://th.bing.com/th/id/R.057b31be70cc73b9d0c829205f90e02f?rik=PxrTE7PkNVZoRg&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fCool-nature-backgrounds-hd-resolution-1920x1080.jpg&ehk=hQzPW7PZMRmNSlTgkm1V0lR4FopZ7yGKJtUMRedf8wM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 6,
    src: "https://live.staticflickr.com/1046/1466388909_354509b40b_b.jpg",
  },
];

// Deceleration
const listImages = document.querySelector(".list-images");
const overlaySection = document.querySelector(".overlay-section");
const overlayImage = document.querySelector(".overlay-image");
const displayList = document.querySelector(".display-list");
let imgLen = images.length - 1;
function createImageItem(img, parent, type) {
  const html = `
    <li data-id=${img.id} class='item'>
        <img
          src=${img.src}
          loading='lazy'
          class=${type ? " rounded-2" : ""}
        />
      </li>
  `;
  parent.insertAdjacentHTML("beforeend", html);
}

function renderImages(parent, type, start) {
  parent.innerHTML = "";
  if (type) {
    // len=> 7 start=>2  {3,4, 5 }
    for (let i = 1; i < 4; i++) {
      // console.log(start, (start + i) % imgLen);
      createImageItem(images[(start + i) % imgLen], parent, type);
    }
  } else images.map((item) => createImageItem(item, parent, type));
}

function searchImage(id) {
  return images.find((item) => item.id === id);
}

renderImages(listImages, false);

// Events
listImages.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    // console.log(e.target.closest(".item"));
    const id = +e.target.closest(".item").dataset.id;
    overlaySection.classList.toggle("show");
    overlayImage.src = searchImage(id).src;
    overlayImage.dataset.id = id;
    // overlayImage.classList.add("fullImage");

    overlayImage.style.width = "100%";
    // console.log(id);
    // renderImages(displayList, true, id);
  }
});

document.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (e.key === "Escape") overlaySection.classList.toggle("show");
});

// way 1
// overlaySection.addEventListener("click", (e) => {
//   if (e.target.tagName === "IMG") {
//     overlayImage.style.width = "0%";
//     const id = +e.target.closest(".item").dataset.id;
//     setTimeout(() => {
//       overlayImage.src = images[id % imgLen].src;
//     }, 600);
//     setTimeout(function () {
//       overlayImage.style.width = "100%";
//     }, 600);

//     renderImages(displayList, true, id);
//   } else overlaySection.classList.toggle("show");
// });

// Way 2
overlaySection.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.tagName === "IMG") {
    const id = +e.target.dataset.id + 1;
    overlayImage.src = searchImage(id % imgLen).src;
    overlayImage.dataset.id = id % imgLen;

    overlayImage.style.width = "100%";
  } else overlaySection.classList.toggle("show");
});
