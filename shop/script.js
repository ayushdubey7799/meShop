console.log("on shopping page");

// Our Product Data will be stored in this variable
let data;


// function to store products in our data array only if local storage don't have products
function storeDataInArray() {
  console.log("Storing products in array named data and saving it in local storage");
  data = JSON.parse(localStorage.getItem("data"));
  displayData();
}


// function to get data from API when opening site for first time
async function getData() {
  try {
    if (localStorage.getItem("data") == null) {
      console.log("fetching data from API");
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      products.forEach((product) => { product = addColorsAndSizes(product) });
      console.log(products);
      localStorage.setItem("data", JSON.stringify(products));
      data = [...products];
      displayData();
    }
    else {
      console.log("fetching data from local storage");
      storeDataInArray();
    }
  } catch (error) {
    console.log(error);
  }

}


// function to add random colors and sizes to clothing sections
function addColorsAndSizes(product) {
  let colors = ['red', 'blue', 'green', 'black', 'grey'];
  let sizes = ['s', 'm', 'l', 'xl', 'xxl'];
  let uniqueColorIndexes = [];
  let uniqueSizeIndexes = [];

  while (uniqueColorIndexes.length < 3) {
    let random = Math.floor(Math.random() * 5);
    if (uniqueColorIndexes.indexOf(random) == -1) {
      uniqueColorIndexes.push(random);
    }
  }

  while (uniqueSizeIndexes.length < 3) {
    let random = Math.floor(Math.random() * 5);
    if (uniqueSizeIndexes.indexOf(random) == -1) {
      uniqueSizeIndexes.push(random);
    }
  }

  product.colors = [colors[uniqueColorIndexes[0]], colors[uniqueColorIndexes[1]], colors[uniqueColorIndexes[2]]];
  product.sizes = [sizes[uniqueSizeIndexes[0]], sizes[uniqueSizeIndexes[1]], sizes[uniqueSizeIndexes[2]]];
  return product;
}

getData();



// function to display data on the shop page
function displayData() {
  console.log("Displaying Data to shop page", data);
  data.map((item) => {
    let category = item.category.charAt(0);
    let items = document.querySelector(`[data-ns-category=${category}]`);

    if (category == 'j' || category == 'e') {
      items.insertAdjacentHTML('beforeend', ` <div class = "item" key = ${item.id}>
      <img src="${item.image}" alt="Item" />
      <div class="info">
        <div class="title">${item.title}</div>
          <div class="price">$${item.price}</div>
        <div class="row">Rating:${item.rating.rate}</div>
        <button class="addBtn" onclick ='addToCart(${item.id})'>Add to Cart</button>
      </div>
     </div>
    `);
    }
    else {
      items.insertAdjacentHTML('beforeend', ` <div class = "item" key = ${item.id}>
    <img src="${item.image}" alt="Item" />
    <div class="info">
      <div class="title">${item.title}</div>
        <div class="price">$${item.price}</div>
      <div class="sized">Size: ${item.sizes[0]},${item.sizes[1]},${item.sizes[2]}</div>
      <div class="colors">
        Colors:
        <div class="row">
          <div class="circle" style="background-color:${item.colors[0]}"></div>
          <div class="circle" style="background-color:${item.colors[1]}"></div>
          <div class="circle" style="background-color:${item.colors[2]}"></div>
        </div>
      </div>
      <div class="row">Rating:${item.rating.rate}</div>
      <button class="addBtn" onclick ='addToCart(${item.id})'>Add to Cart</button>

    </div>
   </div>
  `);
    }
  });
}



// filters

// Search by title (all other filters except category becomes null)
let filterSearch = document.getElementById('filterSearch');

let timer;
filterSearch.addEventListener('keyup', () => {
  clearTimeout(timer);
  timer = setTimeout(liveSearch, 1000);
});

function liveSearch() {
  document.getElementById('range').value = 0;
  data.forEach((item) => {
    let product = document.querySelector(`[key = '${item.id}']`);
    let value = filterSearch.value.toLowerCase();
    console.log("Search", value);
    if (!item.title.toLowerCase().includes(value)) {
      product.classList.add('hide');
    }
    else {
      product.classList.remove('hide');
    }
  });

}



// Filter By Rating (all other filters except category becomes null)
let range = document.getElementById('range');
range.addEventListener('change', filterByRating);
function filterByRating() {
  document.getElementById('filterSearch').value = "";
  console.log(`Filter By Rating greater than ${range.value}`)
  data.forEach((item) => {
    let product = document.querySelector(`[key = '${item.id}']`);
    if (item.rating.rate < range.value) {
      product.classList.add('hide');
    }
    else {
      product.classList.remove('hide');
    }
  });


}



// filter by Price range (all other filters except category becomes null)
let priceUpto25 = false;
let price25To50 = false;
let price50To100 = false;
let price100on = false;
document.getElementById('0-25').addEventListener('change', (event) => { priceUpto25 = event.target.checked });
document.getElementById('25-50').addEventListener('change', (event) => { price25To50 = event.target.checked });
document.getElementById('50-100').addEventListener('change', (event) => { price50To100 = event.target.checked });
document.getElementById('100on').addEventListener('change', (event) => { price100on = event.target.checked });

document.getElementById('priceRange').addEventListener('change', filterByPriceRange);
function filterByPriceRange() {
  document.getElementById('filterSearch').value = "";
  document.getElementById('range').value = 0;


  if (priceUpto25 && !price25To50 && !price50To100 && !price100on) {
    console.log("Price range: less than 25 dollars");
    displayFilteredData(0, 25);
  }
  else if (!priceUpto25 && price25To50 && !price50To100 && !price100on) {
    console.log("Price range: between 25 and 50 dollars");

    displayFilteredData(25, 50);
  }
  else if (!priceUpto25 && !price25To50 && price50To100 && !price100on) {
    console.log("Price range: between 50 and 100 dollars");
    displayFilteredData(50, 100);
  }
  else if (!priceUpto25 && !price25To50 && !price50To100 && price100on) {
    console.log("Price range: above 100 dollars");
    displayFilteredData(100, 1000000);
  }
  else if (priceUpto25 && price25To50 && !price50To100 && !price100on) {
    console.log("Price range: between 0 and 50 dollars");
    displayFilteredData(0, 50);
  }
  else if (!priceUpto25 && price25To50 && price50To100 && !price100on) {
    console.log("Price range: between 25 and 100 dollars");
    displayFilteredData(25, 100);
  }
  else if (!priceUpto25 && !price25To50 && price50To100 && price100on) {
    console.log("Price range: above 50 dollars");
    displayFilteredData(50, 1000000);
  }
  else if (priceUpto25 && price25To50 && price50To100 && !price100on) {
    console.log("Price range: between 0 and 100 dollars");
    displayFilteredData(0, 100);
  }
  else if (!priceUpto25 && price25To50 && price50To100 && price100on) {
    console.log("Price range: above 25 dollars");
    displayFilteredData(25, 1000000);
  }
  else {
    displayFilteredData(0, 1000000);
  }

}

// displaying filtered data by range
function displayFilteredData(a, b) {
  data.forEach((item) => {
    let product = document.querySelector(`[key = '${item.id}']`);
    if (item.price < a || item.price >= b) {
      product.classList.add('hide');
    }
    else {
      product.classList.remove('hide');
    }
  });


}


// Category Filter
let filters = document.getElementById('filters');
filters.addEventListener('click', (e) => {
  let remfilters = e.target.parentElement.children;

  for (let i = 0; i < remfilters.length; i++) {
    remfilters[i].classList.remove('active');
  }
  e.target.classList.toggle('active');

  let reqData = e.target.id.slice(0, 1);
  displaySection(reqData);
});


function displaySection(reqData) {

  let items = document.getElementsByClassName('items');
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = 'none';
  }

  if (reqData == 'a') {
    for (let i = 0; i < items.length; i++) {
      items[i].style.display = 'flex';
    }
  }
  else {
    console.log(`Displaying category starting with letter ${reqData}`)
    let itemsToDisplay = document.querySelector(`[data-ns-category=${reqData}]`);
    itemsToDisplay.style.display = 'flex';
  }
}

function addToCart(id) {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log("Item added to Cart");
  currentUser.cartItemIDs.push(id);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let users = JSON.parse(localStorage.getItem('users'));
  users = users.filter((item) => currentUser.email != item.email);
  users.push(currentUser);
  localStorage.setItem('users', JSON.stringify(users));

}