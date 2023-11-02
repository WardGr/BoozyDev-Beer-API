document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://dropplet.wardgrosemans.be:8080';

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
});

function navbar() {
    var x = document.getElementById("navbar");
    x.classList.toggle("responsive");
}