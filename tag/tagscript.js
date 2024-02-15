document.addEventListener('DOMContentLoaded', function () {
    // Load the redirect data
    fetch('your_redirect_data.json')
        .then(response => response.json())
        .then(data => {
            // Get the current article name from the URL hash
            const currentArticle = window.location.hash.slice(1);

            // Find the corresponding link in the JSON data
            const redirectInfo = data.find(item => item.name === currentArticle);

            // Redirect if a matching link is found
            if (redirectInfo) {
                window.location.replace(redirectInfo.link);
            } else {
                // Redirect to a default page if no match is found
                window.location.replace('gohome'); // Replace with your default link
            }
        })
        .catch(error => {
            console.error('Error loading redirect data:', error);
        });
});