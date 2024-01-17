// status.js

document.addEventListener("DOMContentLoaded", function () {
    // Define the HTML code for the status badge
    var statusBadgeHTML = `<img src="https://api.netlify.com/api/v1/badges/7116163a-aa2c-42b3-90be-f9f820819bf2/deploy-status" alt="Netlify Status">`;

    // Select the element where you want to display the status badge
    // Replace "status-container" with the actual ID or class of your container element
    var statusContainer = document.getElementById("status-container");

    // Set the innerHTML of the container element with the defined HTML code
    statusContainer.innerHTML = statusBadgeHTML;
});
