
console.log("Login script loaded successfully!");


const userTypeInputs = document.querySelectorAll('input[name="user-type"]');
const loginButton = document.getElementById('login-btn');
const loginForm = document.getElementById('login-form');
const languageSelector = document.getElementById('language-selector');

// Translations for each language
const translations = {
    en: {
        welcome: 'Welcome Back',
        description: 'Log in to manage your animals\' health or assist farmers.',
        farmer: 'I\'m a Farmer',
        veterinarian: 'I\'m a Veterinarian',
        signup: 'Don\'t have an account?',
        join: 'Join Us'
    },
    am: {
        welcome: 'እንኳን ደህና መጡ',
        description: 'እባኮትን እንባበሩ እና በተለይም ሐዋርነት ማስተዳደር ወይም አባላትን ማስተናገድ እባኮትን',
        farmer: 'እኔ አርበኛ ነኝ',
        veterinarian: 'እኔ አስተናጋጅ ነኝ',
        signup: 'ምንም መለኪያ ባልተኛችሁ?',
        join: 'እኛን ተቀላቅሉ'
    },
    om: {
        welcome: 'Baga nagaan dhuftan',
        description: 'Farmaasii fi dhaabbata fayyaa beeyladaa qindaa\'aa ijaaruu dhaaf galmee barreeffamaa.',
        farmer: 'Ani oomisha nyaataa hojjedha',
        veterinarian: 'Ani ogeessa beeyladaa dha',
        signup: 'Galmee hinqabdu?',
        join: 'Nu dabalami'
    }
};

// Update the page text based on the selected language
function changeLanguage(language) {
    document.getElementById('welcome-text').innerText = translations[language].welcome;
    document.getElementById('description-text').innerText = translations[language].description;
    document.getElementById('farmer-text').innerText = translations[language].farmer;
    document.getElementById('veterinarian-text').innerText = translations[language].veterinarian;
    document.getElementById('signup-text').innerText = translations[language].signup;
    document.getElementById('join-text').innerText = translations[language].join;
}

// Change language when the user selects from the dropdown
languageSelector.addEventListener('change', (event) => {
    changeLanguage(event.target.value);
});

// Initial page load with default language (English)
changeLanguage('en');

userTypeInputs.forEach(input => {
    input.addEventListener('change', () => {
        loginButton.disabled = false;
    });
});

loginForm.addEventListener('submit', (event) => {
    const selectedUserType = document.querySelector('input[name="user-type"]:checked');
    if (!selectedUserType) {
        event.preventDefault();
        loginButton.disabled = true;
        loginButton.style.cursor = 'wait'; 
    }
});


// Redirect the user on button click
loginButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.querySelector('input[name="user-type"]:checked').value;
    
    try {
        const response = await fetch(`http://10.140.160.181:5700/api/login?email=${email}&password=${password}&userType=${userType}`);

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Something went wrong\n${errorData.message}`);
        } else {
            const user = await response.json();

            if (user.success) {
                 
                localStorage.setItem('userType', user.userType);
                localStorage.setItem('fullname', user.fullname);
                localStorage.setItem('email', user.email);
                localStorage.setItem('phone', user.phone);
                localStorage.setItem('userId', user.userId);

                if (userType === 'farmers') {
                          
                    window.location.href = '../html-files/homePage.html';
                } else {
                    window.location.href = '../html-files/vetpage2.html';
                }
            } else {
                alert('Email or password is not correct');
            }
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});


