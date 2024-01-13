document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.image');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    let currentIndex = 0;
    let currentCategory = 'all';




    function showModal(index) {
        modalContent.style.backgroundImage = images[index].style.backgroundImage;
        modal.style.display = 'block';
        document.body.classList.add('gallery-open');
        currentCategory = document.querySelector('.tab.active').getAttribute('data-category');

        // Add the animation for full-screen mode
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';

            document.body.style.overflow = 'hidden';
            modalContent.addEventListener('wheel', handleWheel); // Enable wheel navigation
            document.addEventListener('keydown', handleKeyboardArrows);
        }, 10);
    }

    function hideModal() {
        modal.style.display = 'none';
        document.body.classList.remove('gallery-open');
        // Reset the transform when hiding the modal
        modalContent.style.transform = 'scale(0.9)';
        document.body.classList.remove('gallery-open');

        document.body.style.overflow = 'auto'; // Re-enable scrolling
        modalContent.removeEventListener('wheel', handleWheel); // Disable wheel navigation
        document.removeEventListener('keydown', handleKeyboardArrows);
    }

    function handleBackButton() {
        hideModal();
        window.removeEventListener('popstate', handleBackButton);
    }

    function handleKeyboardArrows(event) {
        if (modal.style.display === 'block') {
            const categoryImages = getVisibleImages();
            
            if (event.key === 'ArrowRight' || event.key === 'a' || event.key === 'A') {
                currentIndex = (currentIndex + 1) % categoryImages.length;
            } else if (event.key === 'ArrowLeft' || event.key === 'd' || event.key === 'D') {
                currentIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
            }
    
            showModal(categoryImages[currentIndex]);
        }
    }
    
    

    document.querySelector('.next').addEventListener('click', function () {
        const categoryImages = getVisibleImages();
        currentIndex = (currentIndex + 1) % categoryImages.length;
        showModal(categoryImages[currentIndex]);
    });

    document.querySelector('.prev').addEventListener('click', function () {
        const categoryImages = getVisibleImages();
        currentIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
        showModal(categoryImages[currentIndex]);
    });

    function handleWheel(event) {
        const delta = event.deltaY;

        // Check if the modal content is scrollable
        const isScrollable = modalContent.scrollHeight > modalContent.clientHeight;

        if (isScrollable) {
            // If the modal content is scrollable, allow default behavior
            return;
        }

        if (delta > 0) {
            // Scroll down, move to the next image
            currentIndex = (currentIndex + 1) % getVisibleImages().length;
        } else if (delta < 0) {
            // Scroll up, move to the previous image
            currentIndex = (currentIndex - 1 + getVisibleImages().length) % getVisibleImages().length;
        }

        showModal(getVisibleImages()[currentIndex]);

        // Prevent the default behavior of the wheel event
        event.preventDefault();
    }
    // Touch event handling for image click and swipe
    images.forEach((image, index) => {
        image.addEventListener('click', function (event) {
            // Open modal only when clicking on the image, not the tab
            if (!event.target.closest('.tabs')) {
                showModal(index);
            }
        });

        let touchStartX;

        image.addEventListener('touchstart', function (event) {
            touchStartX = event.touches[0].clientX;
        });

        image.addEventListener('touchend', function (event) {
            const touchEndX = event.changedTouches[0].clientX;

            if (isSwipe(touchStartX, touchEndX)) {
                const categoryImages = getVisibleImages();
                currentIndex = touchEndX < touchStartX ? (currentIndex + 1) % categoryImages.length : (currentIndex - 1 + categoryImages.length) % categoryImages.length;
                showModal(categoryImages[currentIndex]);
            }
        });
    });

    // Touch event handling for modal swipe
    let modalTouchStartX;

    modalContent.addEventListener('touchstart', function (event) {
        modalTouchStartX = event.touches[0].clientX;
    });

    modalContent.addEventListener('touchend', function (event) {
        const modalTouchEndX = event.changedTouches[0].clientX;

        if (isSwipe(modalTouchStartX, modalTouchEndX, 100)) {
            const categoryImages = getVisibleImages();
            currentIndex = modalTouchEndX < modalTouchStartX ? (currentIndex + 1) % categoryImages.length : (currentIndex - 1 + categoryImages.length) % categoryImages.length;
            showModal(categoryImages[currentIndex]);
        }
    });

    document.querySelector('.close').addEventListener('click', hideModal);

    modalContent.addEventListener('click', function (event) {
        const clickX = event.clientX - modalContent.getBoundingClientRect().left;
        const imageWidth = modalContent.clientWidth;

        if (clickX < imageWidth / 3) {
            const categoryImages = getVisibleImages();
            currentIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
        } else if (clickX > (imageWidth * 2) / 3) {
            const categoryImages = getVisibleImages();
            currentIndex = (currentIndex + 1) % categoryImages.length;
        }

        showModal(categoryImages[currentIndex]);

    });

    modal.addEventListener('click', function (event) {
        const clickX = event.clientX - modal.getBoundingClientRect().left;
        const modalWidth = modal.clientWidth;

        if (clickX < 0 || clickX > modalWidth) {
            hideModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });

    window.addEventListener('popstate', handleBackButton);

    document.querySelector('.tabs').addEventListener('click', function (event) {
        if (event.target.classList.contains('tab')) {
            currentCategory = event.target.getAttribute('data-category');
            currentIndex = 0; // Reset the index when changing categories
            filterImages(); // Call the function to filter images
        }
    });

    function filterImages() {
        images.forEach((image, index) => {
            const imageCategory = image.closest('.image-container').getAttribute('data-category');
            if (currentCategory === 'all' || currentCategory === imageCategory) {
                image.closest('.image-container').style.display = 'flex';
            } else {
                image.closest('.image-container').style.display = 'none';
            }
        });
    }

    function getVisibleImages() {
        const visibleImages = [];
        images.forEach((image, index) => {
            const imageCategory = image.closest('.image-container').getAttribute('data-category');
            if (currentCategory === 'all' || currentCategory === imageCategory) {
                visibleImages.push(index);
            }
        });
        return visibleImages;
    }

    // Helper function to determine if a touch event is a swipe
    function isSwipe(startX, endX, threshold = 50) {
        return Math.abs(endX - startX) > threshold;
    }
});
