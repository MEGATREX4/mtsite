document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const tabs = document.querySelector('.tabs');
    let currentCategory = 'all';

    document.querySelector('.tab[data-category="all"]').classList.add('active');

    tabs.addEventListener('click', function (event) {
        const selectedTab = event.target;
        if (selectedTab.classList.contains('tab')) {
            const category = selectedTab.getAttribute('data-category');

            if (currentCategory !== category) { // Check if it's a different category
                setActiveTab(selectedTab);
                currentCategory = category;
                filterGallery(category);
            }
        }
    });

    function setActiveTab(tab) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    }

    function filterGallery(category) {
        const imageContainers = document.querySelectorAll('.image-container');

        imageContainers.forEach(container => {
            const containerCategory = container.getAttribute('data-category');
            const shouldShow = category === 'all' || category === containerCategory;

            container.style.display = shouldShow ? 'flex' : 'none';
        });
    }
});
