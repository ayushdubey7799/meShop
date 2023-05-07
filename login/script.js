console.log('on login page');

// Getting users from local storage
let users = JSON.parse(localStorage.getItem('users'));

// Adding functionalities for login button
document.getElementById('login').addEventListener('click', (e) => {
    e.preventDefault();
    console.log("login button clicked");
    if(users===null){   // If no users are present in local storage, directing user to signup first
        alert("no users found, sign up first");
        console.log("No user found in local storage");
        window.location.assign('https://ayushdubey7799.github.io/meShop/signUp/index.html');
        return;
    }
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.filter((user) => user.email === email );
    if(!authentication(user,password))return;
    localStorage.setItem('currentUser',JSON.stringify(user[0]));
    console.log("Setting currentUser", user[0]);
    alert("Successfully Logged in");
    window.location.assign('https://ayushdubey7799.github.io/meShop/shop/index.html');
});


// Authentication for login credentials

function authentication(user,password){
    if(user.length==0){
        console.log("User email doesn't exist");
        alert("user doesn't exist");
        return false;
    }
   
    if(user[0].password != password){
        console.log("incorrect password");
        alert("incorrect password");
        return false;
    }
    return true;
}


// Condition if user tries to access profile, shop or cart before logging in

currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(currentUser === null){
   document.getElementById('cart').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
   document.getElementById('profile').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
   document.getElementById('shop').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
};