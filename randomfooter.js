document.addEventListener("DOMContentLoaded", function() {
    // List of image URLs
    var imageList = [
        "url(https://i.imgur.com/h68yMHW.png)",
        "url(https://i.imgur.com/wGbvEX1.png)",
        "url(https://i.imgur.com/KGy5smy.png)",
        "url(https://i.imgur.com/Zofg76B.png)",
        "url(https://i.imgur.com/eXkOnsg.png)",
        "url(https://i.imgur.com/VlyQ3pV.png)",
        "url(https://i.imgur.com/batTDxx.png)",
        "url(https://i.imgur.com/nKI5jUX.png)",
        "url(https://i.imgur.com/Tq8wqfV.png)",
        "url(https://i.imgur.com/nWGdCBX.png)"


        // Add more image URLs as needed
    ];

    // Get the #footerimage element
    var footerImage = document.getElementById("footerimage");

    // Set a random image from the list as background-image
    var randomIndex = Math.floor(Math.random() * imageList.length);
    footerImage.style.backgroundImage = imageList[randomIndex];
});
