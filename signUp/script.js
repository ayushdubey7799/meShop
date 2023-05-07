console.log('on signup page');
let users = JSON.parse(localStorage.getItem('users'));
if(users===null)users = [];
let newUser = {};

//Adding functionalities to signup button
document.getElementById('signUp').addEventListener('click', (e) => {
      e.preventDefault();
      console.log("signup button clicked");
      let fname = document.getElementById('fname').value;
      let lname = document.getElementById('lname').value;
      let email = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      let confirm = document.getElementById('confirm').value;

      if(fname.trim() == '' || lname.trim() == '' || email.trim() == '' || password.trim() == ''){
        alert('Please fill all the empty fields');
        console.log('Please fill all the empty fields')
        return;
      }

      if(!emailCheck(email))return;

      if(password !== confirm){
        alert('Confirm Password Validation Failed');
        console.log('Confirm Password Validation Failed');
        return;
      }
      newUser.token = generateToken();
      newUser.firstName = fname;
      newUser.lastName = lname;
      newUser.email = email;
      newUser.password = password;
      newUser.cartItemIDs = []; 
      users.push(newUser);
      console.log("NEW USER:", newUser);
      localStorage.setItem('users',JSON.stringify(users));
      console.log("Stored new user in local storage user's array")
      console.log("Successfully Signed up");
      console.log("Assigning login page to window");
      alert('Successfully Signed Up');
      window.location.assign('https://ayushdubey7799.github.io/meShop/login/index.html');
});


// Generating Token
function generateToken(){
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,./;][{}@#$%~^&*()_+';
    let token = '';
    for(let i = 0;i<16;i++){
         let randomIndex = Math.floor(Math.random() * characters.length);
          token+=characters.charAt(randomIndex);
    }

    return token;
}


// Email Validation
function emailCheck(email){
  if(!email.includes('@')){
    alert('Enter Valid Email');
    console.log('Enter Valid Email');
    return false;
  }
  
   if(users.filter((user) => user.email === email).length > 0){
    console.log('email already exists');
    alert('email already exists');
    return false;
   }

   return true;

}


// Condition if user tries to access profile, shop or cart before logging in

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(currentUser === null){
   document.getElementById('cart').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
   document.getElementById('profile').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
   document.getElementById('shop').setAttribute('href','https://ayushdubey7799.github.io/meShop/login/index.html');
};
