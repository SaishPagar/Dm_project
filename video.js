document.getElementById('video-input').addEventListener('change', function(event) {
    var file = event.target.files[0];
    
    // Check if the selected file is a video
    if (file.type.indexOf('video') === 0) {
      var videoElement = document.getElementById('video-preview');
      
      // Reset the video player and download link
      videoElement.src = '';
      document.getElementById('download-link').href = '';
      
      var reader = new FileReader();
      reader.onload = function(event) {
        var blobUrl = URL.createObjectURL(file);
        
        // Display the selected video
        videoElement.src = blobUrl;
        
        // Compress the video
        compressVideo(blobUrl, function(compressedBlob) {
          // Generate a download link for the compressed video
          var downloadLink = document.getElementById('download-link');
          downloadLink.href = URL.createObjectURL(compressedBlob);
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid video file!');
    }
  });
  
  function compressVideo(videoUrl, callback) {
    var videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    
    videoElement.addEventListener('loadedmetadata', function() {
      var canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      var context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(callback, 'video/mp4');
    });
  }
  