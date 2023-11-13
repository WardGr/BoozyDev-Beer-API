/*
    -- What is this file? --
    This file is the mailserver for the website. It is used in a contact form to automate sending messages. The server
    setup not included as this should be part of the big server file.
*/
const { SendMailClient } = require("zeptomail");


const url = "api.zeptomail.eu/";
//const token = hidden for github ;)

let client = new SendMailClient({url, token});


app.put('/sendMail', async (req, res) => {
    if (isCorrect(escapeHtml(req.body.name)) && isCorrect(escapeHtml(req.body.email)) && isEmail(escapeHtml(req.body.email)) && isCorrect(escapeHtml(req.body.subject)) && isCorrect(escapeHtml(req.body.message))) {
        client.sendMail({
            "from":
                {
                    "address": "contact@wardgrosemans.be",
                    "name": "ward.grosemans"
                },
            "to":
                [
                    {
                        "email_address":
                            {
                                "address": req.body.email,
                                "name": req.body.name
                            }
                    }
                ],
            "subject": "Do-Not-Reply: " + req.body.subject,
            "htmlbody": "<div><b>Thank you for your message</b><br>Your message<br><br>" + req.body.message + "<br><br> has been received. It will be handled as soon as possible. <br><br>With kind regards,<br>Ward</div>",
        }).then((resp) => res.send("mail sent")).catch((error) => res.send(error));
    } else {
        res.send("invalid input");
    }
});

function isCorrect(x) {
    return x !== undefined && x !== null && x !== "";
}

function isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
