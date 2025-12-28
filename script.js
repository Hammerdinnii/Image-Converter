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
                // Create a canvas element
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');

                // Draw the image onto the canvas
                ctx.drawImage(img, 0, 0);

                // Convert canvas to the selected format
                // 0.9 is the quality parameter for JPEGs/WebP (0 to 1)
                const dataURL = canvas.toDataURL(format, 0.9);

                // Update the preview
                previewImage.src = dataURL;
                resultArea.classList.remove('hidden');

                // Update download link
                // Determine file extension based on format
                let extension = 'png';
                if (format === 'image/jpeg') extension = 'jpg';
                if (format === 'image/webp') extension = 'webp';

                downloadLink.href = dataURL;
                downloadLink.download = `converted-image.${extension}`;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image first!");
    }
});
