document.addEventListener('DOMContentLoaded', function () {
    // Get the loading animation element
    var loadingAnimation = document.getElementById('loading-animation');

    // Disable scrolling during the animation
    document.body.style.overflow = 'hidden';

    // Apply the fadeOut animation after 2 seconds
    setTimeout(function () {
        loadingAnimation.style.animation = 'fadeOut 1s ease-out forwards';
    }, 500);

    // After 3 seconds (1 second after the animation completes), hide the loading animation and enable scrolling
    setTimeout(function () {
        loadingAnimation.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 800);
});
