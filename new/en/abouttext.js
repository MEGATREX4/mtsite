// abouttext.js

document.addEventListener("DOMContentLoaded", function () {
    // Define the HTML code for the about text
    var aboutTextHTML = `
    <p>Founder of the amateur translation community
    <span class='colored'>"SUM Minecraft"</span>,
    I create entertainment content on <span class='colored'>
    YouTube</span> and <span class='colored'>Twitch</span></p>`;

    // Select the #abouttext element
    var aboutTextElement = document.getElementById("abouttext");

    // Set the innerHTML of the #abouttext element with the defined HTML code
    aboutTextElement.innerHTML = aboutTextHTML;
});
