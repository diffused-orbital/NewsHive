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

//handle opening and closing of modal
const handleModal = () => {
  const cards = document.querySelectorAll(".card");
  const modal = document.querySelector("#modal");
  const closeModal = document.querySelector(".close-button");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      modal.showModal();
    });
  });

  const gridarticles = document.querySelectorAll(".gridarticle");
  gridarticles.forEach((article) => {
    article.addEventListener("click", () => {
      modal.showModal();
    });
  });

  closeModal.addEventListener("click", () => {
    modal.close();
  });
};

handleModal();
