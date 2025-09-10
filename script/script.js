const categoryContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotal = document.getElementById("cart-total");
const modalContent = document.getElementById("modal-content");

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);

      const categories = data.categories;
      categories.forEach((cat) => {
        categoryContainer.innerHTML += `
        <li id="${cat.id}" class="hover:bg-[#38db74] p-1 rounded-xl
         hover:text-white my-2">${cat.category_name}</li>`;
      });

      categoryContainer.addEventListener("click", (e) => {
        const allLi = document.querySelectorAll("li");
        allLi.forEach((li) => {
          li.classList.remove("bg-[#15803d]", "text-white");
        });

        if (e.target.localName === "li") {
          showLoading();
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
          <div  class="bg-white  max-h-[450px] p-2 rounded-lg shadow-md mx-auto space-y-2 ">
            <img  class="w-full h-52 rounded-lg mx-auto" src="${card.image}" alt="" />
            <h2 onclick="loadModal('${card.id}')" class="text-xl text-black font-semibold text-center md:text-start ">${card.name}</h2>
            <p class='line-clamp-4 text-center md:text-start'>
              ${card.description}
            </p>
            <div class="flex justify-between items-center">
              <button
                class="bg-[#DCFCE7] px-2 rounded-2xl font-semibold text-[#15803d]  "
              >
                ${card.category}
              </button>
              <div class="font-bold"><span class=" text-xl font-bold">৳</span>${card.price}</div>
            </div>
            <button
              class="btn w-full bg-[#15803d] text-lg text-white rounded-3xl "
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

const showLoading = () => {
  cardContainer.innerHTML = `
         <div
            class="w-full h-10 bg-red-400 text-center flex justify-center items-center text-2xl ext-black p-3"
          >
            Loading....
          </div>
  `;
};

const loadModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const plants = data.plants;

      document.getElementById("modal-content").innerHTML = `
          <h3 class="text-lg font-bold">${plants.name}</h3>
          <img src="${plants.image}" class="w-full h-52 rounded-lg my-3" />
          <p><span class=" font-bold">Category: </span>${plants.name}</p>
          <p class=" font-semibold"><span class=" font-bold">Price: </span> ৳ ${plants.price}</p>
          <p class="py-2"><span class=" font-bold">Description: </span> ${plants.description}</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        `;

      document.getElementById("my_modal_1").showModal();
    });
};

// const spinner = document.getElementById("spinner");

// const loadPlantCategory = (id) => {
//   spinner.classList.remove("hidden"); // show spinner

//   fetch(`https://openapi.programming-hero.com/api/category/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       const cards = data.plants;
//       cardContainer.innerHTML = "";

//       cards.forEach((card) => {
//         cardContainer.innerHTML += `
//           <div class="bg-white p-2 rounded shadow space-y-2">
//             <img src="${card.image}" class="w-full h-52 rounded" />
//             <h2 onclick="loadModal('${card.id}')">${card.name}</h2>
//             <p>${card.description}</p>
//           </div>`;
//       });
//     })
//     .catch((err) => console.log(err))
//     .finally(() => spinner.classList.add("hidden")); // hide spinner
// };
