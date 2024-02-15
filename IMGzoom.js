//imgzoom.js
document.addEventListener('DOMContentLoaded', async function () {
    const language = document.documentElement.lang.toLowerCase();

    const responseTab = await fetch('/tab_names.json');
    const TAB_NAMES = await responseTab.json();

    // Load the images from the JSON file
    const response = await fetch('/images.json');
    const jsonData = await response.json();
    const galeryimages = jsonData.galeryimages;
    galeryimages.sort((a, b) => a.id - b.id);

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
        // Check if the element should be displayed based on language and page
        const shouldDisplay = image.showen !== true && window.location.pathname == '/en/portfolio.html';
    
        if (shouldDisplay) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            imageContainer.setAttribute('data-category', image.category);
        
            const categoryNameContainer = document.createElement('div');
            categoryNameContainer.classList.add('category-name-container');
        
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-name');
            categoryDiv.textContent = TAB_NAMES[language][image.category];
        
            categoryNameContainer.appendChild(categoryDiv);
            imageContainer.appendChild(categoryNameContainer);
        
            const imageElement = document.createElement('div');
            imageElement.classList.add('image');
            imageElement.style.backgroundImage = `url('${image.url}')`;
        
            imageContainer.appendChild(imageElement);
            galleryContainer.appendChild(imageContainer);
        }
        else {
            console.log(`Item with ID ${image.id} is not displayed on /en/portfolio.html`);
        }
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
        // uncomment for debug 👇
        // console.log(`Виклик модального вікна: index: ${index}, ID: ${galeryimages[index].id}, category: ${galeryimages[index].category}`);
    
        const categoryImages = getVisibleImages();
        if (categoryImages.includes(index)) {
            // Reset currentIndex to the provided index when modal is displayed
            currentIndex = categoryImages.indexOf(index);
    
            modalContent.style.backgroundImage = images[index].style.backgroundImage;
            modal.style.display = 'block';
            document.body.classList.add('gallery-open');
            currentCategory = document.querySelector('.tab.active').getAttribute('data-category');
    
            modalContent.style.transform = 'scale(0.7)';
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                document.body.style.overflow = 'hidden';
                modalContent.addEventListener('wheel', handleWheel);
                document.addEventListener('keydown', handleKeyboardArrows);
            }, 50);
    
            // Update description
            updateDescription(index);
        }
    }

    function hideModal() {
        modal.style.display = 'none';
        document.body.classList.remove('gallery-open');
        modalContent.style.transform = 'scale(0.7)';
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
            const totalImages = categoryImages.length;
    
            if (event.key === 'ArrowRight' || event.key === 'a' || event.key === 'A') {
                currentIndex = (currentIndex + 1) % totalImages;
            } else if (event.key === 'ArrowLeft' || event.key === 'd' || event.key === 'D') {
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            }
    
            if (currentIndex < 0) {
                currentIndex = totalImages - 1;
            }
    
            showModal(categoryImages[currentIndex]);
        }
    }
    // Function to find the next image with an ID larger than the currently open one
    function findNextImageId(currentIndex) {
        const currentId = categoryImages[getVisibleImages()[currentIndex]].id;
        let nextIndex;
    
        for (let i = currentIndex + 1; i < categoryImages.length; i++) {
            if (categoryImages[i].id > currentId) {
                nextIndex = i;
                break;
            }
        }
    
        // If no next image is found, wrap around to the first image
        if (nextIndex === undefined) {
            for (let i = 0; i < currentIndex; i++) {
                if (categoryImages[i].id > currentId) {
                    nextIndex = i;
                    break;
                }
            }
        }
    
        return nextIndex;
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
    
        const categoryImages = getVisibleImages();
        const totalImages = categoryImages.length;
    
        if (delta > 0) {
            currentIndex = (currentIndex + 1) % totalImages;
        } else if (delta < 0) {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        }
    
        if (currentIndex < 0) {
            currentIndex = totalImages - 1;
        }
    
        showModal(categoryImages[currentIndex]);
        event.preventDefault();
    }
    
    // Add the function to find the next image with an ID larger than the currently open one
    function findNextImageId(currentIndex, currentIndexId) {
        let nextIndex = currentIndex;
    
        for (let i = currentIndex + 1; i < galeryimages.length; i++) {
            if (galeryimages[i].id > currentIndexId) {
                nextIndex = i;
                break;
            }
        }
    
        // If no next image is found, wrap around to the first image
        if (nextIndex === currentIndex) {
            for (let i = 0; i < currentIndex; i++) {
                if (galeryimages[i].id > currentIndexId) {
                    nextIndex = i;
                    break;
                }
            }
        }
    
        return nextIndex;
    }
    
    // Add a function to find the previous image with an ID smaller than the currently open one
    function findPreviousImageId(currentIndex, currentIndexId) {
        let previousIndex = currentIndex;
    
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (galeryimages[i].id < currentIndexId) {
                previousIndex = i;
                break;
            }
        }
    
        // If no previous image is found, wrap around to the last image
        if (previousIndex === currentIndex) {
            for (let i = galeryimages.length - 1; i > currentIndex; i--) {
                if (galeryimages[i].id < currentIndexId) {
                    previousIndex = i;
                    break;
                }
            }
        }
    
        return previousIndex;
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
            currentIndex = 0; // Update currentIndex to show the first image in the new category
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
        updateDescription(visibleImages[currentIndex]);
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
    
                // Add the onclick attribute to open the link in a new tab
                buttonElement.innerHTML = `<div class="buttonlink" onclick="window.open('${imageData.description.link}', '_blank')"> ${buttonText}</div>`;
    
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
            buttonElement.innerHTML = `<div class="buttonlink" onclick="window.open('${button.link}', '_blank')"> ${button.text}</div>`;
    
            descButtonContainer.appendChild(buttonElement);
        });
    }
});
