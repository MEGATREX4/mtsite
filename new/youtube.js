// Your YouTube API key and channel ID
const apiKey = 'AIzaSyCDUEqA0BUCGtsPEQyrDo64UrgvI0RxGV8';
const channelId = 'UC2b7FlXxNLjcLNv407at2Ig';

// Function to fetch the latest video
function fetchLatestVideo() {
  // Check if the video details and timestamp are already in local storage
  const cachedData = localStorage.getItem('cachedData');
  if (cachedData) {
    // If cached, parse the data
    const parsedData = JSON.parse(cachedData);

    // Check if the cached data is still valid (within the last 24 hours)
    const currentTime = new Date().getTime();
    const cacheTime = parsedData.timestamp;
    const timeDifference = currentTime - cacheTime;

    if (timeDifference < 24 * 60 * 60 * 1000) {
      // If valid, display the cached video details
      displayLatestVideo(parsedData.video);
      return;
    }
  }

  // If not cached or expired, fetch from the API
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Extract video details
      const latestVideo = data.items[0].snippet;

      // Cache the video details and timestamp in local storage
      const currentTime = new Date().getTime();
      const dataToCache = {
        video: latestVideo,
        timestamp: currentTime,
      };
      localStorage.setItem('cachedData', JSON.stringify(dataToCache));

      // Display the latest video details
      displayLatestVideo(latestVideo);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to display the latest video details
function displayLatestVideo(video) {
  const latestVideoContainer = document.getElementById('latestVideoContainer');

  // Create HTML elements to display video details
  const videoTitle = document.createElement('h2');
  videoTitle.textContent = video.title;

  const videoThumbnail = document.createElement('img');
  videoThumbnail.src = video.thumbnails.high.url;
  videoThumbnail.alt = video.title;
  videoThumbnail.classList.add('YouTubeSize');

  // Append elements to the container
  latestVideoContainer.appendChild(videoThumbnail);

  // Add event listener to open the site on click
  latestVideoContainer.addEventListener('click', function() {
    // Open the YouTube link
    window.open("https://youtube.com/@MEGATREX4", "_blank");
  });
}

// Call the function to fetch and display the latest video
fetchLatestVideo();
