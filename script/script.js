const categoryContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotal = document.getElementById("cart-total");

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);

      const categories = data.categories;
      categories.forEach((cat) => {
        categoryContainer.innerHTML += `
        <li id="${cat.id}" class="hover:bg-[#38db74] p-1 rounded-xl
         hover:text-white">${cat.category_name}</li>`;
      });

      categoryContainer.addEventListener("click", (e) => {
        const allLi = document.querySelectorAll("li");
        allLi.forEach((li) => {
          li.classList.remove("bg-[#15803d]", "text-white");
        });

        if (e.target.localName === "li") {
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
          <div class="bg-white max-h-full p-2 rounded-lg shadow-md mx-auto space-y-2 ">
            <img class="w-60 h-52 rounded-lg mx-auto" src="${card.image}" alt="" />
            <h2 class="text-xl text-black font-semibold text-center md:text-start ">${card.name}</h2>
            <p class='line-clamp-4 text-center md:text-start'>
              ${card.description}
            </p>
            <div class="flex justify-between items-center">
              <button
                class="bg-[#DCFCE7] px-2 rounded-2xl font-semibold text-[#15803d] "
              >
                ${card.category}
              </button>
              <div class="font-bold"><span class=" text-xl font-bold">৳</span>${card.price}</div>
            </div>
            <button
              class="btn btn-wide bg-[#15803d] text-lg text-white rounded-3xl block text-center"
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

  let totalPrice = 0;

  cardContainer.addEventListener("click", (e) => {
    if (e.target.innerText === "Add to Cart") {
      const parentNode = e.target.parentNode;
      const cardTitle = parentNode.children[1].innerText;

      const cartPriceText = parentNode.querySelector(".font-bold").innerText;
      const cardPrice = parseFloat(cartPriceText.replace("৳", ""));
      alert(`${cardTitle} has been added to cart`);

      const cartItem = document.createElement("div");

      cartItem.innerHTML = `
      <div class=" flex justify-between items-center mb-3   bg-[#DCFCE7] p-2 rounded">
      <div class="">
      <h2 class="text-lg font-bold">${cardTitle}</h2>
      <p>${cartPriceText}</p>
      </div>
       <button class="remove-btn text-red-500 font-bold">❌</button>
      </div>
    `;

      cartItemsContainer.appendChild(cartItem);

      totalPrice = totalPrice + cardPrice;
      cartTotal.innerText = ` ৳${totalPrice}`;

      const removeButton = cartItem.querySelector(".remove-btn");

      removeButton.addEventListener("click", () => {
        cartItemsContainer.removeChild(cartItem);

        // cartItemsContainer.removeChild(cartItem);
        totalPrice -= cardPrice;
        totalPrice = Math.round(totalPrice * 100) / 100;
        cartTotal.innerText = ` ৳ ${totalPrice}`;
      });
    }
  });
};
loadCategories();
