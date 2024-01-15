document.addEventListener("DOMContentLoaded", function() {
    // List of image URLs
    var imageList = [
        "url('./tempimage/globe.png')",
        "url('./tempimage/shroomguy.png')",
        "url('./tempimage/table.png')",
        "url('./tempimage/bard.png')",
        "url('./tempimage/hat.png')",
        "url('./tempimage/hammer.png')",
        "url('./tempimage/shroomgirl.png')",
        "url('./tempimage/comp2.png')"


        // Add more image URLs as needed
    ];

    // Get the #footerimage element
    var footerImage = document.getElementById("footerimage");

    // Set a random image from the list as background-image
    var randomIndex = Math.floor(Math.random() * imageList.length);
    footerImage.style.backgroundImage = imageList[randomIndex];
});
