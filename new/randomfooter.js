document.addEventListener("DOMContentLoaded", function() {
    // List of image URLs
    var imageList = [
        "url('./tempimage/globe.png')",
        // "url('./tempimage/chelik.webp')",
        "url('./tempimage/table.png')",
        "url('./tempimage/bard.png')",
        "url('./tempimage/hat.png')",
        "url('./tempimage/hammer.png')",


        // Add more image URLs as needed
    ];

    // Get the #footerimage element
    var footerImage = document.getElementById("footerimage");

    // Set a random image from the list as background-image
    var randomIndex = Math.floor(Math.random() * imageList.length);
    footerImage.style.backgroundImage = imageList[randomIndex];
});
