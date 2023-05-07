// Getting userList and currentUser from Local Storage 
let users = JSON.parse(localStorage.getItem('users'));
let currentUser = JSON.parse(localStorage.getItem('currentUser'));


// Getting name from current user and displaying on profile inputs
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
fname.value = currentUser.firstName;
lname.value = currentUser.lastName;



// Function to save updated info
document.getElementById('saveInfo').addEventListener('click', (e) => {
  e.preventDefault();

  if (fname.value.trim() == "" || lname.value.trim() == "") {
    alert("Fill all the fields");
    return;
  }

  currentUser.firstName = fname.value;
  currentUser.lastName = lname.value;

  users.forEach(element => {
    if (element.email === currentUser.email) {
      element.firstName = currentUser.firstName;
    }
  });

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  console.log("Name Successfully Updated", currentUser.firstName, currentUser.lastName);
  alert("Name successfully updated");

})


// function to save new password
document.getElementById('change').addEventListener('click', (e) => {
  e.preventDefault();
  let oldPassword = document.getElementById('oldPassword').value;
  let newPassword = document.getElementById('newPassword').value;
  let confirm = document.getElementById('confirmNewPassword').value;

  if (currentUser.password !== oldPassword) {
    alert("Old Password incorrect");
    return;
  }

  if (newPassword.trim() == "") {
    alert("Fill all the fields");
    return;
  }

  if (newPassword !== confirm) {
    alert("password confirmation failed");
    return;
  }

  currentUser.password = newPassword;

  users.forEach(element => {
    if (element.email === currentUser.email) {
      element.password = currentUser.password;
      console.log(users[0]);
    }
  });

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  console.log("Password Successfully Changed");
  alert("Password successfully changed");

});



// Logging out and removing currentUser from local Storage
document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm("Do you really want to Logout?")) {
    localStorage.removeItem('currentUser');
    window.location.assign('https://ayushdubey7799.github.io/meShop/');
  }

});