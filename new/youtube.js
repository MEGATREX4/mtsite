// Function to fetch the latest video URL from a channel
function fetchLatestVideo() {
    // YouTube channel ID
    const channelId = 'UC2b7FlXxNLjcLNv407at2Ig';
  
    // Construct the URL for the channel's uploads page
    const channelUrl = `https://www.youtube.com/channel/${channelId}/videos`;
  
    // Display the latest video details
    displayLatestVideo(channelUrl);
  }
  
  // Function to display the latest video details
  function displayLatestVideo(channelUrl) {
    const latestVideoContainer = document.getElementById('latestVideoContainer');
  
    // Create an iframe element to embed the latest video
    const videoFrame = document.createElement('iframe');
    videoFrame.src = channelUrl;
    videoFrame.width = '560';
    videoFrame.height = '315';
    videoFrame.allowFullscreen = true;
  
    // Append the video frame to the container
    latestVideoContainer.appendChild(videoFrame);
  
    // Note: Clicking on the video will redirect to https://twitter.com/megatrex4
    latestVideoContainer.addEventListener('click', () => {
      window.location.href = 'https://twitter.com/megatrex4';
    });
  }
  
  // Call the function to fetch and display the latest video
  fetchLatestVideo();
  