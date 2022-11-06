const videoElement = document.querySelector('#video'),
      button = document.querySelector('#button');

//  Prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        if ('srcObject' in videoElement) {
            videoElement.srcObject = mediaStream;
        } else {
              // Avoid using this in new browsers, as it is going away.
            videoElement.src = URL.createObjectURL(mediaStream);
        }
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch(error) {
        console.error(error);
    }
}

button.addEventListener('click', async () => {
    // Disable Button
    button.disabled = true;
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
});

// on Load
selectMediaStream();