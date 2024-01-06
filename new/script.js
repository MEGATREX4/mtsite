document.addEventListener("DOMContentLoaded", function () {
    const buttonContainer = document.getElementById("buttonContainer");

    // Create a container for small buttons
    const smallButtonContainer = document.createElement("div");
    smallButtonContainer.classList.add("small-button-container");

    // Fetch JSON data
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Loop through the data and create buttons
            data.forEach(button => {
                const buttonElement = document.createElement("a");
                buttonElement.href = button.url;

                // Check if the button is small
                if (button.small) {
                    // Add small button styling
                    buttonElement.classList.add("small-button");

                    // Set the background image for small buttons
                    buttonElement.style.backgroundImage = `url('${button.icon}')`;

                    // Append the small button to the small button container
                    smallButtonContainer.appendChild(buttonElement);
                } else {
                    // Add regular button styling
                    buttonElement.classList.add("regular-button");

                    // Set the title as the caption for regular buttons
                    buttonElement.textContent = button.title;

                    // Append the button to the main container
                    buttonContainer.appendChild(buttonElement);
                }
            });
        })
        .catch(error => console.error("Error fetching data:", error));

    // Append the small button container to the main container outside the fetch block
    buttonContainer.appendChild(smallButtonContainer);
});