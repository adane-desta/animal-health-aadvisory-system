

// language ToggleEvent
const languageSelector = document.getElementById("language-selector");
const doctorForm = document.getElementById('doctor-form');
const farmerForm = document.getElementById('farmer-form')
let newUserType = "";

languageSelector.addEventListener('change', (event) => {
    document.documentElement.lang = event.target.value;
});

document.getElementById('doctor-btn').addEventListener('click', function() {
    newUserType = "doctor";
    // Show the doctor form, hide the farmer form
    doctorForm.style.display = 'block';
    farmerForm.style.display = 'none';
    
    // Add active class and background transition
    document.querySelector('.form-container').classList.add('doctor-active');
    document.querySelector('.form-container').classList.remove('farmer-active');

    // Toggle active class on buttons
    this.classList.add('active');
    document.getElementById('farmer-btn').classList.remove('active');
});

document.getElementById('farmer-btn').addEventListener('click', function() {
    newUserType = "farmer";
    // Show the doctor form, hide the farmer form
    farmerForm.style.display = 'block';
    doctorForm.style.display = 'none';
    
    // Add active class and background transition
    document.querySelector('.form-container').classList.add('farmer-active');
    document.querySelector('.form-container').classList.remove('doctor-active');

    // Toggle active class on buttons
    this.classList.add('active');
    document.getElementById('doctor-btn').classList.remove('active');
});

farmerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title-farmer').value;
    const firstName = document.getElementById('farmer-first-name').value;
    const lastName = document.getElementById('farmer-last-name').value;
    const email = document.getElementById('farmer-email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const confirmpassword = document.getElementById('confirm-password-farmer').value;
    const password = document.getElementById('farmer-password').value;

    if (confirmpassword === password) {
        const response = await fetch('http://localhost:5700/api/new-farmer', {
            method: 'POST',
            body: JSON.stringify({
                newFarmerData: { firstName, lastName, email, password, phone, location }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert("You have signed up successfully");
            window.location.href = '/html_files/loginpage.html';
        } else {
            alert("Sorry, something went wrong");
        }
    } else {
        alert("Passwords do not match");
    }
});

doctorForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('doctor_title').value;
    const firstName = document.getElementById('doctor_first-name').value;
    const lastName = document.getElementById('doctor_last-name').value;
    const email = document.getElementById('doctor_email').value;
    const phone = document.getElementById('doctor_phone').value;
    const organization = document.getElementById('organization').value;
    const speciality = document.getElementById('doctor_speciality').value;
    const confirmpassword = document.getElementById('confirm-password-doctor').value;
    const password = document.getElementById('doctor-password').value;

    if(confirmpassword === password){

          const response = await fetch('http://localhost:5700/api/new-doctor' , {

        method: 'POST',

        body: JSON.stringify({
            newDoctorData: { firstName , lastName , email, password , phone  , speciality , organization }
        }),
        headers: { 'Content-type': 'application/json' }

       });

       if (response.ok) {
        alert("You have signed up successfully");
        window.location.href = '../html_files/loginPage.html';
       } else {
        alert("Sorry, something went wrong");
      }  
    }else{
        alert("passwords do not match");
    }


});
