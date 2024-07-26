# MEGATREX4 Personal Website

Welcome to the GitHub repository for the MEGATREX4 personal website! This project showcases my work as a streamer, blogger, 3D artist, and amateur translator. It includes a main index page and a portfolio page, along with JavaScript functionalities for interactive features.

## Project Structure

### 1. **Index Page**

The index page is the home of the site. It provides an overview of MEGATREX4's activities and links to other sections. 

### 2. **Portfolio Page**

The portfolio page displays various projects and artworks. It features a gallery where users can filter items based on categories and view detailed descriptions.

### 3. **JavaScript Code**

The JavaScript code adds interactivity and dynamic content to the website. Key features include:

- **Dynamic Gallery Filtering:** Allows users to filter portfolio items based on categories.
- **Loading Animation:** Displays a loading animation while the page is loading and hides it after the content is ready.
- **Random Footer Image:** Sets a random background image in the footer from a predefined list.

## Technologies Used

- **HTML:** The structure and content of the website.
- **CSS:** Styling for the website. Custom styles are included in `style.css`, `smartphone.css`, and `portfolio.css`.
- **JavaScript:** For interactive features. Key scripts include:
  - `loading.js`: Manages the loading animation.
  - `gallery.js`: Handles the gallery filtering and modal functionality.
  - `randomfooter.js`: Chooses a random image for the footer background.
  - `abouttext.js`: Manages dynamic text for the "About" section.

## External Libraries

- **Google Analytics:** Used for tracking website traffic.
- **Google Tag Manager:** For managing marketing tags.
- **jQuery:** Provides a simplified way to handle JavaScript interactions.
- **Twemoji:** For rendering Twitter emoji icons.
- **Font Awesome:** For various icons used throughout the site.
- **Google Fonts:** For custom fonts, including Roboto and Fredoka.
- **Twemoji Amazing:** Additional emoji styling.

## How It Works

1. **Loading Animation:** 
   - `loading.js` handles the display and hiding of the loading animation. It prevents scrolling while loading and ensures a smooth transition when content is fully loaded.

2. **Gallery Functionality:**
   - `gallery.js` manages the gallery's dynamic content. It allows users to filter items based on selected categories and view detailed descriptions in a modal.

3. **Footer Image:**
   - `randomfooter.js` sets a random image from a predefined list as the background for the footer section, adding a dynamic visual element to the site.

4. **Dynamic Content:**
   - `abouttext.js` updates the text content dynamically in the "About" section based on interactions or data.
