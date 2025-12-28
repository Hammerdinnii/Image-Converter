// 1. Handle the Instant Upload Preview
document.getElementById('imageInput').addEventListener('change', function() {
    const file = this.files[0];
    const uploadText = document.getElementById('uploadText');
    const sourcePreview = document.getElementById('sourcePreview');

    if (file) {
        // Read the file just for the preview
        const reader = new FileReader();
        reader.onload = function(e) {
            // Hide the text, show the image
            uploadText.style.display = 'none'; 
            sourcePreview.src = e.target.result;
            sourcePreview.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    } else {
        // If they cancel selection, revert
        uploadText.style.display = 'block';
        sourcePreview.classList.add('hidden');
    }
});

// 2. Handle the Conversion
document.getElementById('convertBtn').addEventListener('click', () => {
    const input = document.getElementById('imageInput');
    const format = document.getElementById('formatSelect').value;
    const resultArea = document.getElementById('resultArea');
    const previewImage = document.getElementById('previewImage');
    const downloadLink = document.getElementById('downloadLink');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                // Create canvas
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                // Draw image
                ctx.drawImage(img, 0, 0);

                // Convert
                const dataURL = canvas.toDataURL(format, 0.9);

                // Show Result
                previewImage.src = dataURL;
                resultArea.classList.remove('hidden');

                // Setup Download
                let extension = 'png';
                if (format === 'image/jpeg') extension = 'jpg';
                if (format === 'image/webp') extension = 'webp';

                downloadLink.href = dataURL;
                downloadLink.download = `converted-image.${extension}`;
                
                // Scroll down to the result
                resultArea.scrollIntoView({ behavior: 'smooth' });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image first!");
    }
});
