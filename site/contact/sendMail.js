window.onload = function() {
    const btn = document.getElementById('submit');
    btn.addEventListener('click', getJson);
    addCount();
}

function addCount() {
    const textarea = document.getElementById('message');
    const tokenCount = document.getElementById('contact-tokens');
    const maxTokens = 250;

    const updateTokenCount = () => {
        const text = textarea.value;
        const tokens = text.length;
        tokenCount.textContent = `${tokens}/${maxTokens}`;
    };

    textarea.addEventListener('keypress', updateTokenCount);
    textarea.addEventListener('input', updateTokenCount);

    tokenCount.textContent = `0/${maxTokens}`;
}

function getJson() {
    const name = escapeHtml(document.getElementById('name').value);
    const email = escapeHtml(document.getElementById('email').value);
    const subject = escapeHtml(document.getElementById('subject').value);
    const message = escapeHtml(document.getElementById('message').value);

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    send(JSON.stringify({ name: name, email: email, subject: subject, message: message }));
}

function changeText() {
    const field = document.getElementById("error");
    field.innerHTML = "Your message has been sent!";
}




const baseUrl = 'https://beers.boozydev.com/sendMail';

async function send(json) {
    fetch(baseUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    }).then(response => response.json())
        .then(data => {
            changeText("Your message has been sent!");
        })
        .catch(error => {
            changeText("Something went wrong, please try again later.");
        });
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}