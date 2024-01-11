var options = {
    width: "100%",
    height: "100%",
    channel: "MEGATREX4",
    muted: "true",
    parent: ["embed.example.com", "othersite.example.com"]
};
var player = new Twitch.Player("SamplePlayerDivID", options);
player.setVolume(0.1);

// Dynamically calculate size and location of SamplePlayerDivID
var samplePlayerDiv = document.getElementById("SamplePlayerDivID");
var rect = samplePlayerDiv.getBoundingClientRect();

// Set overlay size and location based on SamplePlayerDivID
var twitchOverlay = document.getElementById("TwitchOverlay");
twitchOverlay.style.width = rect.width + "px";
twitchOverlay.style.height = rect.height + 1 + "px";
twitchOverlay.style.top = rect.top - 1 + "px";
twitchOverlay.style.left = rect.left + "px";

// Add click event listener to TwitchOverlay
twitchOverlay.addEventListener("click", function() {
    // Open the Twitch link
    window.open("https://twitch.tv/MEGATREX4", "_blank");
});