function handleFormSubmission() {
    sendDataToSheet();
    sendMessage();
}

function sendDataToSheet() {
    const URL = "https://script.google.com/macros/s/AKfycbwXsk3NB1e26hUI9zZsuQ2wtaEMDbTorv8x8UH8MYg7-snN8iQm3Y2uO6Z072bSe5xC/exec";
    const form = document.querySelector("form");

    return fetch(URL, { 
        method: 'POST', 
        body: new FormData(form),
    })
    .then(response => {
        if (response.ok) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Failed to send data to sheet. Server responded with ' + response.status + ': ' + response.statusText));
        }
    })
    .catch(error => Promise.reject(new Error('ERROR:' + error.message)));
}

function sendMessage() {
    const serviceID = "service_2xxdu2k";
    const templateID = "template_k4cn3vh";

    const params = {
        name: document.getElementById("name").value,
        business: document.getElementById("business").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value
    };

    return emailjs.send(serviceID, templateID, params)
        .then(response => console.log('SUCCESS!', response.status, response.text))
        .catch(error => console.log('ERROR:', error));
}
