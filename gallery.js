document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const tabs = document.querySelector('.tabs');
    let currentCategory = 'all';

    document.querySelector('.tab[data-category="all"]').classList.add('active');

    tabs.addEventListener('click', function (event) {
        if (event.target.classList.contains('tab')) {
            const selectedTab = event.target;
            const category = selectedTab.getAttribute('data-category');

            if (currentCategory !== category) { // Check if it's a different category
                document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
                selectedTab.classList.add('active');

                currentCategory = category;

                filterGallery(category);
            }
        }
    });

    function filterGallery(category) {
        const imageContainers = document.querySelectorAll('.image-container');

        imageContainers.forEach(container => {
            const containerCategory = container.getAttribute('data-category');
            const shouldShow = category === 'all' || category === containerCategory;

            if (shouldShow) {
                container.style.display = 'flex';
            } else {
                container.style.display = 'none';
            }
        });
    }
});
