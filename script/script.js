const categoryContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const cartItemsContainer = document.getElementById("cart-items-container");

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);

      const categories = data.categories;
      categories.forEach((cat) => {
        console.log(cat.category_name);
        categoryContainer.innerHTML += `
        <li id="${cat.id}" class="hover:bg-[#15803d] p-1 rounded-xl
         hover:text-white">${cat.category_name}</li>`;
      });

      categoryContainer.addEventListener("click", (e) => {
        // console.log(e.target.localName);

        const allLi = document.querySelectorAll("li");
        // console.log(allLi);
        allLi.forEach((li) => {
          li.classList.remove("bg-[#15803d]", "text-white");
        });

        if (e.target.localName === "li") {
          // console.log(e.target.id);
          e.target.classList.add("bg-[#15803d]", "text-white");
          loadPlantCategory(e.target.id);
        }
      });
    });

  const loadPlantCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.plants);

        const cards = data.plants;
        cardContainer.innerHTML = "";

        cards.forEach((card) => {
          cardContainer.innerHTML += `
          <div class="bg-white max-h-full p-2 rounded-lg shadow-md space-y-2 ">
            <img class="w-60 h-52 rounded-lg" src="${card.image}" alt="" />
            <h2 class="text-xl text-black font-semibold">${card.name}</h2>
            <p class='line-clamp-4'>
              ${card.description}
            </p>
            <div class="flex justify-between items-center">
              <button
                class="bg-[#DCFCE7] px-2 rounded-2xl font-semibold text-[#15803d]"
              >
                ${card.category}
              </button>
              <div class="font-bold"><span class=" text-xl font-bold">৳</span>${card.price}</div>
            </div>
            <button
              class="btn btn-wide bg-[#15803d] text-lg text-white rounded-3xl"
            >
              Add to Cart
            </button>
          </div>
          
          `;
        });
      });
  };
  window.onload = () => {
    loadPlantCategory("1");
  };

  cardContainer.addEventListener("click", (e) => {
    // console.log(e.target.innerText);
    if (e.target.innerText === "Add to Cart") {
      alert("Item added to the cart");
      console.log("Clicked Button");
    }
  });
};
loadCategories();
