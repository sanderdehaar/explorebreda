document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const previewsContainer = document.getElementById('videoPreviews');
    previewsContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileURL = URL.createObjectURL(file);

        const videoElement = document.createElement('video');
        videoElement.src = fileURL;
        videoElement.controls = true;

        previewsContainer.appendChild(videoElement);
    }
});

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const files = document.getElementById('fileInput').files;

    if (files.length < 3) {
        alert('Please upload at least 3 videos.');
        return;
    }

    // Handle the upload logic here (e.g., using FormData and XMLHttpRequest or Fetch API)
    // For demonstration, we'll add the videos to the video grid

    const videoGrid = document.getElementById('videoGrid');
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileURL = URL.createObjectURL(file);

        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';

        const videoElement = document.createElement('video');
        videoElement.src = fileURL;
        videoElement.controls = true;

        const videoInfo = document.createElement('div');
        videoInfo.className = 'video-info';
        videoInfo.textContent = username;

        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(videoInfo);
        videoGrid.appendChild(videoContainer);
    }

    alert('Videos uploaded successfully!');
});



