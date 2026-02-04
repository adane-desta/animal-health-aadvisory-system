

 const contactForm = document.getElementById('contact-form');

 contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const emailorphone = document.getElementById("email").value;
    const question = document.getElementById("question").value;
    const address = document.getElementById("address").value;

    const responce = await fetch('http://localhost:5700/api/userQuestion', {

        method: 'POST',

        body: JSON.stringify({
            questionData: {name , emailorphone , question , address }
        }),
    
        headers: {'content-type': 'application/json'}
     
    });

    if (responce.ok) {
        alert("your question has been submitted successfully ")
    }else{
        alert("sorry something went wrong")
    }

});