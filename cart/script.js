console.log("On Cart Page");


displayData();



// Displaying cart Items on the page
function displayData() {
    let cartItems = getCartItems();

    let items = document.getElementById('flex-items');
    items.innerHTML = "";
    cartItems.map((item) => {
        items.insertAdjacentHTML('beforeend', ` <div class = "item" key = ${item.id}>
    <img src="${item.image}" alt="Item" />
    <div class="info">
      <div class="title">${item.title}</div>
        <div class="price">$${item.price}</div>
      <div class="sized">Size: </div>
      <div class="colors">
        Colors:
        <div class="row">
          <div class="circle" style="background-color:black"></div>
          <div class="circle" style="background-color:black"></div>
          <div class="circle" style="background-color:black" ></div>
        </div>
      </div>
      <div class="row">Rating:${item.rating.rate}</div>
      <button class="removeBtn" onclick ='removeFromCart(${item.id})'>Remove from Cart</button>

    </div>
   </div>`);
    });

    billing(cartItems);
}

// Getting Cart items from localstorage -> currentUser -> cartItemIds
function getCartItems() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let data = JSON.parse(localStorage.getItem('data'));
    let cartItemIDs = currentUser.cartItemIDs;
    let cartItems = [];
    cartItemIDs.forEach(id => {
        cartItems.push(data[id - 1]);
    });
    return cartItems;
}

// Adding amount and displaying total bill on the page
function billing(cartItems) {
    let list = document.querySelector('#products');
    list.innerHTML = "";
    let total = 0;
    cartItems.forEach((item) => {
        list.insertAdjacentHTML('beforeend', `<hr><div class="product">
        <h5>${item.title}</h5>
        <div class="amount">${item.price}$</div>
      </div>`);

        total += item.price;
    });
    let totalAmount = document.getElementById('totalAmount');
    totalAmount.innerHTML = parseFloat(total) + '$';
}


// Removing Cart Items
function removeFromCart(id) {
    console.log("removing item from cart");
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.cartItemIDs = currentUser.cartItemIDs.filter((item) => item != id);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    displayData();
}


// Adding functionality to checkout button using RazorPay test mode
document.getElementById('checkOut').addEventListener('click', checkout);
function checkout() {
    console.log("Checking Out");
    try {
        let totalAmount = document.getElementById('totalAmount').innerHTML.slice(0, -1);
        if(totalAmount.slice(-2).length )
        totalAmount = +totalAmount;
        totalAmount*=80; // for USD -> INR approximate conversion
        if(totalAmount>24999)totalAmount = 24999;
        totalAmount*=100; //  for rupee -> paise conversion
        
        console.log(totalAmount);
        var options = {
            key: 'rzp_test_3GKOeoFSLxIXAx',
            amount: `${totalAmount}`,
            currency: "INR",
            name: "MeShop CheckOut",
            description: "This is your order",
            theme: {
                color: '#000',
            },
            image:
            "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg"
        };

        var rzp = new Razorpay(options);
        rzp.open();
        clearMyCart();
    }
    catch (error) {
        console.log(error);
    }
}


// function to clear the cart items from local storage
function clearMyCart() {
    console.log("Payment Done Successfully");
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.cartItemIDs = [];
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    displayData();
}