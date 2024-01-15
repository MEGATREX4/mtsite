// abouttext.js

document.addEventListener("DOMContentLoaded", function () {
    // Define the HTML code for the about text
    var aboutTextHTML = `<p>Засновник аматорської перекладацької спільноти <span class='colored'>"СУМ Майнкрафт"</span>, роблю розважальний контент на <span class='colored'>YouTube</span> та <span class='colored'>Twitch</span></p>`;

    // Select the #abouttext element
    var aboutTextElement = document.getElementById("abouttext");

    // Set the innerHTML of the #abouttext element with the defined HTML code
    aboutTextElement.innerHTML = aboutTextHTML;
});
