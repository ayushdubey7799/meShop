console.log('landing page');


let loginButton = document.getElementById('login');
let signUpButton = document.getElementById('signUp');

// Adding event listeners to login and signup button to get to respective pages.

loginButton.addEventListener('click', () => {
      console.log('login button clicked, assigning login page to window object');
      window.location.assign('https://ayushdubey7799.github.io/meShop/login/index.html');
});

signUpButton.addEventListener('click', () => {
      console.log('signup button clicked, assigning signup page to window object');
      window.location.assign('https://ayushdubey7799.github.io/meShop/signUp/index.html');
});



// Condition if user tries to access profile, shop or cart before logging in

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(currentUser === null){
   console.log('Login to access your account');
   document.getElementById('cart').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
   document.getElementById('profile').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
   document.getElementById('shop').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
};
