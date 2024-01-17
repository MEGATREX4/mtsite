document.addEventListener("DOMContentLoaded", function () {
    // Check if userLanguage is set in localStorage
    var userLanguage = localStorage.getItem("userLanguage");

    // Check if the initial redirection has already occurred
    var initialRedirection = localStorage.getItem("initialRedirection");

    // If userLanguage is set and the initial redirection hasn't occurred, redirect to the corresponding language version of the current page
    if (userLanguage && !initialRedirection) {
        var currentPage = window.location.pathname.split("/").pop();
        var languageSuffix = userLanguage === "uk" ? "" : "/en";
        localStorage.setItem("initialRedirection", "true"); // Set the flag to indicate that the initial redirection has occurred
        window.location.href = languageSuffix + "/" + currentPage;
    }

    // Add click event listeners to language selection buttons
    document.querySelector(".uk").addEventListener("click", function () {
        changeLanguage("uk");
    });

    document.querySelector(".en").addEventListener("click", function () {
        changeLanguage("en");
    });

    // Add click event listeners to emoji language selection buttons
    document.querySelector("div.uk").addEventListener("click", function () {
        changeLanguage("uk");
    });

    document.querySelector("div.en").addEventListener("click", function () {
        changeLanguage("en");
    });

    // Function to change language, store it in localStorage, and redirect to the corresponding language version of the current page
    function changeLanguage(lang) {
        localStorage.setItem("userLanguage", lang);
        var currentPage = window.location.pathname.split("/").pop();
        var languageSuffix = lang === "uk" ? "" : "/en";
        window.location.href = languageSuffix + "/" + currentPage;
    }
});
