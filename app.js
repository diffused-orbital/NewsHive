const handleActiveCategoryBtn = (btn) => {
  document.querySelector(".category-btn.active").classList.remove("active");
  btn.classList.add("active");
};

const handleActiveNavLinkBtn = (navLink) => {
  document.querySelector(".listitem.active").classList.remove("active");
  navLink.classList.add("active");
};

const categoryButton = document.querySelectorAll(".category-btn");
categoryButton.forEach((btn) => {
  btn.addEventListener("click", () => handleActiveCategoryBtn(btn));
});

const navLinks = document.querySelectorAll(".navlist .listitem");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    handleActiveNavLinkBtn(navLink);
  });
});

const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"> <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" /> </svg>';

//handle opening and closing of modal
const handleModal = (fetchData) => {
  const cards = document.querySelectorAll(".card");
  const modal = document.querySelector("#modal");
  const closeModal = document.querySelector(".close-button");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const heading = modal.querySelector("h3");
      heading.innerText = fetchData[index].headline;

      const content = modal.querySelector("p");
      content.innerText = fetchData[index].content;

      const author = modal.querySelector("h4");
      author.innerText = fetchData[index].author;

      const date = modal.querySelector("h5");
      date.innerText = new Date(fetchData[index].date).toDateString().slice(4);

      modal.showModal();
    });
  });

  const gridarticles = document.querySelectorAll(".gridarticle");
  gridarticles.forEach((article, index) => {
    article.addEventListener("click", () => {
      const heading = modal.querySelector("h3");
      heading.innerText = fetchData[index].headline;

      const content = modal.querySelector("p");
      content.innerText = fetchData[index].content;

      const author = modal.querySelector("h4");
      author.innerText = fetchData[index].author;

      const date = modal.querySelector("h5");
      date.innerText = new Date(fetchData[index].date).toDateString().slice(4);

      modal.showModal();
    });
  });

  closeModal.addEventListener("click", () => {
    modal.close();
  });
};

//create Data Card in Section 2
const createDataCard = (fetchData) => {
  return new Promise((resolve) => {
    const sideContent = document.querySelector(".sidecontent");

    for (let i = 4; i < fetchData.length; i++) {
      const data = fetchData[i];
      const img = document.createElement("img");
      img.src = data.image;

      const headline = document.createElement("h4");
      headline.innerText = data.headline;

      const date = document.createElement("p");
      date.innerText = new Date(data.date).toDateString().slice(4);

      const cardDate = document.createElement("div");
      cardDate.classList.add("carddate");
      cardDate.innerHTML = svg;
      cardDate.appendChild(date);

      const cardDiv = document.createElement("div");
      cardDiv.classList.add("cardContent");
      cardDiv.appendChild(headline);
      cardDiv.appendChild(cardDate);

      const card = document.createElement("div");
      card.classList.add("card");
      card.appendChild(img);
      card.appendChild(cardDiv);

      sideContent.appendChild(card);
    }
    resolve(fetchData);
  });
};

//Fill data in section 1 cards
const fillGridCards = (data) => {
  const gridArticles = document.getElementsByClassName("gridarticle");
  for (let i = 0; i < 4; i++) {
    gridArticles[i].querySelector(".pillcontainer .pill").innerText =
      data[i].type;
    gridArticles[i].querySelector(".gridheadline").innerText = data[i].headline;
    gridArticles[i].querySelector(".gridinfo .gridauthor p").innerText =
      data[i].author;
    gridArticles[i].querySelector(".gridinfo .griddate p").innerText = new Date(
      data[i].date
    )
      .toDateString()
      .slice(4);

    gridArticles[
      i
    ].style.backgroundImage = `linear-gradient(transparent, #000000aa), url("${data[i].image}")`;
  }
};

fetch("https://coding-week-2024-api.onrender.com/api/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    return response.json();
  })
  .then((data) => {
    createDataCard(data).then((fetchData) => {
      handleModal(fetchData);
    });
    fillGridCards(data);
  })
  .catch((err) => {
    console.error("Fetch Error: ", err);
  });
