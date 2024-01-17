document.addEventListener('DOMContentLoaded', async function () {
    const language = document.documentElement.lang.toLowerCase();

    const TAB_NAMES = {
        uk: {
            '3dmodels': '3D Моделі',
            'mods': 'Моди',
            // Add more categories as needed
        },
        en: {
            '3dmodels': '3D Models',
            'mods': 'Mods',
            // Add more categories as needed
        },
    };

    // Load the images from the JSON file
    const response = await fetch('/images.json');
    const jsonData = await response.json();
    const galeryimages = jsonData.galeryimages;

    const galleryContainer = document.getElementById('galaryimage');
    const tabsContainer = document.getElementById('category');
    const descContainer = document.getElementById('desc');
    const descButtonContainer = document.getElementById('descbutton');

    function createTab(category, tabName) {
        const tabElement = document.createElement('div');
        tabElement.classList.add('tab');
        tabElement.setAttribute('data-category', category);
        tabElement.textContent = tabName;
        return tabElement;
    }

    galeryimages.forEach(image => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.setAttribute('data-category', image.category);

        const imageElement = document.createElement('div');
        imageElement.classList.add('image');
        imageElement.style.backgroundImage = `url('${image.url}')`;

        imageContainer.appendChild(imageElement);
        galleryContainer.appendChild(imageContainer);
    });

    const uniqueCategories = [...new Set(galeryimages.map(image => image.category))];

    uniqueCategories.forEach(category => {
        const tabName = TAB_NAMES[language][category];
        tabsContainer.appendChild(createTab(category, tabName));
    });

    const images = document.querySelectorAll('.image');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    let currentIndex = 0;
    let currentCategory = 'all';

    function showModal(index) {
        if (images[index]) {
            modalContent.style.backgroundImage = images[index].style.backgroundImage;
            modal.style.display = 'block';
            document.body.classList.add('gallery-open');
            currentCategory = document.querySelector('.tab.active').getAttribute('data-category');

            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                document.body.style.overflow = 'hidden';
                modalContent.addEventListener('wheel', handleWheel);
                document.addEventListener('keydown', handleKeyboardArrows);
            }, 10);

            // Update description
            updateDescription(index);
        }
    }

    function hideModal() {
        modal.style.display = 'none';
        document.body.classList.remove('gallery-open');
        modalContent.style.transform = 'scale(0.9)';
        document.body.classList.remove('gallery-open');
        document.body.style.overflow = 'auto';
        modalContent.removeEventListener('wheel', handleWheel);
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
            if (categoryImages[currentIndex] !== undefined) {
                showModal(categoryImages[currentIndex]);
            }
        }
    }

    document.querySelector('.next').addEventListener('click', function () {
        const categoryImages = getVisibleImages();
        currentIndex = (currentIndex + 1) % categoryImages.length;
        if (categoryImages[currentIndex] !== undefined) {
            showModal(categoryImages[currentIndex]);
        }
    });

    document.querySelector('.prev').addEventListener('click', function () {
        const categoryImages = getVisibleImages();
        currentIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
        if (categoryImages[currentIndex] !== undefined) {
            showModal(categoryImages[currentIndex]);
        }
    });

    function handleWheel(event) {
        const delta = event.deltaY;
        const isScrollable = modalContent.scrollHeight > modalContent.clientHeight;

        if (isScrollable) {
            return;
        }

        if (delta > 0) {
            currentIndex = (currentIndex + 1) % getVisibleImages().length;
        } else if (delta < 0) {
            currentIndex = (currentIndex - 1 + getVisibleImages().length) % getVisibleImages().length;
        }

        showModal(getVisibleImages()[currentIndex]);
        event.preventDefault();
    }

    images.forEach((image, index) => {
        image.addEventListener('click', function (event) {
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
        const categoryImages = getVisibleImages();
        if (categoryImages.length > 0) {
            const step = imageWidth / 3;
            if (clickX < step) {
                currentIndex = (currentIndex - 1 + categoryImages.length) % categoryImages.length;
            } else if (clickX > (imageWidth - step)) {
                currentIndex = (currentIndex + 1) % categoryImages.length;
            }
            showModal(categoryImages[currentIndex]);
        }
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
            currentIndex = 0;
            filterImages();
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
        // Update description when changing categories
        updateDescription(getVisibleImages()[0]);
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

    function isSwipe(startX, endX, threshold = 50) {
        return Math.abs(endX - startX) > threshold;
    }

    // Function to update the description
    function updateDescription(index) {
        // Clear previous description and buttons
        descContainer.innerHTML = '';
        descButtonContainer.innerHTML = '';

        // Get the corresponding image data
        const imageData = galeryimages[index];
        const language = document.documentElement.lang.toLowerCase();

        // Check if there is a description
        if (imageData.description && imageData.description.desc) {
            const descText = document.createElement('p');
            descText.classList.add('desctext');

            // Use language-specific description if available, default to the general one
            descText.textContent = language === 'en' ? (imageData.description.descen || imageData.description.desc) : imageData.description.desc;

            descContainer.appendChild(descText);

            // Check if there are buttons
            if (imageData.description.text && imageData.description.link) {
                const buttonElement = document.createElement('div');
                buttonElement.classList.add('buttondesc');

                // Use language-specific button text if available, default to the general one
                const buttonText = language === 'en' ? (imageData.description.texten || imageData.description.text) : imageData.description.text;
                buttonElement.innerHTML = `<div onclick="window.open('${imageData.description.link}', '_blank')"> ${buttonText}</div>`;

                descButtonContainer.appendChild(buttonElement);

                // Show the descButtonContainer element if there are buttons
                descButtonContainer.style.display = 'flex';
            } else {
                // Hide the descButtonContainer element if no buttons
                descButtonContainer.style.display = 'none';
            }

            // Show the #desccont element if there is a description
            document.getElementById('desccont').style.display = 'flex';
        } else {
            // Hide the descButtonContainer element if no description
            descButtonContainer.style.display = 'none';

            // Hide the #desccont element if there is no description
            document.getElementById('desccont').style.display = 'none';
        }
    }





    // Check if there are buttons
    if (imageData.description && imageData.description.buttons) {
        imageData.description.buttons.forEach(button => {
            const buttonElement = document.createElement('div');
            buttonElement.classList.add('buttondesc');
            buttonElement.innerHTML = `<div onclick="window.open('${imageData.description.link}', '_blank')"> ${imageData.description.text}</div>`;

            descButtonContainer.appendChild(buttonElement);
        });
    }

}
);
