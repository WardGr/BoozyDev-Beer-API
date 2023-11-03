document.addEventListener('DOMContentLoaded', () => {
    //const baseUrl = 'https://dropplet.wardgrosemans.be:4430';
    //const baseUrl = 'https://boozydev.com:4430';
    const baseUrl = 'http://localhost:8080';

    // Get system Pints
    const getSystemButton = document.getElementById('get-system-pints');
    const SystemInfo = document.getElementById('system-pints-info');

    getSystemButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`${baseUrl}/pints`, { method: 'GET' });
            const data = await response.json();

            const ulElement = document.createElement('ul');
            data.forEach((item) => {
                const listItem = document.createElement('li');
                listItem.textContent = JSON.stringify(item, null, 2);
                ulElement.appendChild(listItem);
            });
            SystemInfo.innerHTML = '';
            SystemInfo.appendChild(ulElement);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // clear system pints
    const clearSystemButton = document.getElementById('clear-system-pints');
    clearSystemButton.addEventListener('click', async () => {
        SystemInfo.textContent = "";
    });

    // Post Pintje Beer
    const postPintjeButton = document.getElementById('post-pintje');
    const pintjeIdInput = document.getElementById('pintje-id');
    const pintjeBodyInput = document.getElementById('pintje-body');
    const pintjeInfo = document.getElementById('pintje-info');
    const pintjeUser = document.getElementById('pintje-username');

    postPintjeButton.addEventListener('click', async () => {
        const username = escapeHtml(pintjeUser.value);
        const id = escapeHtml(pintjeIdInput.value);
        console.log(id);
        console.log(username);

        const body = escapeHtml(pintjeBodyInput.value);
        if (!id) {
            alert('Please enter a value for the beer name field.');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/userpints/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, body }),
            });
            if (response.status === 400) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                pintjeInfo.textContent = `Error: ${errorData.message}`;
            } else {
                const data = await response.json();
                pintjeInfo.textContent = JSON.stringify(data, null, 2);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Get user Pints
    const getUserbeerButton = document.getElementById('get-user-pints');
    const UserInfo = document.getElementById('user-pints-info');

    getUserbeerButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`${baseUrl}/userpints`, { method: 'GET' });
            const data = await response.json();

            const ulElement = document.createElement('ul');
            data.forEach((item) => {
                const listItem = document.createElement('li');
                listItem.textContent = JSON.stringify(item, null, 2);
                ulElement.appendChild(listItem);
            });
            UserInfo.innerHTML = '';
            UserInfo.appendChild(ulElement);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // clear user pints
    const clearUserBtn = document.getElementById('clear-user-pints');
    clearUserBtn.addEventListener('click', async () => {
        UserInfo.textContent = "";
    });

    const specificPintButton = document.getElementById('get-specific-pint');
    const specificPintInput = document.getElementById('specificPintInput');
    const specificPintInfo = document.getElementById('specific-pint-info');
    const specificClear = document.getElementById('clear-specific-pint');

    specificPintButton.addEventListener('click', async () => {
        const name = escapeHtml(specificPintInput.value);
        console.log(name);
        if (!name) {
            alert('Please enter a value for the beer name field.');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/userpints/${name}`, {
                method: 'GET',
            });
            if (response.status === 440) {

                specificPintInfo.textContent = `Error: cannot find pint in database`;
            } else {
                const data = await response.json();
                specificPintInfo.textContent = JSON.stringify(data, null, 2);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


    specificClear.addEventListener('click', async () => {
        specificPintInfo.textContent = "";
    });

    specific_user_pints();
});

function navbar() {
    var x = document.getElementById("navbar");
    x.classList.toggle("responsive");
}

function specific_user_pints() {
    const baseUrl = 'http://localhost:8080';
    const button = document.getElementById('get-specific-user-pints');
    const input = document.getElementById('specific-user-input');
    const info = document.getElementById('specific-user-pints-info');
    const clear = document.getElementById('clear-specific-user-pints');

    button.addEventListener('click', async () => {
        const name = escapeHtml(input.value);
        console.log(name);
        if (!name) {
            alert('Please enter a user you want to lookup.');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/userpints/user/${name}`, {
                method: 'GET',
            });
            if (response.status === 440) {

                info.textContent = `Error: cannot find user in database`;
            } else {
                const data = await response.json();

                const ulElement = document.createElement('ul');
                data.forEach((item) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = JSON.stringify(item, null, 2);
                    ulElement.appendChild(listItem);
                });
                info.innerHTML = '';
                info.appendChild(ulElement);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


    clear.addEventListener('click', async () => {
        info.textContent = "";
    });
    /*
      <div id="specific-user-pints-result">
    <h2>Get Pints Specific User</h2>
    <button id="get-specific-user-pints">Get User Pints</button>
    <button id="clear-specifi-user-pints">Clear</button>

    <pre id="specific-user-pints-info"></pre>
  </div>
     */
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