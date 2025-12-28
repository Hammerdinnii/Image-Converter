const imageInput = document.getElementById('imageInput');
const dropZone = document.getElementById('dropZone');
const uploadText = document.getElementById('uploadText');
const sourcePreview = document.getElementById('sourcePreview');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const successMessage = document.getElementById('successMessage');
const convertBtn = document.getElementById('convertBtn');
const resultArea = document.getElementById('resultArea');
const downloadLink = document.getElementById('downloadLink');
const finalPreview = document.getElementById('finalPreview');

// 1. CLICK TO UPLOAD
dropZone.addEventListener('click', () => imageInput.click());

// 2. HANDLE FILE SELECTION & ANIMATION
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    // Reset UI
    resultArea.classList.add('hidden');
    successMessage.classList.add('hidden');
    uploadText.style.display = 'block';
    sourcePreview.classList.add('hidden');
    
    // Show Progress Bar
    progressContainer.classList.remove('hidden');
    progressFill.style.width = '0%';
    
    // Simulate a loading process (since local files are instant, we fake it for UX)
    let width = 0;
    const interval = setInterval(() => {
        width += 10;
        progressFill.style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(interval);
            // Finished Loading
            setTimeout(() => {
                showPreview(file);
            }, 300);
        }
    }, 50); // Speed of the bar
});

// 3. SHOW THE UPLOADED PREVIEW
function showPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        // Hide Progress, Show Success
        progressContainer.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Update the big click box
        uploadText.style.display = 'none';
        sourcePreview.src = e.target.result;
        sourcePreview.classList.remove('hidden');
        
        // Enable Convert Button
        convertBtn.disabled = false;
    }
    reader.readAsDataURL(file);
}

// 4. CONVERT IMAGE
convertBtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    const format = document.getElementById('formatSelect').value;

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Convert
            const dataURL = canvas.toDataURL(format, 0.9);

            // Update Result
            finalPreview.src = dataURL;
            resultArea.classList.remove('hidden');
            
            // Set Download Link
            let ext = 'png';
            if (format === 'image/jpeg') ext = 'jpg';
            if (format === 'image/webp') ext = 'webp';
            
            downloadLink.href = dataURL;
            downloadLink.download = `converted-image.${ext}`;

            // Smooth Scroll
            resultArea.scrollIntoView({ behavior: 'smooth' });
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});
